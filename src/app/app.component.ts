import { Component } from '@angular/core';
import {SocialUser} from 'angularx-social-login';
import {google_login} from'src/app/Models/googlelogin';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Blog';
 // dropdown_disable:boolean=false;
  user:SocialUser;
  name:string;
  constructor(){}

  ngOnInit():void
  {
     if(localStorage.getItem("social_users_google")!=null)
     {
     //  this.dropdown_disable=!this.dropdown_disable;
       this.user=JSON.parse(localStorage.getItem("social_users_google"));
       console.log(this.user)
       this.name=this.user.name
     }
  }
}
