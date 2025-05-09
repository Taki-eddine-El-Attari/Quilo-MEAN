import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-all-articles',
  templateUrl: './all-articles.component.html',
  styleUrls: ['./all-articles.component.css']
})
export class AllArticlesComponent implements OnInit {
articles: any[] = []; 
  authors: any[] = [];
  authorsDict: { [key: string]: any } = {}; // hada dict li ghadi n7et fih l authors b id dyalhom

  constructor(private data: ArticleService, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getAllAuthors().subscribe((data: any) => { // kanjibo l authors mn l api
      this.authors = data;
      this.authors.forEach((author: any) => { 
        this.authorsDict[author._id] = author; // n7et l authors f dictionary
      });

      this.data.getAll().subscribe((data: any) => { // kanjibo l articles mn l api
        this.articles = data.map((article: any) => { 
          if (article.idAuthor && typeof article.idAuthor === 'object') { // kanchof ila kan idAuthor object
            article.idAuthor = article.idAuthor._id; // kan7et id dyal author f variable
          }
          return article;
        });
      });
    });
  }

}
