import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-all-articles',
  templateUrl: './all-articles.component.html',
  styleUrls: ['./all-articles.component.css']
})
export class AllArticlesComponent implements OnInit {

  articles: any;
  
    constructor(private data: ArticleService) { }
  
    ngOnInit(): void {
      this.data.getAll().subscribe((data: any) => {
        this.articles = data;
      }); 
    }

}
