export const Questions = [
  // === Partie 1 : Introduction à Ansible ===
  {
    question: "Qu'est-ce qu'Ansible ?",
    answers: [
      "A. Un éditeur de texte pour les fichiers de configuration",
      "B. Un outil d'automatisation de configuration, déploiement et gestion des serveurs",
      "C. Un antivirus pour serveurs Linux",
    ],
    correct:
      "B. Un outil d'automatisation de configuration, déploiement et gestion des serveurs",
  },
  {
    question:
      "Quel protocole est utilisé par Ansible pour se connecter aux machines Linux ?",
    answers: ["A. FTP", "B. HTTP", "C. SSH"],
    correct: "C. SSH",
  },
  {
    question:
      "Le fichier qui contient la liste des machines à gérer avec Ansible s'appelle :",
    answers: ["A. inventory", "B. ansible.cfg", "C. playbook.yaml"],
    correct: "A. inventory",
  },
  {
    question: "Le playbook Ansible est écrit dans quel format ?",
    answers: ["A. XML", "B. JSON", "C. YAML"],
    correct: "C. YAML",
  },
  {
    question: "Dans un playbook, que représente tasks ?",
    answers: [
      "A. Une liste de variables",
      "B. Une liste de modules",
      "C. Une liste d'actions à exécuter",
    ],
    correct: "C. Une liste d'actions à exécuter",
  },
  {
    question: "Quelle commande permet de vérifier la syntaxe d'un playbook ?",
    answers: [
      "A. ansible-playbook --syntax-check monplaybook.yaml",
      "B. ansible-check monplaybook.yaml",
      "C. ansible-validate monplaybook.yaml",
    ],
    correct: "A. ansible-playbook --syntax-check monplaybook.yaml",
  },
  {
    question: "Quelle est l'une des principales forces d'Ansible ?",
    answers: [
      "A. Il nécessite un agent installé sur chaque machine",
      "B. Il permet de créer des jeux vidéo",
      "C. Il est sans agent (agentless)",
    ],
    correct: "C. Il est sans agent (agentless)",
  },
  {
    question: "Comment afficher un message dans un playbook ?",
    answers: [
      "A. Avec le module debug",
      "B. Avec le module print",
      "C. Avec la commande echo",
    ],
    correct: "A. Avec le module debug",
  },
  {
    question: "Quelle est une règle importante de syntaxe en YAML ?",
    answers: [
      "A. Il faut utiliser des balises de fermeture comme en HTML",
      "B. L'indentation est obligatoire et doit être faite avec des espaces",
      "C. Les lignes doivent toujours finir par un point-virgule",
    ],
    correct:
      "B. L'indentation est obligatoire et doit être faite avec des espaces",
  },
  {
    question: "Quelle est la différence entre Ansible et Ansible Red Hat ?",
    answers: [
      "A. Aucun, ce sont exactement les mêmes outils",
      "B. Ansible est opensource, Ansible RedHat est une version entreprise avec support et des fonctionnalités supplémentaires",
      "C. Ansible Red Hat est une version Windows d'Ansible",
    ],
    correct:
      "B. Ansible est opensource, Ansible RedHat est une version entreprise avec support et des fonctionnalités supplémentaires",
  },
  // === Partie 2 : Modules, Inventaire et Playbooks ===
  {
    question: "Qu'est-ce qu'un module dans Ansible ?",
    answers: [
      "A. Un serveur distant utilisé pour l'exécution des tâches",
      "B. Une fonctionnalité permettant d'organiser les rôles dans un playbook",
      "C. Un composant réutilisable permettant d'effectuer une tâche spécifique (ex : copier un fichier, installer un paquet)",
    ],
    correct:
      "C. Un composant réutilisable permettant d'effectuer une tâche spécifique (ex : copier un fichier, installer un paquet)",
  },
  {
    question:
      "Quel module Ansible permet d'installer un paquet sur une machine Debian/Ubuntu ?",
    answers: ["A. yum", "B. apt", "C. rpm"],
    correct: "B. apt",
  },
  {
    question:
      "Dans un playbook, quel paramètre permet de spécifier les machines ciblées ?",
    answers: ["A. hosts", "B. tasks", "C. inventory"],
    correct: "A. hosts",
  },
  {
    question: "Quelle est l'extension d'un fichier de playbook Ansible ?",
    answers: ["A. .ini", "B. .sh", "C. .yaml ou .yml"],
    correct: "C. .yaml ou .yml",
  },
  {
    question: "À quoi sert le fichier inventory dans Ansible ?",
    answers: [
      "A. À stocker les résultats des tâches",
      "B. À indiquer la liste des machines sur lesquelles exécuter les tâches",
      "C. À définir les variables d'environnement",
    ],
    correct:
      "B. À indiquer la liste des machines sur lesquelles exécuter les tâches",
  },
  {
    question: "Que fait la commande ansible-playbook --check monplaybook.yaml",
    answers: [
      "A. Elle exécute le playbook uniquement sur les hôtes de test",
      "B. Elle simule l'exécution du playbook sans rien modifier réellement sur les machines",
      "C. ansible-validate monplaybook.yaml",
    ],
    correct:
      "B. Elle simule l'exécution du playbook sans rien modifier réellement sur les machines",
  },
  {
    question:
      "Quel format est le plus courant pour un fichier inventory statique ?",
    answers: ["A. INI", "B. JSON", "C. CSV"],
    correct: "A. INI",
  },
  {
    question: "Quelle commande permet de lancer un playbook ?",
    answers: ["A. ansible", "B. ansible-pull", "C. ansible-playbook"],
    correct: "C. ansible-playbook",
  },
  {
    question:
      "Quel module Ansible permet de copier un fichier local vers une machine distante ?",
    answers: ["A. fetch", "B. copy", "C. file"],
    correct: "B. copy",
  },
  {
    question:
      "Quelle commande permet d'afficher la liste des hôtes définis dans un fichier d'inventaire ?",
    answers: [
      "A. ansible-playbook --list-hosts",
      "B. ansible --list-hosts",
      "C. ansible-inventory --list",
    ],
    correct: "C. ansible-inventory --list",
  },
  // === Partie 3 : Variables, Facts et Commandes ad hoc ===
  {
    question: "À quoi servent les variables dans Ansible ?",
    answers: [
      "A. À créer des modules personnalisés",
      "B. À stocker des valeurs réutilisables dans les tâches (ex : noms de paquets, chemins, utilisateurs)",
      "C. À générer automatiquement l'inventaire",
    ],
    correct:
      "B. À stocker des valeurs réutilisables dans les tâches (ex : noms de paquets, chemins, utilisateurs)",
  },
  {
    question:
      "Quel est la bonne syntax pour appeler une variable dans un playbook ?",
    answers: ["A. %{ma_variable}", "B. {{ ma_variable }}", "C. $ma_variable"],
    correct: "B. {{ ma_variable }}",
  },
  {
    question:
      "Quel est l'emplacement par défaut pour définir des variables spécifiques à un hôte ?",
    answers: [
      "A. group_vars/all.yaml",
      "B. defaults/main.yaml",
      "C. host_vars/<nom_hôte>.yaml",
    ],
    correct: "C. host_vars/<nom_hôte>.yaml",
  },
  {
    question:
      "Quelle est la priorité la plus élevée dans la gestion des variables dans Ansible ?",
    answers: [
      "A. Les variables définies dans les fichiers vars/",
      "B. Les variables passées en ligne de commande",
      "C. Les variables d'inventaire",
    ],
    correct: "B. Les variables passées en ligne de commande",
  },
  {
    question:
      "Quelle commande Ansible exécute une tâche simple (ex : ping) sans playbook ?",
    answers: ["A. ansible", "B. ansible-run", "C. ansible-playbook"],
    correct: "A. ansible",
  },
  {
    question:
      "Quelle est la structure correcte pour exécuter une commande ad hoc avec un module ?",
    answers: [
      "A. ansible-playbook all -m nom_module",
      "B. ansible inventory -m nom_module",
      "C. ansible all -m nom_module",
    ],
    correct: "C. ansible all -m nom_module",
  },
  {
    question:
      "Quelle commande ad hoc permet d'installer un paquet nginx avec le module apt ?",
    answers: [
      "A. ansible all -m apt -a 'name=nginx state=present update_cache=yes'",
      "B. ansible apt install nginx",
      "C. ansible all -m install -a 'nginx'",
    ],
    correct:
      "A. ansible all -m apt -a 'name=nginx state=present update_cache=yes'",
  },
  {
    question: "Que sont les facts dans Ansible ?",
    answers: [
      "A. Des informations système collectées automatiquement (ex : OS, adresse IP, CPU, etc.)",
      "B. Des messages d'erreur produits pendant l'exécution",
      "C. Des variables temporaires que l'on doit créer manuellement",
    ],
    correct:
      "A. Des informations système collectées automatiquement (ex : OS, adresse IP, CPU, etc.)",
  },
  {
    question: "À quoi sert l'instruction register dans un playbook Ansible ?",
    answers: [
      "A. À créer une nouvelle tâche dans le playbook",
      "B. À stocker le résultat d'une tâche pour le réutiliser plus tard",
      "C. À ajouter un hôte dans l'inventaire",
    ],
    correct:
      "B. À stocker le résultat d'une tâche pour le réutiliser plus tard",
  },
  {
    question: "À quoi sert la commande ansible-lint ?",
    answers: [
      "A. À vérifier la syntaxe YAML d'un playbook uniquement",
      "B. À exécuter un playbook en mode silencieux",
      "C. À analyser un playbook pour détecter les erreurs de style, les mauvaises pratiques et les oublis",
    ],
    correct:
      "C. À analyser un playbook pour détecter les erreurs de style, les mauvaises pratiques et les oublis",
  },
  // === Partie 4 : Handlers, Conditions et Boucles ===
  {
    question: "Qu'est-ce qu'un handler dans Ansible ?",
    answers: [
      "Une fonction de contrôle d'erreur dans un playbook",
      "B. Une tâche spéciale qui s'exécute automatiquement après une autre tâche si elle a changé quelque chose",
      "C. Un module pour gérer les fichiers de configuration",
    ],
    correct:
      "B. Une tâche spéciale qui s'exécute automatiquement après une autre tâche si elle a changé quelque chose",
  },
  {
    question:
      "Quelle directive permet de déclencher un handler depuis une tâche ?",
    answers: ["A. call:", "B. run:", "C. notify:"],
    correct: "C. notify:",
  },
  {
    question: "Où se trouvent généralement les handlers dans un playbook ?",
    answers: [
      "A. Dans la section handlers: à la fin du playbook",
      "B. Dans le fichier inventory",
      "C. Dans le même fichier que l'inventaire dynamique",
    ],
    correct: "A. Dans la section handlers: à la fin du playbook",
  },
  {
    question:
      "Quelle syntaxe permet de n'exécuter une tâche que si une condition est vraie ?",
    answers: ["A. when:", "B. if:", "C. condition:"],
    correct: "A. when:",
  },
  {
    question: "Que permet l'instruction when dans une tâche Ansible ?",
    answers: [
      "A. Elle répète une tâche plusieurs fois",
      "B. Elle définit une condition pour exécuter une tâche",
      "C. Elle ajoute un commentaire dans le playbook",
    ],
    correct: "B. Elle définit une condition pour exécuter une tâche",
  },
  {
    question:
      "Que se passe-t-il si un handler est appelé plusieurs fois dans un playbook ?",
    answers: [
      "Il est exécuté plusieurs fois, à chaque appel",
      "B. Il est ignoré si déjà exécuté une fois",
      "C. Il n'est exécuté qu'une seule fois à la fin du playbook, même s'il est appelé plusieurs fois",
    ],
    correct:
      "C. Il n'est exécuté qu'une seule fois à la fin du playbook, même s'il est appelé plusieurs fois",
  },
  {
    question:
      "Dans quel cas un handler ne sera pas exécuté même s'il est notifié ?",
    answers: [
      "A. Si le nom du handler contient une majuscule",
      "B. Si la tâche n'a rien changé (changed = false)",
      "C. Si le handler se trouve avant la tâche dans le playbook",
    ],
    correct: "B. Si la tâche n'a rien changé (changed = false)",
  },
  {
    question:
      "Quelle est la bonne syntaxe pour vérifier si une variable os_family vaut Debian ?",
    answers: [
      "A. when: os_family == Debian",
      'B. when: os_family = "Debian"',
      'C. when: os_family == "Debian"',
    ],
    correct: 'C. when: os_family == "Debian"',
  },
  {
    question: "À quoi sert l'instruction register dans un playbook Ansible ?",
    answers: [
      "A. À créer une nouvelle tâche dans le playbook",
      "B. À stocker le résultat d'une tâche pour le réutiliser plus tard",
      "C. À ajouter un hôte dans l'inventaire",
    ],
    correct:
      "B. À stocker le résultat d'une tâche pour le réutiliser plus tard",
  },
  {
    question:
      "Quel mot-clé permet de parcourir une liste dans une boucle avec plus de flexibilité (remplaçant with_items) ?",
    answers: ["A. for_each", "B. loop", "C. list"],
    correct: "B. loop",
  },
  // === Partie 5 : Rôles, Collections, Vault et bonnes pratiques ===
  {
    question: "À quoi sert un rôle dans Ansible ?",
    answers: [
      "A. À exécuter une commande ad hoc",
      "B. À organiser des tâches, variables, fichiers et templates de manière réutilisable",
      "C. À stocker les fichiers d'inventaire",
    ],
    correct:
      "B. À organiser des tâches, variables, fichiers et templates de manière réutilisable",
  },
  {
    question:
      "Quelle commande permet de créer la structure d'un rôle Ansible ?",
    answers: [
      "A. ansible-role create mon_role",
      "B. ansible-playbook --role mon_role",
      "C. ansible-galaxy init mon_role",
    ],
    correct: "C. ansible-galaxy init mon_role",
  },
  {
    question: "Qu'est-ce qu'une collection dans Ansible ?",
    answers: [
      "A. Une liste d'options de boucle",
      "B. Un ensemble versionné de rôles, modules, plugins et docs partagés",
      "C. Une archive de sauvegarde des tâches",
    ],
    correct:
      "B. Un ensemble versionné de rôles, modules, plugins et docs partagés",
  },
  {
    question:
      "Quelle commande permet d'installer une collection à partir d'Ansible Galaxy ?",
    answers: [
      "A. ansible-galaxy install nom_de_la_collection",
      "B. ansible-pull collection install",
      "C. ansible install collection",
    ],
    correct: "A. ansible-galaxy install nom_de_la_collection",
  },
  {
    question: "Où sont stockées les collections installées par défaut ?",
    answers: [
      "A. Dans /etc/ansible/collections",
      "B. Dans /opt/ansible/roles",
      "C. Dans ~/.ansible/collections",
    ],
    correct: "C. Dans ~/.ansible/collections",
  },
  {
    question:
      "Quel est le format correct pour référencer un rôle dans un playbook ?",
    answers: [
      "A. - role: mon_role",
      "B. use_role: mon_role",
      "C. role: mon_role",
    ],
    correct: "A. - role: mon_role",
  },
  {
    question:
      "Quel est l'avantage principal d'utiliser des rôles et collections ?",
    answers: [
      "A. Réduire la taille des playbooks",
      "B. Permettre une exécution plus rapide",
      "C. Favoriser la réutilisabilité et la standardisation du code",
    ],
    correct: "C. Favoriser la réutilisabilité et la standardisation du code",
  },
  {
    question: "À quoi sert ansible-vault ?",
    answers: [
      "A. À stocker les rôles partagés dans Ansible Galaxy",
      "B. À chiffrer et déchiffrer des fichiers contenant des données sensibles (mots de passe, clés, etc.)",
      "C. À installer automatiquement les dépendances d'un playbook",
    ],
    correct:
      "B. À chiffrer et déchiffrer des fichiers contenant des données sensibles (mots de passe, clés, etc.)",
  },
  {
    question:
      "Quel est le rôle principal AAP (anciennement Ansible Tower) ou AWX ?",
    answers: [
      "A. Fournir une interface web, une API REST et une gestion des droits pour exécuter des playbooks",
      "B. Compiler les playbooks plus rapidement",
      "C. Remplacer le fichier d'inventaire",
    ],
    correct:
      "A. Fournir une interface web, une API REST et une gestion des droits pour exécuter des playbooks",
  },
  {
    question:
      "Parmi les choix suivants, quelle est une bonne pratique en Ansible ?",
    answers: [
      "A. Regrouper toutes les tâches dans un seul gros playbook",
      "B. Réutiliser des rôles, versionner le code et utiliser des variables bien nommées",
      "C. Éviter les handlers pour simplifier les scripts",
    ],
    correct:
      "B. Réutiliser des rôles, versionner le code et utiliser des variables bien nommées",
  },
];
