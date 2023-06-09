import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  valCheck: string[] = ['remember'];
  loginForm: FormGroup | null;
  loading = false;
  submitted = false;
  returnUrl: string | null;
  error: string | null;
  message: string | null;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService,
    public layoutService: LayoutService
  ) {
    if (this.authenticationService.isAuthenticated()) {
      this.router.navigate(['/']);
    }
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  /**
   * Get the form controls for convenient access in the template.
   */
  get f() {
    return this.loginForm.controls;
  }

  /**
   * Handle form submission.
   */
  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService
      .login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe({
        next: (data) => {
          this.router.navigate([this.returnUrl]);
        },
        error: (error) => {
          this.error = error;
          this.loading = false;
        },
        complete: () => {
          this.submitted = false;
          this.loading = false;
        },
      });
  }
}
