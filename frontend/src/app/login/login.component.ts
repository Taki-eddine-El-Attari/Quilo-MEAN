import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  author = {
    email: '',
    password: ''
  }
  
  constructor(private _auth: AuthService , private _router: Router) { } // hna f constructor khassna ndir inject l service dyal auth bach n9dro ndirou login
  // w inject l router bach n9dro ndirou navigation

  ngOnInit(): void {
  }

  token: any;
  login(){
    this._auth.login(this.author).subscribe( // hna kan dirou login w kan passiw l author li kayn f l form
      // w kan dirou subscribe bach n9dro ndirou l action li bghina ila kan login mzyan
      res => {
        this.token = res; // kan jibo l token mn l response
        localStorage.setItem('token', this.token.mytoken); // kan khzno l token f local storage
        this._router.navigate(['/home']); // w kan dirou navigation l home
      },
      error => {
        console.log(error); // ila kan chi error kan printiwha f console
      }
    )
  }

}
