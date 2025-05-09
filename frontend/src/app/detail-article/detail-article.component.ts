import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../services/article.service';
import { AuthService } from '../services/auth.service'; 

@Component({
  selector: 'app-detail-article',
  templateUrl: './detail-article.component.html',
  styleUrls: ['./detail-article.component.css'],
})
export class DetailArticleComponent implements OnInit {

  id: any;
  article: any;
  author: any;

  constructor(private act: ActivatedRoute,@Inject(ArticleService) private data: ArticleService,private authService: AuthService) {}

  ngOnInit(): void {
    this.id = this.act.snapshot.paramMap.get('id'); // kanjibo l id mn l url
    this.data.getArticleById(this.id).subscribe( // kanjibo l article mn l api 
      (res) => {
        this.article = res; // n7et l article f variable
        if(this.article.idAuthor) {
          this.authService.getAuthorId(this.article.idAuthor).subscribe( // kanjibo l author mn l api
            (authorData: any) => {
              this.author = authorData; // n7et l author f variable
            },
            (err) => {
              console.log("Error fetching author:", err);
            }
          );
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
