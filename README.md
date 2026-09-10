# TP — Generation du code + jugement sans et avec assistant IA

## Objectif

Exécuter cette application web multi-tiers **quiz-app** dans des conteneurs Docker en utilisant les bonnes pratiques de gestion de conteneurs, d’images Docker, de Dockerfile et de Docker Compose sans et avec assistant IA puis noter les differences constatées.

## Contexte du Projet

Vous travaillez en tant qu'un(e) ingénieur(e) DevOps dans une petite entreprise de développement web. Votre équipe vous demande de mettre en place un environnement de développement conteneurisé pour l'application web **quiz-app** ci-joint. Ce projet vous permettra de prouver votre compréhension des concepts de Docker, des conteneurs, des images, des Dockerfiles et Docker Compose.

## Tâches à Réaliser

1. Rédiger des **Dockerfiles** pour différents types de services (Node.js, PostgreSQL, Nginx)
2. Orchestrer plusieurs services avec **Docker Compose**
3. Configurer des **health checks** pour garantir la fiabilité des services
4. Gérer la **persistance des données** avec les volumes Docker
5. Configurer les **dépendances entre services**
6. Les taches 1 à 6 sont à realiser sans assistance IA dans un premier temps (penser à noter le temps passé)
7. Vous devez ensuite demander à un modèle de rediger les Dockerfiles + Docker compose puis vous allez les auditer méthodiquement. L'enjeu est de constater par vous-mêmes le mode d'échec caractéristique de l'IA générative : produire quelque chose qui fonctionne tout en étant mauvais, sans qu'aucune erreur ne remonte.
   Dans `criteres.md`, écrivez les critères d'acceptation que devra respecter les Dockerfiles + docker-compose.yml, avant d'avoir vu la moindre proposition du modèle.

> Règle du cours : si vous ne savez pas écrire les critères, vous ne savez pas valider la
> réponse — donc vous ne devez pas déléguer la tâche.

8. Créez `prompts/dockerfile.md` en appliquant la structure vue en cours
   (RÔLE / CONTEXTE / TÂCHE / FORMAT / CRITÈRES).
   donnez seulement le contexte et deux ou trois contraintes. Vous voulez observer ce que le modèle propose spontanément, pas lui dicter la réponse.

9. Pour la partie auditer, Construisez les images et vérifiez qu'elles démarrent.

10. La fiche d'évaluation.
    Remplissez `fiche_evaluation.md`, appuyée sur ce que vous avez observé, pas sur une impression.

```markdown
# Fiche d'évaluation — Génération de Dockerfile par LLM

Modèles testés : ...
Date : ... Binôme : ...

## 1. Valeur

Temps estimé sans IA : ... avec IA (génération + correction) : ...
Gain net : ...

## 2. Vérifiabilité

Temps d'audit : ... Rapport audit/production : ...
Aurions-nous pu auditer sans connaître Docker ? ...

## 3. Risque

Nombre de défauts silencieux (aucune erreur déclenchée) : ...
Le plus grave, et son impact en production : ...

## 4. Données envoyées

Ce que nous avons transmis au fournisseur : ...
Ce qu'il aurait été interdit d'envoyer dans un contexte d'entreprise : ...

## 5. Supervision

Niveau d'autonomie recommandé (N0 à N4) : ...
Justification : ...

## 6. Coût

Tokens consommés : ...
Coût réel dominant : tokens ou temps humain de vérification ?

## 7. Réversibilité

Si ce Dockerfile partait en production sans revue, en combien de temps
détecterait-on le problème, et comment reviendrait-on en arrière ?

## Recommandation

Nous recommandons / ne recommandons pas cet usage, à ce niveau d'autonomie,
pour la raison suivante : ...
```

### Environnement technique

```bash
# Vérifier les versions installées
docker --version          # Version 20+ requise
docker compose version    # Version 2.x requise
```

---

## Présentation de l'application

### Architecture cible

```
┌─────────────────────────────────────────────────────────────────┐
│                      Docker Network                             │
│                                                                 │
│  ┌─────────────┐      ┌─────────────┐      ┌─────────────┐     │
│  │  Frontend   │      │   Backend   │      │  Database   │     │
│  │   (Nginx)   │─────▶│  (Express)  │─────▶│ (PostgreSQL)│     │
│  │   Port 80   │      │  Port 3007  │      │  Port 5432  │     │
│  └─────────────┘      └─────────────┘      └─────────────┘     │
│         │                                         │             │
│         │                                         │             │
│    Port 8087                              Volume: postgres_data │
└─────────────────────────────────────────────────────────────────┘
          │
          ▼
    Navigateur Web
```

### Description des services

| Service      | Technologie       | Port                       | Rôle                                                 |
| ------------ | ----------------- | -------------------------- | ---------------------------------------------------- |
| **frontend** | Nginx             | 80 (interne) → 8087 (hôte) | Sert les fichiers statiques et fait proxy vers l'API |
| **backend**  | Node.js + Express | 3007 (interne uniquement)  | API REST pour les utilisateurs et résultats          |
| **db**       | PostgreSQL 17     | 5432 (interne uniquement)  | Stockage des données                                 |

