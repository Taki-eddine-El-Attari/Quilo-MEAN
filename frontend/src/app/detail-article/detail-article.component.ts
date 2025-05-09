import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-detail-article',
  templateUrl: './detail-article.component.html',
  styleUrls: ['./detail-article.component.css'],
})
export class DetailArticleComponent implements OnInit {

  id: any;
  article: any;

  constructor(private act: ActivatedRoute,@Inject(ArticleService) private data: ArticleService) {}
  // hna kan injectiw l article service bach n9dro ndirou requests l api
  

  ngOnInit(): void {
    this.id = this.act.snapshot.paramMap.get('id'); // hna kan jibo l id mn l url
    this.data.getArticleById(this.id).subscribe((res) => { // hna kan ndirou request l api bach n9drou l article  
      this.article = res; // hna kan khzno l result f l variable article
    },
    (err) => {
      console.log(err); // hna kan chofiw ila kan chi erreur
    });
  }
}
