import { Component, inject } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage {
  fb= inject(FormBuilder);
  authService = inject(AuthService)
  router = inject(Router);
  constructor() { }

  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  errorMessage: string | null = null;
  onSubmit(): void {
    const rawForm = this.form.getRawValue();
    this.authService
      .login(rawForm.email, rawForm.password)
      .subscribe((result) => {
        if (result.error) {
          this.errorMessage = result.error.message;
        } else {
          this.router.navigateByUrl('/chat');
        }
      });
  }
}
