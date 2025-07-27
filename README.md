# Quilo - Projet de Blog avec la Stack MEAN

Quilo est une application web de blog complète construite avec la stack MEAN (MongoDB, Express.js, Angular, Node.js). Elle permet aux utilisateurs de créer, lire, mettre à jour et supprimer des articles de blog, ainsi que de gérer les auteurs.

## Fonctionnalités

*   Création, lecture, mise à jour et suppression (CRUD) d'articles.
*   Gestion des auteurs.
*   Upload d'images pour les articles.
*   Interface utilisateur responsive construite avec Angular.
*   API RESTful pour la gestion du contenu.

## Technologies Utilisées

### Backend

*   **Node.js**: Environnement d'exécution JavaScript côté serveur.
*   **Express.js**: Framework web pour Node.js.
*   **MongoDB**: Base de données NoSQL.
*   **Mongoose**: Bibliothèque de modélisation d'objets pour MongoDB.
*   **jsonwebtoken**: Pour l'authentification basée sur les tokens.
*   **bcrypt**: Pour le hachage des mots de passe.
*   **multer**: Middleware pour la gestion des uploads de fichiers.

### Frontend

*   **Angular**: Framework pour la construction d'applications web côté client.
*   **RxJS**: Programmation réactive avec les Observables.
*   **Bootstrap**: Framework CSS pour le design responsive.

## Prérequis

Avant de commencer, assurez-vous d'avoir les outils suivants installés sur votre système :

*   [Node.js](https://nodejs.org/) (qui inclut npm)
*   [MongoDB](https://www.mongodb.com/try/download/community)
*   [Angular CLI](https://angular.io/cli)

## Installation et Lancement du Projet

Ce projet inclut un script batch (`start-project.bat`) qui automatise l'installation et le lancement de l'application.

1.  **Clonez le dépôt :**

    ```bash
    git clone https://github.com/votre-utilisateur/votre-projet.git
    cd votre-projet
    ```

2.  **Exécutez le script de démarrage :**

    Ouvrez un terminal et exécutez la commande suivante :

    ```bash
    start-project.bat
    ```

    Ce script effectuera les actions suivantes :
    *   Démarrera le service MongoDB.
    *   Installera les dépendances du backend (`npm install` dans le dossier `backend`).
    *   Installera les dépendances du frontend (`npm install` dans le dossier `frontend`).
    *   Démarrera le serveur backend Node.js.
    *   Démarrera le serveur de développement Angular.
    *   Ouvrira l'application dans votre navigateur par défaut à l'adresse `http://localhost:4200`.

## Structure du Projet

```
.
├── backend/                # Code source du backend (Node.js/Express)
│   ├── config/
│   ├── models/
│   ├── routes/
│   └── server.js
├── frontend/               # Code source du frontend (Angular)
│   └── src/
│       ├── app/
│       ├── assets/
│       └── environments/
├── .gitignore
├── README.md
└── start-project.bat
```

## Documentation de l'API

L'API RESTful fournit les points de terminaison suivants pour la gestion des articles et des auteurs :

### Articles

*   `POST /article/add` : Crée un nouvel article. Nécessite un corps de requête avec les données de l'article et une image (multipart/form-data).
*   `GET /article/getAll` : Récupère tous les articles.
*   `GET /article/getById/:id` : Récupère un article par son ID.
*   `GET /article/getByAuthor/:idAuthor` : Récupère tous les articles d'un auteur spécifique.
*   `PUT /article/update/:id` : Met à jour un article existant.
*   `DELETE /article/delete/:id` : Supprime un article.

### Auteurs

*   `POST /author/register` : Enregistre un nouvel auteur.
*   `POST /author/login` : Connecte un auteur et retourne un token JWT.
*   `GET /author/getAll` : Récupère tous les auteurs.
*   `GET /author/getById/:id` : Récupère un auteur par son ID.
*   `PUT /author/update/:id` : Met à jour les informations d'un auteur.
*   `DELETE /author/delete/:id` : Supprime un auteur.

## Contribution

Les contributions sont les bienvenues ! Si vous souhaitez contribuer à ce projet, veuillez suivre les étapes suivantes :

1.  Forkez le projet.
2.  Créez une nouvelle branche (`git checkout -b feature/nouvelle-fonctionnalite`).
3.  Commitez vos changements (`git commit -m 'Ajout d'une nouvelle fonctionnalité'`).
4.  Pushez vers la branche (`git push origin feature/nouvelle-fonctionnalite`).
5.  Ouvrez une Pull Request.

## Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` for plus de détails.
