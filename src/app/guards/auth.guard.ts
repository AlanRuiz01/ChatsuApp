import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree> {

    const userProfile = await this.authService.getCurrentUser();
    if (userProfile && userProfile.username !== 'Unknown User') {
      // Usuario autenticado, permite el acceso
      return true;
    } else {
      // Usuario no autenticado, redirige al inicio
      return this.router.createUrlTree(['/inicio']);
    }
  }
}