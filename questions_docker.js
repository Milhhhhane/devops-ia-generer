export const Questions = [
  {
    question:
      "Quelle commande est utilisée pour créer une nouvelle image à partir d'un Dockerfile ?",
    answers: ["docker build", "docker make", "docker compile"],
    correct: "docker build",
  },
  {
    question: "Quelle est la principale fonction d'un volume Docker ?",
    answers: [
      "Stocker les images Docker",
      "Partager des données entre le conteneur et l'hôte",
      "Assurer la communication entre les conteneurs",
    ],
    correct: "Partager des données entre le conteneur et l'hôte",
  },
  {
    question: "Quel est le rôle du Dockerfile ?",
    answers: [
      "Il décrit comment construire un conteneur",
      "Il exécute directement un conteneur",
      "Il installe Docker sur votre machine",
    ],
    correct: "Il décrit comment construire un conteneur",
  },
  {
    question:
      "Quel est le format du fichier utilisé par Docker Compose pour définir les services ?",
    answers: ["JSON", "YAML", "XML"],
    correct: "YAML",
  },
  {
    question: "Que fait la commande docker pull ?",
    answers: [
      "Elle exécute un conteneur",
      "Elle télécharge une image Docker depuis Docker Hub",
      "Elle supprime une image Docker locale",
    ],
    correct: "Elle télécharge une image Docker depuis Docker Hub",
  },
  {
    question: "Quel est le rôle de la commande EXPOSE dans un Dockerfile ?",
    answers: [
      "Elle démarre un conteneur",
      "Elle indique à Docker sur quel port le conteneur écoute",
      "Elle publie l'image sur Docker Hub",
    ],
    correct: "Elle indique à Docker sur quel port le conteneur écoute",
  },
  {
    question: "À quoi sert l'instruction WORKDIR dans un Dockerfile ?",
    answers: [
      "Elle définit le répertoire de travail par défaut où les commandes suivantes seront exécutées",
      "Elle supprime les fichiers temporaires du conteneur",
      "Elle crée un utilisateur spécifique pour exécuter le conteneur",
    ],
    correct:
      "Elle définit le répertoire de travail par défaut où les commandes suivantes seront exécutées",
  },
  {
    question:
      "Dans Docker, quel type de réseau permet à un conteneur de se connecter directement au réseau de l’hôte ?",
    answers: ["Réseau bridge", "Réseau overlay", "Réseau host"],
    correct: "Réseau host",
  },
  {
    question: "Quelle commande permet de lister les volumes Docker existants ?",
    answers: ["docker volume ls", "docker volumes list", "docker list volume"],
    correct: "docker volume ls",
  },
  {
    question:
      "Avec Docker Compose, quelle commande permet de démarrer les services définis dans le fichier YAML ?",
    answers: [
      "docker-compose start",
      "docker-compose up",
      "docker-compose init",
    ],
    correct: "docker-compose up",
  },
  {
    question: "Quel est le rôle principal d’un réseau bridge dans Docker ?",
    answers: [
      "Permettre aux conteneurs de communiquer avec l'hôte",
      "Permettre la communication entre conteneurs sur la même machine",
      "Connecter des conteneurs à un réseau externe",
    ],
    correct: "Permettre la communication entre conteneurs sur la même machine",
  },
  {
    question:
      "Dans Docker Compose, comment spécifie-t-on un volume pour un service ?",
    answers: ["- volumes:", "volume:", "volumes:"],
    correct: "volumes:",
  },
  {
    question: "Quelle commande permet de supprimer un volume Docker ?",
    answers: [
      "docker volume delete <volume_name>",
      "docker volume remove <volume_name>",
      "docker volume rm <volume_name>",
    ],
    correct: "docker volume rm <volume_name>",
  },
  {
    question:
      "Lorsqu'on crée un réseau dans Docker Compose, quel mot-clé doit-on utiliser dans le fichier YAML ?",
    answers: ["networks:", "connections:", "network:"],
    correct: "networks:",
  },
  {
    question:
      "Quel est l'avantage d'utiliser Docker Compose pour gérer les conteneurs ?",
    answers: [
      "Il permet de créer des conteneurs plus rapidement",
      "Il permet de définir et de gérer plusieurs conteneurs avec des configurations complexes",
      "Il offre un meilleur contrôle sur le stockage des images Docker",
    ],
    correct:
      "Il permet de définir et de gérer plusieurs conteneurs avec des configurations complexes",
  },
  {
    question:
      "Quelle instruction Dockerfile permet de définir la commande par défaut exécutée au démarrage du conteneur ?",
    answers: ["RUN", "CMD", "EXEC"],
    correct: "CMD",
  },
  {
    question:
      "Quelle commande Docker Compose permet d'arrêter et de supprimer les conteneurs ?",
    answers: [
      "docker compose stop",
      "docker compose down",
      "docker compose remove",
    ],
    correct: "docker compose down",
  },
  {
    question:
      "Quelle est la différence principale entre COPY et ADD dans un Dockerfile ?",
    answers: [
      "COPY est plus rapide que ADD",
      "ADD peut extraire automatiquement des archives et télécharger des URLs",
      "COPY fonctionne uniquement avec des fichiers texte",
    ],
    correct:
      "ADD peut extraire automatiquement des archives et télécharger des URLs",
  },
  {
    question: "Dans Docker Compose, à quoi sert l'option depends_on ?",
    answers: [
      "Elle définit les variables d'environnement partagées",
      "Elle spécifie l'ordre de démarrage des services",
      "Elle configure les ports exposés",
    ],
    correct: "Elle spécifie l'ordre de démarrage des services",
  },
  {
    question:
      "Quelle commande permet d'exécuter une commande dans un conteneur Docker en cours d'exécution ?",
    answers: ["docker run", "docker exec", "docker start"],
    correct: "docker exec",
  },
];
