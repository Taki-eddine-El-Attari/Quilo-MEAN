import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Blog App';

  // Injection du Router pour accéder à l'URL courante
  constructor(public router: Router) {}

  /**
   * Getter showHeaderFooter
   * Vérifie l'URL active via router.url
   * Renvoie false si l'on est sur /login ou /register pour masquer header/footer,
   * true dans tous les autres cas.
   */
  get showHeaderFooter(): boolean {
    // router.url contient le chemin actuel (e.g. '/login')
    return !['/login', '/register'].includes(this.router.url);
  }
}
