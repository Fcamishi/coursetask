import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';

import { take } from 'rxjs';


interface Payload {
  page:number;
  size:number;
  description:string;
}

const initState: Payload={page:1, size:10, description:'' };

@Component({
  selector: 'app-blog-dashboard',
  templateUrl: './blog-dashboard.component.html',
  styleUrls: ['./blog-dashboard.component.css']
})
export class BlogDashboardComponent implements OnInit {
  data:any = []

  constructor( private blogService: BlogService ) {  }

  ngOnInit(): void {
    this.fetchBlogs()
  }

  fetchBlogs(payload:Payload=initState) {
    const{page, size, description} = payload
    this.blogService.getPosts(page, size, description).pipe(take(1)).subscribe((res:any)=>{
      this.data=res.data
      console.log(this.data)
    })
  }

}
