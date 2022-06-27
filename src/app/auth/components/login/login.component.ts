import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, take } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isSubmited: boolean = false;

  loginForm: FormGroup = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  getInvalidInput(field: string, validation: string = 'required') {
    const control = this.loginForm.get(field);
    return control?.hasError(validation) && control.touched;
  }

  onSubmit() {
    this.isSubmited = true;
    if (this.loginForm.invalid) {
      //  this.toast.warning('Warning', 'Check the form!');
      return;
    }
    this.authService
      .login(this.loginForm.value)
      .pipe(
        take(1),
        finalize(() => (this.isSubmited = false))
      )
      .subscribe({
        next: () => {
          // this.toast.success('You are now logged in!!!', 'Login successful!!');
          // this.router.navigate(['blog']);
          console.log('Login Form', this.loginForm.value);
        },
        error: (err: { error: any }) => {
          console.log('Error', err);
        },
      });
  }
}
