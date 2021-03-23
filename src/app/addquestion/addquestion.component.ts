import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostQuestion } from 'src/app/Models/post-question';
import {BlogbackendService} from 'src/app/service/blogbackend.service';
import {HttpClient,HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-addquestion',
  templateUrl: './addquestion.component.html',
  styleUrls: ['./addquestion.component.css']
})
export class AddquestionComponent implements OnInit {
  thefile: any;
  activationcode: any;
  message:string;
  files: PostQuestion =
    {
      fileName: null,
      fileSize: null,
      fileType: null,
      lastModifiedTime: null,
      lastModifiedDate: null,
      fileAsBase64: null,
      title: null,
      body: null
    }

  errormessage: string;
  MAX_SIZE: number = 1048576;

  postquestion = new FormGroup({
    title: new FormControl("", [Validators.required, Validators.minLength(20), Validators.maxLength(50)]),
    body: new FormControl("", [Validators.required, Validators.minLength(100)]),
  });
  get post_title() { return this.postquestion.get("title") };
  get post_body() { return this.postquestion.get("body") };


  constructor(private backend:BlogbackendService,private http:HttpClient) { }

  ngOnInit(): void {

    this.activationcode = localStorage.getItem("activationcode");
    console.log(this.activationcode)
  }
  onselectedfile(event) {
    console.log(event.target.files);

    if (event.target.files[0].size < this.MAX_SIZE) {
      this.thefile = event.target.files[0];
    }
    else {
      this.errormessage = "File is more than 1Mb";
    }

  }
  postquestionmethod() {
    if (this.thefile != null) {
      this.files.fileName = this.thefile.name;
      this.files.fileSize = this.thefile.size;
      this.files.fileType = this.thefile.type;
      let filereader = new FileReader();
      filereader.onload = () => {
        this.files.fileAsBase64 = filereader.result.toString();   
         this.backend.postquestion(this.files,this.activationcode).subscribe(res=>
          {
            if(res.status==200)
            {
              this.message="Question is posted successfully";
            }
          })
      }
      filereader.readAsDataURL(this.thefile);
     

    }
  }

}
