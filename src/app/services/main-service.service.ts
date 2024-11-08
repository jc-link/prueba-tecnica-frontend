import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthResponse } from '../interfaces/auth-response.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MainServiceService {

  private apiURL = environment.apiURL

  constructor(private http: HttpClient) { }

  registerUser(user: any): Observable<AuthResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<AuthResponse>(`${this.apiURL}/auth/register`, user, { headers })
  }

  loginUser(user: any): Observable<AuthResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<AuthResponse>(`${this.apiURL}/auth/authenticate`, user, { headers })
  }

  logoutUser() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
    })
    this.http.get(`${this.apiURL}/auth/logout`, { headers }).subscribe(
      () => {
        console.log('User logged out')
      },
      (err) => {
        console.log(err)
      }
    )
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
  }

  refreshToken() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('refreshToken')
    })
    return this.http.post(`${this.apiURL}/auth/refresh`, { headers })
  }

  uploadFile(formData: FormData): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
    })

    return this.http.post(`${this.apiURL}/clients/upload`, formData, { headers })
  }

  fetchData() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
    })
    return this.http.get(`${this.apiURL}/clients`, { headers })
  }
}
