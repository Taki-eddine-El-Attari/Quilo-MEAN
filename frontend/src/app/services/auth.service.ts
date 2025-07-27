import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {} // hna kan injectiw l http client bach n9dro ndirou requests l api

  private url = 'http://127.0.0.1:3000/authors/'; // hna l url dyal l api dyal authors

  register(author: any) {
    return this.http.post(this.url + 'register', author); // hna l url dyal register
  }

  login(author: any) {
    return this.http.post(this.url + 'login', author); // hna l url dyal login
  }

  isLoggedIn() {
    return localStorage.getItem('token') !== null; // hna kan checkiw ila kan l token f local storage
  }

  getAuthor() {
    let token = localStorage.getItem('token'); // hna kan jibo l token mn local storage
    if (token) {
      let data = JSON.parse(window.atob(token.split('.')[1])); // hna kan decodeiw l token bach nakhedo data dyal l author
      return data;
    }
  }

  getAuthorId(id: any) {
    return this.http.get(this.url + 'getById/' + id); // hna l url dyal getbyid
  }

  getAllAuthors() {
    return this.http.get(this.url + 'getAll'); // Fetch all authors from the API
  }

  deleteAccount(id: any) {
    return this.http.delete(this.url + 'delete/' + id); // Pour supprimer un compte
  }

  updateAuthor(id: any, author: any) {
    return this.http.put(this.url + 'update/' + id, author); // Pour mettre à jour un auteur
  }

  logout() {
    localStorage.removeItem('token'); // Pour déconnecter l'utilisateur
  }
}
