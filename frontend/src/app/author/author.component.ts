import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {

  id : any;
  author : any;
  articles : any;
  constructor(public act: ActivatedRoute, public _auth: AuthService, private data: ArticleService) { } // hna kan injectiw l activated route bach n9dro ndirou routing
  // w kan injectiw l auth service bach n9dro ndirou requests l api

  ngOnInit(): void {
    this.id= this.act.snapshot.paramMap.get('id'); // bach ne9raw id dyal author mn l url
    this._auth.getAuthorId(this.id).subscribe((data) => { // hna kan ndirou request l api bach n9dou l author
      this.author = data; // hna kan 7to l author f variable
    },
    (err) => {
      console.log(err); // hna kan chofou l error f console ila kan chi haja khatya
    }  
  ); 
    this.data.getArticleByIdAuthor(this.id).subscribe((res) => { // hna kan ndirou request l api bach n9dou l articles dyal author
      this.articles = res; // hna kan 7to l articles f variable
      this.author.postCount = this.articles.length; // hna kan7esbo posts dyal author
    },
    (err) => {
      console.log(err); // hna kan chofou l error f console ila kan chi haja khatya
    });
  }

}
