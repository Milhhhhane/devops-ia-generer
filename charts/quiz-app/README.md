# quiz-app — Helm chart

Déploie les 3 services de `quiz-app` (frontend Nginx, backend Express, PostgreSQL)
sur un cluster Kubernetes / k3s, avec health checks, volume persistant pour la base
et un Ingress Traefik (contrôleur fourni par défaut avec k3s).

## Prérequis

- Un cluster k3s accessible via `kubectl`/`helm` (voir "Test local avec k3d" ci-dessous
  si vous n'en avez pas encore).
- Les 3 images (`backend`, `frontend`, `db`) construites à partir des `Dockerfile`
  du dépôt et disponibles dans un registre (ou importées directement dans le cluster
  en local, voir plus bas).

## Test local avec k3d (k3s en conteneurs)

k3d fait tourner un vrai k3s dans des conteneurs Docker — pratique pour valider les
manifests sans VM ni serveur dédié.

```bash
# 1. Créer le cluster (une fois) — expose l'Ingress sur le port 8087 de la machine
k3d cluster create quiz-app --port "8087:80@loadbalancer" --wait

# 2. Builder les images avec docker compose puis les importer dans le cluster
docker compose build
docker tag devops-ia-generer-backend:latest quiz-app/backend:local
docker tag devops-ia-generer-frontend:latest quiz-app/frontend:local
docker tag devops-ia-generer-db:latest quiz-app/db:local
k3d image import quiz-app/backend:local quiz-app/frontend:local quiz-app/db:local -c quiz-app

# 3. Déployer
helm install quiz-app ./charts/quiz-app \
  --namespace quiz-app --create-namespace \
  --set image.registry=quiz-app \
  --set image.tag=local \
  --set secrets.postgresPassword=quiz_password \
  --set secrets.jwtSecret=change-me \
  --set secrets.adminUsername=admin \
  --set secrets.adminPassword=change-me

# 4. Vérifier
kubectl -n quiz-app get pods
curl -H "Host: quiz.local" http://localhost:8087/health
```

> Note Windows/Docker Desktop : si `kubectl` ne parvient pas à joindre l'API du
> cluster via `host.docker.internal`, remplacez l'adresse du serveur dans le
> kubeconfig par `127.0.0.1` :
> `kubectl config set-cluster k3d-quiz-app --server=https://127.0.0.1:<port>`
> (le port est visible avec `docker ps` sur le conteneur `k3d-quiz-app-serverlb`).

Pour supprimer le cluster de test : `k3d cluster delete quiz-app`.

## Agent de supervision (CronJob)

Un `CronJob` (`agent.enabled: true` par défaut, toutes les 5 min) surveille le
namespace : il liste les pods et les événements d'avertissement via l'API
Kubernetes (`ServiceAccount` + `Role` en lecture seule, scopés à ce namespace —
`get/list/watch` sur `pods` et `events`, rien d'autre), envoie ce résumé à un
LLM via [OpenRouter](https://openrouter.ai) pour un diagnostic en langage
naturel, et logue le tout (`kubectl logs`). Aucune alerte externe : c'est un
outil de supervision passif, à consulter à la demande.

```bash
# Voir le dernier rapport
kubectl -n quiz-app logs -l app.kubernetes.io/component=agent --tail=100

# Déclencher un passage immédiat sans attendre le planning
kubectl -n quiz-app create job agent-manual --from=cronjob/quiz-app-agent
```

Secret requis : `OPENROUTER_API_KEY` (voir tableau plus bas). Sans cette clé,
l'agent continue de logger l'état brut des pods/événements mais saute
l'analyse IA (pas de crash). Le modèle utilisé est configurable via
`agent.model` dans `values.yaml` (défaut : `anthropic/claude-3.5-haiku`).

## Déploiement via la pipeline GitHub Actions

Le job `deploy` de `.github/workflows/ci.yml` exécute le même `helm upgrade --install`
mais avec les images poussées sur GitHub Container Registry (`ghcr.io`). Il cible un
runner self-hosted (label `k3s-local`) car un runner hébergé par GitHub ne peut pas
atteindre un cluster qui tourne uniquement sur votre machine. Deux options :

- **Runner auto-hébergé** : enregistrez un GitHub Actions runner (label `k3s-local`)
  sur la machine qui héberge le cluster k3d/k3s — voir **Settings > Actions >
  Runners > New self-hosted runner** sur le dépôt GitHub. Le job de déploiement
  s'exécutera alors automatiquement (ajoutez une règle de protection sur
  l'environnement `local-k3s` si vous voulez un point de validation manuelle avant
  le déploiement : **Settings > Environments**).
- **Déploiement manuel** : lancez la même commande `helm upgrade --install` (voir
  `.github/workflows/ci.yml`) directement depuis la machine qui a accès au cluster.

Secrets à définir dans **Settings > Secrets and variables > Actions** du dépôt
GitHub :

| Secret              | Rôle                                   |
| ------------------- | --------------------------------------- |
| `POSTGRES_PASSWORD` | Mot de passe PostgreSQL                 |
| `JWT_SECRET`        | Clé de signature des tokens admin       |
| `ADMIN_USERNAME`    | Identifiant admin                       |
| `ADMIN_PASSWORD`    | Mot de passe admin                      |
| `RESEND_API_KEY`    | Clé API Resend (optionnel — voir ci-dessous) |
| `FROM_EMAIL`        | Adresse d'expédition des emails         |
| `OPENROUTER_API_KEY`| Clé API OpenRouter pour l'agent de supervision (optionnel) |

`GITHUB_TOKEN` (fourni automatiquement par GitHub Actions) suffit pour
s'authentifier auprès de `ghcr.io` en push comme en lecture — aucun secret
supplémentaire n'est nécessaire pour le registre.

Si `RESEND_API_KEY` n'est pas défini, le backend démarre normalement et se contente
de ne pas envoyer l'email de résultats (voir le correctif dans `backend/server.js`).

## Valeurs (`values.yaml`)

Voir les commentaires dans le fichier — `image.registry`/`image.tag` sont surchargés
par la CI, `ingress.host` par défaut à `quiz.local` (à adapter ou à résoudre via
`/etc/hosts` pour un accès par nom plutôt que par l'en-tête `Host`).
