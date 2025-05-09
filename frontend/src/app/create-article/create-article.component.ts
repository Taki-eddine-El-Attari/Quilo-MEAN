import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ArticleService } from '../services/article.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent implements OnInit {

  article: any = {
    title: '',
    description: '',
    content: '',
    tags: [],
  };
  
  tag: any = '';

  image: any;
  imagePreview: string | ArrayBuffer = '';
  imageName = '';

  select(e: any) {
    this.image = e.target.files[0]; // hna kan 7to l image f variable
    if (this.image) {
      this.imageName = this.image.name; // hna kan 7to l image name f variable
      const reader = new FileReader(); // hada l reader li ghadi y9ra l image ghay3awnna bach n7to l image preview
      reader.onload = () => { 
        if (reader.result) { 
          this.imagePreview = reader.result; // hna kan 7to l image preview f variable w kan 3mlo display f l html
        }
      };
      reader.readAsDataURL(this.image); // hadi l fonction li ghadi t9ra l image w t7to f l reader
      this.article.image = this.image; // bach n7eto l image f l article
    }
  }

  constructor(private _auth: AuthService , private data: ArticleService, private router: Router ) { } // hna kan 7to l auth service bach n3mlo submit l data w n3iyeto l author id

  ngOnInit(): void {
  }

  create() { 
    let fd = new FormData(); // hna kan 7to l form data bach n3mlo submit l data  
    fd.append('title', this.article.title); // hna kan 7to l title f form data
    fd.append('description', this.article.description);
    fd.append('content', this.article.content);
    fd.append('tags', this.article.tags.toString());
    fd.append('image', this.image);
    fd.append('idAuthor', this._auth.getAuthor().id); // hna kan 7to l id dyal l author li 9ad l article

    this.data.create(fd).subscribe( // hna kan 3mlo subscribe l data service bach n3mlo submit l data
      (res) => {
        this.router.navigate([`/author/${this._auth.getAuthor().id}`]); // hna kan 3mlo redirect l page dyal author 
      },
      (error) => {
        console.log(error); // hna kan 3mlo log l error ila kan chi haja ma3jbatch
      }
    );
  }
  

}
