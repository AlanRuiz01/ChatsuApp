import { Component, inject } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage{
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
  public onSubmit() {
    const rawForm = this.form.getRawValue();
    this.authService.register(rawForm.email, rawForm.username, rawForm.password)
      .subscribe((result) => {
        if (result.error) {
          this.errorMessage = this.translateError(result.error.message);
        } else {
          this.router.navigateByUrl('/cuenta-creada');
        }
      });
  }

  private translateError(errorMessage: string): string {
    switch (errorMessage) {
      case 'User already registered':
        return 'Usuario ya registrado';
      default:
        return 'Datos incorrectos, Por favor verifique los campos';
    }
  }
}
