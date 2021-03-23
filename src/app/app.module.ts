import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import {HttpClientModule,HttpClient} from '@angular/common/http'; 
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {GoogleLoginProvider,FacebookLoginProvider} from 'angularx-social-login';
import { CommonModule } from '@angular/common';
import { AddquestionComponent } from './addquestion/addquestion.component';
import {BlogbackendService} from 'src/app/service/blogbackend.service';



const ROUTES:Routes=[
  {path:"signup",component:SignupComponent},
  {path:"home",component:HomeComponent},
  {path:"addquestion",component:AddquestionComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    HomeComponent,
    AddquestionComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    FormsModule,
    HttpClientModule,
    SocialLoginModule,
    CommonModule,
    ReactiveFormsModule,
  
    
  ],
  providers: [
   
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('149457059037-t9i75j5mnrmvguoq6795s6ausudmsgq4.apps.googleusercontent.com')
          }       
        ]
      } as SocialAuthServiceConfig,
    },
    BlogbackendService
     
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
