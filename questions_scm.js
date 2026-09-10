export const Questions = [
  {
    question: "Qu'est-ce que Git ?",
    answers: [
      "A. Un outil de déploiement en production",
      "B. Une base de données relationnelle",
      "C. Un système de gestion de version décentralisé",
    ],
    correct: "C. Un système de gestion de version décentralisé",
  },
  {
    question: "Que signifie SCM (Source Code Management) ?",
    answers: [
      "A. Surveillance des changements matériels",
      "B. Gestion des configurations système",
      "C. Gestion du code source",
    ],
    correct: "C. Gestion du code source",
  },
  {
    question: "Quelle est la différence entre Git, GitLab et GitHub ?",
    answers: [
      "A. Git est un système de version, GitLab et GitHub sont des plateformes collaboratives",
      "B. Il n'y a aucune différence, ce sont les mêmes outils",
      "C. GitHub est un langage de programmation, GitLab est une base de données",
    ],
    correct:
      "A. Git est un système de version, GitLab et GitHub sont des plateformes collaboratives",
  },
  {
    question: "À quoi sert la branche 'main' dans un dépôt Git ?",
    answers: [
      "A. Elle contient le code en production et stable",
      "B. Elle est utilisée uniquement pour les tests unitaires",
      "C. C’est la branche de développement quotidien",
    ],
    correct: "A. Elle contient le code en production et stable",
  },
  {
    question: "Quel est le rôle de la branche 'develop' ?",
    answers: [
      "A. Déployer directement en production",
      "B. Centraliser les développements en cours avant mise en production",
      "C. Remplacer la branche 'main'",
    ],
    correct:
      "B. Centraliser les développements en cours avant mise en production",
  },
  {
    question: "Que fait-on après avoir terminé avec une branche 'feature' ?",
    answers: [
      "A. On la fusionne dans la branche 'develop'",
      "B. On la fusionne directement dans 'main'",
      "C. On la supprime sans la fusionner",
    ],
    correct: "A. On la fusionne dans la branche 'develop'",
  },
  {
    question: "Quel est le rôle de la branche 'release' ?",
    answers: [
      "A. Ajouter des fonctionnalités non testées",
      "B. Tester des correctifs mineurs sans les livrer",
      "C. Préparer une nouvelle version pour la mise en production",
    ],
    correct: "C. Préparer une nouvelle version pour la mise en production",
  },
  {
    question: "Que permet la branche 'hotfix' ?",
    answers: [
      "A. Développer une nouvelle version majeure",
      "B. Ajouter de nouvelles fonctionnalités",
      "C. Corriger rapidement un problème critique en production",
    ],
    correct: "C. Corriger rapidement un problème critique en production",
  },
  {
    question:
      "Dans quel ordre les branches sont généralement fusionnées pour une nouvelle version en production ?",
    answers: [
      "A. hotfix → feature → main",
      "B. feature → develop → release → main",
      "C. feature → main → develop",
    ],
    correct: "B. feature → develop → release → main",
  },
  {
    question: "Que doit-on faire après avoir terminé une 'release' ?",
    answers: [
      "A. Fusionner la 'release' dans 'main' et dans 'develop'",
      "B. Supprimer toutes les branches sans les fusionner",
      "C. Créer une nouvelle branche 'hotfix'",
    ],
    correct: "A. Fusionner la 'release' dans 'main' et dans 'develop'",
  },
];
