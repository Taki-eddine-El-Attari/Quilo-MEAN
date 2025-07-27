import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../services/article.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-update-article',
  templateUrl: './update-article.component.html',
  styleUrls: ['./update-article.component.css'],
})
export class UpdateArticleComponent implements OnInit {
  id: any;
  article: any = {
    title: '',
    description: '',
    content: '',
    tags: [],
    image: '',
  };

  tag: any = '';
  image: any;
  imagePreview: string | ArrayBuffer = '';
  imageName = '';
  originalImage: string = '';
  imageChanged: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private router: Router,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getArticle();
  }

  getArticle() {
    this.articleService.getArticleById(this.id).subscribe(
      (res: any) => {
        this.article = res;

        // Vérifier si l'utilisateur connecté est bien l'auteur de l'article
        if (
          this.auth.isLoggedIn() &&
          this.auth.getAuthor().id !== this.article.idAuthor
        ) {
          this.router.navigate(['/home']);
          return;
        }

        // Si l'article a une image, on l'affiche
        if (this.article.image) {
          this.originalImage = this.article.image;
          this.imagePreview =
            'http://127.0.0.1:3000/getimage/' + this.article.image;
          this.imageName = this.article.image;
        }
      },
      (err) => {
        console.log(err);
        this.router.navigate(['/home']);
      }
    );
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
    let fd = new FormData();
    fd.append('title', this.article.title);
    fd.append('description', this.article.description);
    fd.append('content', this.article.content);
    fd.append('tags', this.article.tags.toString());
    fd.append('idAuthor', this.article.idAuthor);

    // Si l'image a été modifiée
    if (this.imageChanged && this.image) {
      fd.append('image', this.image);
    }

    this.articleService.updateArticle(this.id, fd).subscribe(
      (res: any) => {
        // Rediriger vers la page de détails de l'article au lieu de la page de l'auteur
        this.router.navigate([`/article/${this.id}`]);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
