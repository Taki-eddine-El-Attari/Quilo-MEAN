import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate { // hna kan implementiw l canActivate interface bach n9dro ndirou 7imaya l routes (middleware f laravel)
  constructor(private _auth: AuthService, private router: Router){} 
  canActivate(){ // hna kan implementiw l canActivate bach n9dro ndirou check ila kan l user logged in wla la
    if(this._auth.isLoggedIn()){
      return true;
    }else{
      this.router.navigate(['/home']) // hna kan redirectiw l user l page dyal home ila ma kanch logged in 
      return false;
    }
  }
  
}
