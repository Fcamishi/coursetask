import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBlogComponent } from './blog/components/add-blog/add-blog.component';
import { BlogDashboardComponent } from './blog/components/blog-dashboard/blog-dashboard.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'blog', component:BlogDashboardComponent
  },
  {
    path: 'add-blog', component:AddBlogComponent, canActivate:[AuthGuard]
  },
  {
   path:'',
   redirectTo:'blog', 
   pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
