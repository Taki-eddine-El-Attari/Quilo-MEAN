import { Component, OnInit } from '@angular/core';
import { last } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  author = { // khassna ndirou l object dyal author li ghadi ndirou bih register
    name: '',
    lastname: '',
    email: '',
    password: '',
    passwordConfirm: '',
    about: '',
  }

  image: any; 

  select(e:any){ // hna function li ghadi tkhod l image mn l input
    this.image = e.target.files[0];
  }
  constructor(private _auth : AuthService, private _router : Router) { } // hna khassna ndirou inject l service dyal auth bach n9dro ndirou register
  // w inject l router bach n9dro ndirou navigation

  ngOnInit(): void {
  }

  register() {
    let fd = new FormData(); // hna khassna ndirou FormData bach n9dro ndirou l image m3a l data dyal author
    fd.append('name', this.author.name); // hna kan addiw l ma3lomat dyal author l FormData
    fd.append('lastname', this.author.lastname);
    fd.append('email', this.author.email);
    fd.append('password', this.author.password);
    fd.append('about', this.author.about);
    fd.append('image', this.image);

    this._auth.register(fd).subscribe( // hna kan dirou register w kan passiw l author li kayn f l form
      // w kan dirou subscribe bach n9dro ndirou l action li bghina ila kan register mzyan
      res=>{
        this._router.navigate(['/login']); // kan dirou navigation l login
      }
    )
  }

}
