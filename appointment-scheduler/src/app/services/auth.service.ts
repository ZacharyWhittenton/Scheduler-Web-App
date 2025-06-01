import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';




@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private mockUsers: User[] = [
    { id: '1', username: 'admin', role: 'admin' },
    { id: '2', username: 'client1', role: 'client' }
  ];

  private currentUserSubject = new BehaviorSubject<User | null>(null);

  login(username: string): boolean {
    const user = this.mockUsers.find(u => u.username === username);
    if (user) {
      this.currentUserSubject.next(user);
      localStorage.setItem('user', JSON.stringify(user));
      return true;
    }
    return false;
  }

  logout() {
    this.currentUserSubject.next(null);
    localStorage.removeItem('user');
  }

  getCurrentUser(): Observable<User | null> {
    return this.currentUserSubject.asObservable();
  }

  getCurrentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  isAdmin(): boolean {
    return this.currentUserSubject.value?.role === 'admin';
  }

  isClient(): boolean {
    return this.currentUserSubject.value?.role === 'client';
  }

  constructor() {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
    }
  }
}
