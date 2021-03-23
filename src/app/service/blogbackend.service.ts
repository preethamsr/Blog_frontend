import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import {PostQuestion} from 'src/app/Models/post-question';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogbackendService {

  constructor(private http:HttpClient) { }

  
  postquestion(thefile:PostQuestion,activationcode):Observable<any>
  {
    const httpheaders=new HttpHeaders({
      'content-type':'application/json'
    })   
   return this.http.post<PostQuestion>("https://localhost:44318/Api/Postquestion/postquestion?activationdcode="+activationcode,thefile,{headers:httpheaders})
      
  }
}
