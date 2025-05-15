// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Event } from '../models/event.model';
// import { AuthService } from './auth.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class EventService {
//   private apiUrl = 'https://localhost:7207/api/Events';

//   constructor(private http: HttpClient, private authService: AuthService) {}

//   getEvents(): Observable<Event[]> {
//     const headers = this.getAuthHeaders();
//     return this.http.get<Event[]>(this.apiUrl, { headers });
//   }

//   addEvent(event: Event, imageFile?: File): Observable<Event> {
//     const headers = this.getAuthHeaders();
//     const formData = new FormData();
//     formData.append('name', event.name || '');
//     formData.append('description', event.description || '');
//     formData.append('category', event.category || '');
//     formData.append('date', event.date || '');
//     formData.append('venue', event.venue || '');
//     formData.append('price', event.price?.toString() || '0');
//     if (imageFile) {
//       formData.append('image', imageFile);
//     }

//     return this.http.post<Event>(this.apiUrl, formData, { headers });
//   }
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../models/event.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'https://localhost:7207/api/Events';
  private bookingUrl = 'https://localhost:7207/api/Booking';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getEvents(): Observable<Event[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Event[]>(this.apiUrl, { headers });
  }

  addEvent(event: Event, imageFile?: File): Observable<Event> {
    const headers = this.getAuthHeaders();
    const formData = new FormData();
    formData.append('name', event.name || '');
    formData.append('description', event.description || '');
    formData.append('category', event.category || '');
    formData.append('date', event.date || '');
    formData.append('venue', event.venue || '');
    formData.append('price', event.price?.toString() || '0');
    if (imageFile) {
      formData.append('image', imageFile);
    }
    return this.http.post<Event>(this.apiUrl, formData, { headers });
  }

  getEventById(id: number): Observable<Event> {
    const headers = this.getAuthHeaders();
    return this.http.get<Event>(`${this.apiUrl}/${id}`, { headers });
  }

  updateEvent(id: number, event: Event, imageFile?: File): Observable<any> {
    const headers = this.getAuthHeaders();
    const formData = new FormData();
    formData.append('id', id.toString());
    formData.append('name', event.name || '');
    formData.append('description', event.description || '');
    formData.append('category', event.category || '');
    formData.append('date', event.date || '');
    formData.append('venue', event.venue || '');
    formData.append('price', event.price?.toString() || '0');
    if (imageFile) {
      formData.append('image', imageFile);
    }
    return this.http.put(`${this.apiUrl}/${id}`, formData, { headers });
  }

  deleteEvent(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }



  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token || ''}`);
  }
  // Check if the user is logged in by verifying the presence of a token
  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token; // Returns true if token exists, false otherwise
  }

  // Get the token from localStorage (or other storage)
  getToken(): string | null {
    return localStorage.getItem('authToken'); // Adjust key based on your implementation
  }

  // Example: Method to set token after login (if needed)
  setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  // Example: Method to clear token on logout
  logout(): void {
    localStorage.removeItem('authToken');
  }


  // Existing isAdmin method (assuming it exists based on your template)
  isAdmin(): boolean {
    // Implement logic to check if the user is an admin, e.g., decode token or check role
    const token = this.getToken();
    if (token) {
      // Example: Decode JWT to check for admin role
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role === 'admin'; // Adjust based on your token structure
    }
    return false;

}
getUserBookings(): Observable<{ eventId: number }[]> {
  const headers = this.getAuthHeaders();
  return this.http.get<{ eventId: number }[]>(this.bookingUrl, { headers });
}
}
