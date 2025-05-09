import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  authors: any[] = []; // Variable to store authors

  constructor(
    private authService: AuthService,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    this.authService.getAllAuthors().subscribe((data: any) => {
      this.authors = data; // Assign fetched authors to the variable

      // Calculate post count for each author
      this.authors.forEach((author) => {
        this.articleService
          .getArticleByIdAuthor(author._id)
          .subscribe((articles: any) => {
            author.postCount = articles.length; // Assign post count
          });
      });
    });
  }
}
