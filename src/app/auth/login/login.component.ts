import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent{
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string = "";
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService
  ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService
      .login(this.f["email"].value, this.f["password"].value)
      .pipe(first())
      .subscribe(
        {
          next: (data) => {
            // Handle the next emitted value
            this.router.navigate([this.returnUrl]);
          },
          error: (error) => {
            // Handle any error that occurs
            this.error = error;
            this.loading = false;
          },
          complete: () => {
            // Handle the completion of the observable
          }
        }
      );
  }
}
