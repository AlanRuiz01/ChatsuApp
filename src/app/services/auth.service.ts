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

// Servicio para el login de supabase

  login(email: string, password: string): Observable<AuthResponse> {
    const promise = this.supabase.auth.signInWithPassword({
      email,
      password,
    });
    return from(promise);
  }

// Servicio para el logOut de supabase

  logout(): void {
    this.supabase.auth.signOut();
  }

// Servicio para recuperar el usuario actual cuando envia un mensaje
async getCurrentUser() {
  const { data, error } = await this.supabase.auth.getUser();
  if (error) {
    console.error('Error fetching user:', error);
    return null;
  }

  const user = data.user;
  if (user && user.user_metadata) {
    return {
      id: user.id,
      email: user.email,
      username: user.user_metadata['username'] // Usa user_metadata en lugar de raw_user_meta_data
    };
  }
  return null;
}

// Servicio para Obtener la tabla gruops
  async getGroups() {
    return this.supabase.from('groups').select('*');
  }

  // Servicio para guardar los mensajes
  async saveMessage(message: string, userId: string, groupId: number) {
    const { data, error } = await this.supabase
      .from('messages')
      .insert([
        { message, user_id: userId, group_id: groupId }
      ]);
    if (error) {
      console.error('Error saving message:', error);
      return null;
    }
    return data;
  }

//Servicio para obtener los grupos por id
async getGroupById(groupId: number) {
  const { data, error } = await this.supabase
    .from('groups')
    .select('*')
    .eq('id', groupId)
    .single();
  if (error) {
    console.error('Error fetching group:', error);
    return null;
  }
  return data;
}
}
