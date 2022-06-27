import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { API_URL } from '../core/api.token';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor( @Inject(API_URL) private apiUrl: string,private http: HttpClient) { }

  addPost(blogData:any) {
    const path =`${this.apiUrl}/post`
    return this.http.post(path, blogData)
  }

  getPosts(page:number, size:number, description: string):Observable<any[]> {
    let params =new HttpParams();

    params = params.append('pageNo', page )
    params = params.append('pageSize', size )
    params = params.append('description', description)


    const path =`${this.apiUrl}/post`

    return this.http.get<any>(path)
  }
}
