export const Questions = [
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
      "Que fait la commande docker pull ?",
    answers: [
      "Elle exécute un conteneur",
      "Elle télécharge une image Docker depuis Docker Hub",
      "Elle supprime une image Docker locale",
    ],
    correct:
      "Elle télécharge une image Docker depuis Docker Hub",
  },
  {
    question: "Quelle commande est utilisée pour créer une nouvelle image à partir d'un Dockerfile ?",
    answers: [
      "docker build",
      "docker make",
      "docker compile",
    ],
    correct: "docker build",
  },
  {
    question:
      "Quel est le rôle de la commande EXPOSE dans un Dockerfile ?",
    answers: ["Elle démarre un conteneur", "Elle indique à Docker sur quel port le conteneur écoute", "Elle publie l'image sur Docker Hub"],
    correct: "Elle indique à Docker sur quel port le conteneur écoute",
  },
  {
    question:
      "À quoi sert l'instruction WORKDIR dans un Dockerfile ?",
    answers: ["Elle définit le répertoire de travail par défaut où les commandes suivantes seront exécutées", "Elle supprime les fichiers temporaires du conteneur", "Elle crée un utilisateur spécifique pour exécuter le conteneur"],
    correct: "Elle définit le répertoire de travail par défaut où les commandes suivantes seront exécutées",
  },
];
