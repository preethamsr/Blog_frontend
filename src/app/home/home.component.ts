import { Component, OnInit } from '@angular/core';
import {SocialUser} from 'angularx-social-login'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user:SocialUser;
  name:string;
  commenthisandshow:boolean=false;
  constructor() { }

  ngOnInit(): void {
  this.user=JSON.parse(localStorage.getItem("social_users_google"))
  this.name=this.user.name;
  console.log(this.user);

  }

  comment_div_show()
  {
    this.commenthisandshow=!this.commenthisandshow;
  }

}
