import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { } // hna kan injectiw l http client bach n9dro ndirou requests l api

  url = 'http://127.0.0.1:3000/articles/'; // corrected API URL port & host

  create(article: any) {
    return this.http.post(this.url + 'add', article); // hna l url dyal create
  }

  getAll() {
    return this.http.get(this.url + 'getAll'); // hna l url dyal getall
  } 

  getArticleByIdAuthor(id: any) {
    return this.http.get(this.url + 'getByAuthor/' + id); // hna l url dyal getbyidauthor
  }

  getArticleById(id: any) {
    return this.http.get(this.url + 'getById/' + id); // hna l url dyal getbyid
  }
}
