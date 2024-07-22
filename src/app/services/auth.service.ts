import { Injectable } from '@angular/core';
import { AuthResponse, createClient } from '@supabase/supabase-js';
import { from, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  supabase = createClient( environment.supabaseUrl,environment.supabaseKey);
  constructor() { }
  register(email : string, username: string, password:string): Observable<AuthResponse> {
    const promise = this.supabase.auth.signUp({
      email,
      password,
      options:{
        data:{
          username,
        },
      },
  });
  return from(promise);
  }


  login(email: string, password: string): Observable<AuthResponse> {
    const promise = this.supabase.auth.signInWithPassword({
      email,
      password,
    });
    return from(promise);
  }

  logout(): void {
    this.supabase.auth.signOut();
  }

  async getCurrentUser() {
    const { data: { user } } = await this.supabase.auth.getUser();
    if (user) {
      // Accede a `username` desde `user_metadata` usando notación de corchetes
      const username = user.user_metadata?.['username'] || 'Unknown User';
      return { username };
    }
    return { username: 'Unknown User' }; // Valor predeterminado si el usuario no está autenticado
  }
}
