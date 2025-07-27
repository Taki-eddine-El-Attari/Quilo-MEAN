import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailArticleComponent } from './detail-article/detail-article.component';
import { CreateArticleComponent } from './create-article/create-article.component';
import { AboutComponent } from './about/about.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { AuthorComponent } from './author/author.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { AuthGuard } from './services/auth.guard';
import { AllArticlesComponent } from './all-articles/all-articles.component';
import { UpdateArticleComponent } from './update-article/update-article.component';
import { UpdateAuthorComponent } from './update-author/update-author.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'} ,
  {path: 'home', component: HomeComponent},
  {path: 'article/:id', component: DetailArticleComponent},
  {path: 'articles', component: AllArticlesComponent},
  {path: 'create', canActivate:[AuthGuard] , component: CreateArticleComponent}, // bach ne7miw l route dyal create article, khassna nkono logged in
  {path: 'update/:id', canActivate:[AuthGuard], component: UpdateArticleComponent}, // Nouvelle route sécurisée pour la mise à jour
  {path: 'edit-profile', canActivate:[AuthGuard], component: UpdateAuthorComponent}, // Route sécurisée pour la mise à jour du profil
  {path: 'about', component: AboutComponent},
  {path: 'privacy', component: PrivacyComponent},
  {path: 'author/:id', component: AuthorComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '**', component: NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
