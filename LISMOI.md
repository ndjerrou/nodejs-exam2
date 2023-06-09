# Titre du projet : Système de gestion de bibliothèque avec une base de données JSON locale

Contexte : Vous avez été chargé de développer une API de gestion de bibliothèque en utilisant Node.js, Express et JavaScript ES6. L'API fournira des points d'accès pour gérer les livres d'une bibliothèque. Dans ce projet, vous utiliserez un fichier JSON local comme une base de données simple pour stocker les données des livres de manière persistante. Votre objectif principal devrait être de concevoir des opérations CRUD efficaces, une gestion appropriée des erreurs, la mise en œuvre de middleware et les interactions avec la base de données.

### Tâches du projet :

- Mettre en place un serveur Express avec les dépendances nécessaires. OK

- Créer un fichier JSON local nommé "library.json" pour stocker les données des livres. OK
- Concevoir les points d'accès suivants :
  GET /books : Récupérer tous les livres de la bibliothèque. OK

  GET /books/:id : Récupérer un livre spécifique par son ID. OK

  POST /books : Ajouter un nouveau livre à la bibliothèque. OK

  PUT /books/:id : Mettre à jour un livre existant par son ID. [*L'utilisation de la méthode splice est interdite ici*]

  DELETE /books/:id : Supprimer un livre de la bibliothèque par son ID. OK

- Implémenter des gestionnaires de requêtes appropriés et une gestion des erreurs pour chaque point d'accès.

- Implémenter des fonctionnalités de tri et de filtrage pour le point d'accès /books (par exemple, trier par titre, filtrer par auteur).
- Ajouter une pagination au point d'accès /books pour limiter le nombre de livres renvoyés par requête.

- Utiliser des fonctions middleware pour gérer les tâches courantes :
  - Implémenter un middleware de journalisation qui enregistre les détails de chaque requête entrante (intention, point d'accès ciblé, nom d'hôte de la requête au minimum).
  - Créer un middleware d'authentification pour protéger l'accès à certaines routes (seulement la route DELETE). Il devrait fonctionner comme suit : req.user doit être renseigné pour accéder au point d'accès. Sinon, nous renvoyons une erreur au client.
# Exigences

- Structure d'un livre : titre, auteur, nationalité  OK
- Utiliser Joi pour la validation   OK
- Lire et écrire les données des livres dans/depuis le fichier "library.json" pour la persistance.
- Écrire du code pour valider et nettoyer les données entrantes lors de la création et de la mise à jour des livres.
- Inclure un middleware de gestion des erreurs pour gérer les erreurs 404 (Non trouvé) et 500 (Erreur interne du serveur) de manière appropriée.
- Utiliser la syntaxe et les fonctionnalités ES6 lorsque cela est applicable (fonctions fléchées, destructuration, etc.).
- Organiser votre code en modules/fichiers séparés pour une meilleure gestion du code.  OK
- Rédiger une documentation claire et concise pour chaque point d'accès, y compris les formats de requête/réponse attendus.
- Tester votre API à l'aide d'un client REST (par exemple, Postman) pour vous assurer que les points d'accès fonctionnent comme prévu.
- Faire preuve d'une gestion appropriée des erreurs pour les cas particuliers, tels que les requêtes invalides ou les entrées de livre manquantes.
- Seule la syntaxe async/await est autorisée pour assurer une bonne gestion du code asynchrone.

Note : Dans ce projet, le fichier JSON local servira de base de données de base pour simplifier. Concentrez-vous sur la mise en œuvre de la fonctionnalité côté serveur, la récupération et la manipulation efficaces des données, l'utilisation du middleware et la gestion des erreurs.
