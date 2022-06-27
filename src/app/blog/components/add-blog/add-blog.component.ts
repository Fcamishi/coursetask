import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogService } from 'src/app/services/blog.service';
import { take } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent implements OnInit {

  addForm: FormGroup = this.fb.group({
    description:['', Validators.required],
    imageUrl: ['',Validators.required]
  })

  constructor(private fb: FormBuilder, private blogService: BlogService, private router:Router) { }

  ngOnInit(): void {
  }

  onAddBlog() {

    this.blogService.addPost(this.addForm.value).pipe(take(1)).subscribe({   
      next:(res:any)=>{
        console.log('Res',res);
        
        this.router.navigate(['/blog'])
      }}
    )

  }

}
