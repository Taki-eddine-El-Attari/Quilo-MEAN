import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css'],
})
export class AuthorComponent implements OnInit {
  id: any;
  author: any;
  articles: any;
  articleToDeleteId: any = null;
  accountToDelete: boolean = false;
  constructor(
    public act: ActivatedRoute,
    public _auth: AuthService,
    private data: ArticleService
  ) {} // hna kan injectiw l activated route bach n9dro ndirou routing
  // w kan injectiw l auth service bach n9dro ndirou requests l api

  ngOnInit(): void {
    this.id = this.act.snapshot.paramMap.get('id'); // bach ne9raw id dyal author mn l url
    this._auth.getAuthorId(this.id).subscribe(
      (data) => {
        // hna kan ndirou request l api bach n9dou l author
        this.author = data; // hna kan 7to l author f variable
      },
      (err) => {
        console.log(err); // hna kan chofou l error f console ila kan chi haja khatya
      }
    );
    this.data.getArticleByIdAuthor(this.id).subscribe(
      (res) => {
        // hna kan ndirou request l api bach n9dou l articles dyal author
        this.articles = res; // hna kan 7to l articles f variable
        this.author.postCount = this.articles.length; // hna kan7esbo posts dyal author
      },
      (err) => {
        console.log(err);
      }
    );
  }

  confirmDeleteArticle(id: any) {
    // kan jibou id dyal article li bghina ndirou delete
    this.articleToDeleteId = id;
  }

  deleteArticleConfirmed() {
    // bach ndirou delete l article
    if (!this.articleToDeleteId) return; // ila ma kanch id dyal article li bghina ndirou delete
    this.data.deleteArticle(this.articleToDeleteId).subscribe(
      // hna kan ndirou request l api bach ndirou delete
      () => {
        this.articles = this.articles.filter(
          (a: any) => a._id !== this.articleToDeleteId
        ); // kan 7to l articles li ma 3ndhomch id dyal article li bghina ndirou delete
        this.articleToDeleteId = null; // kan 7eto null l id
        this.author.postCount = this.articles.length; // kan 7esbo posts dyal author
      },
      (err) => {
        console.log(err);
        this.articleToDeleteId = null; // ila kan chi error f delete kan 7to l id dyal article null
      }
    );
  }
  cancelDelete() {
    // bach ncanceliw l delete
    this.articleToDeleteId = null;
  }


  confirmDeleteAccount() {
    // bach ndirou confirm l delete dyal account
    this.accountToDelete = true;
  }

  deleteAccountConfirmed() {
    // bach ndirou delete l account
    this._auth.deleteAccount(this.id).subscribe(
      () => {
        // kan deconnectiw l utilisateur w n7aydo l token mn local storage
        this._auth.logout();
        window.location.href = '/login'; // redirect l login page
      },
      (err) => {
        console.log(err);
        this.accountToDelete = false;
      }
    );
  }

  cancelAccountDelete() {
    // bach ncanceliw l delete dyal account
    this.accountToDelete = false;
  }
}
