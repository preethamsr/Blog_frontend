import { Component, Injectable, OnInit } from '@angular/core';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider, SocialUser } from "angularx-social-login";
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { signin } from 'src/app/Models/signin';
import { login } from 'src/app/Models/Loginmodel';
import { forgotpassword } from 'src/app/Models/forgotpassword';


declare var FB: any
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  user: SocialUser;
  toastr: any;
  auth2: any;
  error: string;
  Email_exists: string;
  Email_successfully_sent_message: string;
  Login_error_message: string
  forgotpassworddivhide: boolean = false;
  Enter_otp: string;
  verficationok: Boolean = false;
  otpverificationerror: string;
  activationcode: any;


  user_registration = new FormGroup({
    name: new FormControl("", Validators.required),
    lastname: new FormControl("", Validators.required),
    email: new FormControl("", Validators.email),
    password_userregistration: new FormControl("", [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])
  });
  get name() { return this.user_registration.get('name') }
  get lastname() { return this.user_registration.get('lastname') }
  get email() { return this.user_registration.get('email') }
  get password_user_registration() { return this.user_registration.get('password_userregistration') }

  login = new FormGroup({
    login_email: new FormControl("", Validators.email),
    passowrd_login: new FormControl("", Validators.required),

    OTP: new FormControl("", Validators.required)
  });

  get lgemail() { return this.login.get("login_email") };
  get lgpassword() { return this.login.get("passowrd_login") }
  get otp_validator() { return this.login.get("OTP") }

  forgotpassword = new FormGroup({
    frgtpassword: new FormControl("", Validators.required)
  })
  get forgpassword() { return this.login.get("frgtpassword") }


  sign: signin = {
    Firstname: null,
    Lastname: null,
    Email: null,
    password: null,
  }
  user_login: login = {
    Email: null,
    password: null
  }

  forgotpass: forgotpassword =
    {
      email: null
    }

  constructor(private authService: SocialAuthService, private route: Router, private activatedroute: ActivatedRoute,
    private http: HttpClient) { }

  ngOnInit(): void {

    (window as any).fbAsyncInit = function () {
      FB.init({
        appId: '277072117153996',
        cookie: true,
        xfbml: true,
        version: 'v3.10'
      });

      FB.AppEvents.logPageView();

    };

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  fblogin() {
    console.log("submit login to facebook");
    // FB.login();
    FB.login((response) => {
      console.log('submitLogin', response);
      if (response.authResponse) {
        console.log(response.token)
        this.fbloginserver(response.accessToken);
        this.user = response;
        console.log(this.user.authToken);
      }
      else {
        console.log('User login failed');
      }
    });
  }

  fbloginserver(token: string) {
    this.http.get('https://graph.facebook.com/me?access_token=' + token).subscribe(response => {
      console.log(response);
    })
  }

  Google_signin() {
    let socialPlatformProvider;
    socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    this.authService.signIn(socialPlatformProvider).then(google_user => {
      console.log(JSON.stringify(google_user))
      if (google_user.email) {
        this.http.post('https://localhost:44318/Api/Signin/google_login', {
          First_name: google_user.firstName,
          Email: google_user.email
        }, { observe: 'response' }).subscribe(res => {
          if (res.status == 202 || res.status == 200) {

            localStorage.setItem("social_users_google", JSON.stringify(google_user));
            const Navigationextra: NavigationExtras =
            {
              queryParams:
              {
                activationcode: res.body
              }
            }
            this.activationcode=res.body;
            localStorage.setItem("activationcode",this.activationcode);
            this.route.navigate(['home'], Navigationextra);
          }
          else {
            this.error = "Erro try again later";
          }
        })
      }
    })
  }
  signin() {
    this.http.post('https://localhost:44318/Api/Signin/signup',
      {
        First_name: this.sign.Firstname,
        Last_name: this.sign.Lastname,
        Email: this.sign.Email,
        password: this.sign.password
      }, { observe: 'response' }).subscribe(res => {
        if (res.status == 201) {
          this.Email_successfully_sent_message = "Verification mail successfully sent";

        }
        else if (res.status == 204) {
          this.Email_exists = "An account with this email address already exists";
        }
      })
  }

  Login() {
    this.http.post('https://localhost:44318/Api/Login/Login', {
      Email: this.user_login.Email,
      password: this.user_login.password
    }, { observe: 'response' }).subscribe(res => {
      if (res.status == 200) {
        const NavigationExtra: NavigationExtras =
        {
          queryParams:
          {
            activationcode: res.body
          }
        }
        this.route.navigate(['home'], NavigationExtra);
      }
      else if (res.status == 204) {
        this.Login_error_message = "User not found";
      }
    })
  }

  forgotpassworddivhidefun() {
    this.forgotpassworddivhide = !this.forgotpassworddivhide;
  }
  forgotpassowrdemailsubmitting() {
    this.http.post('https://localhost:44318/Api/Login/Forgotpassword?Email=' + this.forgotpass.email, {

    },
      { observe: 'response' }).subscribe(res => {
        localStorage.setItem("forgotpasswordemial", this.forgotpass.email)
      })
  }

  otpverification() {
    this.http.post('https://localhost:44318/Api/Resetpasword/otpverfication?otp=' + this.Enter_otp, {

    }, { observe: 'response' }).subscribe(res => {
      if (res.status == 200) {
        this.verficationok = !this.verficationok;
      }
      else if (res.status == 204) {
        this.otpverificationerror = "Invalid OTP";
      }
    })
  }
}