### Structure du projet

```
quiz-app/
├── index.html              # Page principale du quiz
├── main.js                 # Logique du quiz
├── package.json            # Dépendances frontend (Vite)
├── vite.config.js          # Configuration du build
├── nginx/
│   └── nginx.conf          # Configuration Nginx (fournie)
├── backend/
│   ├── server.js           # API Express
│   └── package.json        # Dépendances backend
└── database/
    └── init.sql            # Script d'initialisation SQL
```

---

## Partie 1 : Création des Dockerfiles

### 1.1 Dockerfile pour la base de données

**Fichier à créer** : `database/Dockerfile`

**Objectif** : Créer une image PostgreSQL qui initialise automatiquement le schéma de la base.

**Instructions** :

1. Utiliser l'image de base `postgres:17-alpine`
2. Copier le fichier `init.sql` vers le répertoire `/docker-entrypoint-initdb.d/`

**Note** : PostgreSQL exécute automatiquement tous les scripts `.sql` présents dans `/docker-entrypoint-initdb.d/` lors du premier démarrage du conteneur.

---

### 1.2 Dockerfile pour le backend

**Fichier à créer** : `backend/Dockerfile`

**Objectif** : Créer une image pour l'API Node.js Express.

**Instructions** :

1. Utiliser l'image de base `node:24-alpine`
2. Définir le répertoire de travail à `/app`
3. Copier les fichiers de dépendances (`package.json` et `package-lock.json` s'il existe)
4. Installer les dépendances avec `npm install`
5. Copier le reste des fichiers source
6. Exposer le port `3007`
7. Définir la commande de démarrage

**Note** : _L'ordre des instructions `COPY` est important. Copier d'abord les fichiers de dépendances permet d'utiliser le cache Docker si seul le code source change._

### 1.3 Dockerfile pour le frontend (Multi-stage build)

**Fichier à créer** : `Dockerfile`

**Objectif** : Créer une image de production optimisée avec un build en deux étapes.

**Contexte** : Le frontend utilise Vite pour compiler les assets. En production, ces fichiers statiques sont servis par Nginx qui fait également office de reverse proxy vers le backend.

**Instructions - Stage 1 (Build)** :

1. Utiliser l'image `node:24-alpine` et nommer ce stage `build`
2. Définir le répertoire de travail à `/app`
3. Copier les fichiers de dépendances
4. Installer les dépendances
5. Copier tous les fichiers source
6. Exécuter la commande de build : `npm run build`

**Instructions - Stage 2 (Production)** :

1. Utiliser l'image `nginx:alpine`
2. Copier le dossier `/app/dist` du stage précédent vers `/usr/share/nginx/html`
3. Copier la configuration Nginx (`nginx/nginx.conf`) vers `/etc/nginx/conf.d/default.conf`
4. Exposer le port `80`
5. Définir la commande : `nginx -g "daemon off;"`

**Syntaxe multi-stage** :

```dockerfile
# Stage 1
FROM node:24-alpine AS build
# ... instructions de build

# Stage 2
FROM nginx:alpine
COPY --from=build /source /destination
```

---

## Partie 2 : Configuration de Docker Compose (1h30)

### 2.1 Création du fichier de configuration

**Fichier à créer** : `docker-compose.yml`

Vous allez configurer les trois services de l'application avec leurs dépendances, volumes et health checks.

---

### 2.2 Configuration du service `db` (Base de données)

**Instructions** :

1. Nom du service : `db`
2. Build depuis le répertoire `./database`
3. Variables d'environnement requises (utilisez la syntaxe `${VARIABLE}` pour les lire depuis un fichier `.env`) :
   - `POSTGRES_USER`
   - `POSTGRES_PASSWORD`
   - `POSTGRES_DB`
4. Volume nommé `postgres_data` monté sur `/var/lib/postgresql/data`
5. Health check avec la commande `pg_isready` :
   ```yaml
   healthcheck:
     test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER} -d ${POSTGRES_DB}"]
     interval: 5s
     timeout: 5s
     retries: 5
   ```
6. Politique de redémarrage : `unless-stopped`

---

### 2.3 Configuration du service `backend`

**Instructions** :

1. Nom du service : `backend`
2. Build depuis le répertoire `./backend`
3. Exposer le port `3007` en interne uniquement (utiliser `expose`, pas `ports`)
4. Variables d'environnement :
   - `DATABASE_URL` : chaîne de connexion PostgreSQL au format :
     ```
     postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@db:5432/${POSTGRES_DB}
     ```
   - `RESEND_API_KEY`
   - `ADMIN_USERNAME`
   - `ADMIN_PASSWORD`
   - `JWT_SECRET`
5. Dépendance sur le service `db` avec condition de health check :
   ```yaml
   depends_on:
     db:
       condition: service_healthy
   ```
6. Politique de redémarrage : `unless-stopped`

**Note** : _La syntaxe `depends_on` avec `condition: service_healthy` garantit que le backend ne démarre qu'une fois la base de données prête à accepter des connexions._

---

### 2.4 Configuration du service `frontend`

**Instructions** :

1. Nom du service : `frontend`
2. Build depuis le répertoire racine `.`
3. Mapping de port : `8087:80` (port hôte:port conteneur)
4. Dépendance sur le service `backend`
5. Politique de redémarrage : `unless-stopped`

---

### 2.5 Déclaration du volume

À la fin du fichier `docker-compose.yml`, déclarer le volume nommé `postgres_data`

### 2.6 Configuration des variables d'environnement

**Fichier à créer** : `.env` (à partir de `.env.example`)

**Note** : _Modifier les valeurs selon vos besoins. Les variables définies dans ce fichier seront automatiquement lues par Docker Compose._

**Variables requises** :

- `POSTGRES_USER` : nom d'utilisateur PostgreSQL
- `POSTGRES_PASSWORD` : mot de passe PostgreSQL
- `POSTGRES_DB` : nom de la base de données
- `RESEND_API_KEY` : clé API Resend (peut rester vide pour les tests)
- `ADMIN_USERNAME` : identifiant admin
- `ADMIN_PASSWORD` : mot de passe admin
- `JWT_SECRET` : clé secrète pour les tokens JWT

---

## Partie 3 : Validation et tests

### 3.1 Lancement de l'application

### 3.2 Vérification des services

**Critères de succès** :

- Les 3 services doivent être en état `running`
- Le service `db` doit afficher `(healthy)` dans la colonne STATUS

### 3.3 Tests fonctionnels

```bash
# Test de la page d'accueil
curl http://localhost:8087

# Test du health check via le proxy Nginx
curl http://localhost:8087/health

# Test de la page admin
curl http://localhost:8087/gestion-quiz
```

### 3.4 Vérification des volumes

- Lister les volumes

- Inspecter le volume PostgreSQL

### 3.5 Test de persistance des données

- Arrêter les conteneurs (sans supprimer les volumes)

### Redémarrer

### Les données doivent être conservées

---

## Partie 4 : Utiliser l'assistant IA

### 4.1 Écrire les critères d'acceptance AVANT d'utiliser un LLM

Vous devez ensuite demander à un modèle de rediger les Dockerfiles + Docker compose puis vous allez les auditer méthodiquement. L'enjeu est de constater par vous-mêmes le mode d'échec caractéristique de l'IA générative : produire quelque chose qui fonctionne tout en étant mauvais, sans qu'aucune erreur ne remonte.
Dans `criteres.md`, écrivez les critères d'acceptation que devra respecter les Dockerfiles + docker-compose.yml, avant d'avoir vu la moindre proposition du modèle.

> Règle du cours : si vous ne savez pas écrire les critères, vous ne savez pas valider la
> réponse — donc vous ne devez pas déléguer la tâche.

### 4.2 Génération du code avec un ou des modèles

Créez `prompts/dockerfile.md` en appliquant la structure vue en cours
(RÔLE / CONTEXTE / TÂCHE / FORMAT / CRITÈRES).
donnez seulement le contexte et deux ou trois contraintes. Vous voulez observer ce que le modèle propose spontanément, pas lui dicter la réponse.

### 4.3 Auditer

Construisez les images et vérifiez qu'elles démarrent.

### 4.4 La fiche d'évaluation

Remplissez `fiche_evaluation.md`, appuyée sur ce que vous avez observé, pas sur une impression.

```markdown
# Fiche d'évaluation — Génération de Dockerfile par LLM

Modèles testés : ...
Date : ... Binôme : ...

## 1. Valeur

Temps estimé sans IA : ... avec IA (génération + correction) : ...
Gain net : ...

## 2. Vérifiabilité

Temps d'audit : ... Rapport audit/production : ...
Aurions-nous pu auditer sans connaître Docker ? ...

## 3. Risque

Nombre de défauts silencieux (aucune erreur déclenchée) : ...
Le plus grave, et son impact en production : ...

## 4. Données envoyées

Ce que nous avons transmis au fournisseur : ...
Ce qu'il aurait été interdit d'envoyer dans un contexte d'entreprise : ...

## 5. Supervision

Niveau d'autonomie recommandé (N0 à N4) : ...
Justification : ...

## 6. Coût

Tokens consommés : ...
Coût réel dominant : tokens ou temps humain de vérification ?

## 7. Réversibilité

Si ce Dockerfile partait en production sans revue, en combien de temps
détecterait-on le problème, et comment reviendrait-on en arrière ?

## Recommandation

Nous recommandons / ne recommandons pas cet usage, à ce niveau d'autonomie,
pour la raison suivante : ...
```
