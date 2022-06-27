import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize, take } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isSubmited: boolean = false;
  registerForm: FormGroup = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [ Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]],
  });
  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {}

  getInvalidInput(field: string, validation: string = 'required') {
    const control = this.registerForm.get(field);
    return control?.hasError(validation) && control.touched;
  }

  onSubmit() {
    this.isSubmited = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.authService
      .register(this.registerForm.value)
      .pipe(
        take(1),
        finalize(() => (this.isSubmited = false))
      )
      .subscribe({
        next: (res) => {
          console.log('RegisterForm', this.registerForm.value);
        },
        error: (err) => {
          console.log('Error', err);
        },
      });
  }
}
