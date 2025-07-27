import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { AuthorComponent } from './author/author.component';
import { CreateArticleComponent } from './create-article/create-article.component';
import { DetailArticleComponent } from './detail-article/detail-article.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { CoverComponent } from './home/cover/cover.component';
import { BlogListComponent } from './home/blog-list/blog-list.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ReactiveFormsModule } from '@angular/forms';
import { AllArticlesComponent } from './all-articles/all-articles.component';
import { UpdateArticleComponent } from './update-article/update-article.component';
import { UpdateAuthorComponent } from './update-author/update-author.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    AuthorComponent,
    CreateArticleComponent,
    DetailArticleComponent,
    LoginComponent,
    RegisterComponent,
    NotfoundComponent,
    PrivacyComponent,
    CoverComponent,
    BlogListComponent,
    AllArticlesComponent,
    UpdateArticleComponent,
    UpdateAuthorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularEditorModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
