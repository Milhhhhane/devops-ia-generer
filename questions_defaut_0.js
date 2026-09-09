export const Questions = [
  {
    question:
      "Qu'est-ce qu'un conteneur Docker ?",
    answers: ["Une machine virtuelle complète", "Une unité légère contenant une application et ses dépendances", "Un fichier de configuration de Docker"],
    correct: "Une unité légère contenant une application et ses dépendances",
  },
  {
    question:
      "Quelle commande permet de lancer un conteneur Docker à partir d'une image ?",
    answers: ["docker container create", "docker container run", "docker container execute"],
    correct: "docker container run",
  },
  {
    question: "Quelle est la commande pour lister tous les conteneurs en cours d'exécution ?",
    answers: ["docker ls", "docker ps", "docker status"],
    correct: "docker ps",
  },
  {
    question: "Quelle commande permet d'arrêter un conteneur en cours d'exécution ?",
    answers: ["docker stop <container-id>", "docker remove <container-id>", "docker kill <container-id>"],
    correct: "docker stop <container-id>",
  },
  {
    question:
      "Que fait la commande docker commit ?",
    answers: ["Elle sauvegarde l'état actuel d'un conteneur en tant que nouvelle image Docker", "Elle démarre un nouveau conteneur à partir d'une image existante", "Elle met à jour un conteneur avec de nouvelles modifications sans le redémarrer"],
    correct: "Elle sauvegarde l'état actuel d'un conteneur en tant que nouvelle image Docker",
  },
];
