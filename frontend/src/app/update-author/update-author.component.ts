import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-author',
  templateUrl: './update-author.component.html',
  styleUrls: ['./update-author.component.css'],
})
export class UpdateAuthorComponent implements OnInit {
  author: any = {
    name: '',
    lastname: '',
    email: '',
    about: '',
    image: '',
  };

  image: any;
  imagePreview: string | ArrayBuffer = '';
  imageName = '';
  imageChanged: boolean = false;

  constructor(public _auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Récupérer les données de l'auteur connecté
    if (this._auth.isLoggedIn()) {
      const authorData = this._auth.getAuthor();
      const authorId = authorData.id;

      // Récupérer les informations complètes de l'auteur
      this._auth.getAuthorId(authorId).subscribe(
        (data: any) => {
          this.author = data;

          // Afficher l'image de profil si disponible
          if (this.author.image) {
            this.imagePreview =
              'http://127.0.0.1:3000/getimage/' + this.author.image;
            this.imageName = this.author.image;
          }
        },
        (err) => {
          console.log(err);
          this.router.navigate(['/home']);
        }
      );
    } else {
      // Si l'utilisateur n'est pas connecté, rediriger vers la page d'accueil
      this.router.navigate(['/login']);
    }
  }

  select(e: any) {
    this.image = e.target.files[0];
    if (this.image) {
      this.imageChanged = true;
      this.imageName = this.image.name;
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          this.imagePreview = reader.result;
        }
      };
      reader.readAsDataURL(this.image);
    }
  }

  update() {
    const authorId = this._auth.getAuthor().id;

    // Créer un FormData pour envoyer les données, y compris l'image
    let fd = new FormData();
    fd.append('name', this.author.name);
    fd.append('lastname', this.author.lastname);
    fd.append('email', this.author.email);
    fd.append('about', this.author.about);

    // Ajouter l'image uniquement si elle a été modifiée
    if (this.imageChanged && this.image) {
      fd.append('image', this.image);
    }

    this._auth.updateAuthor(authorId, fd).subscribe(
      (res: any) => {
        // Rediriger vers la page de l'auteur après la mise à jour
        this.router.navigate(['/author', authorId]);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
