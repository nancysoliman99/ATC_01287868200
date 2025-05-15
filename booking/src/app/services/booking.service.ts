import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = 'https://localhost:7207/api/Booking';

  constructor(private http: HttpClient, private authService: AuthService) {}

  // حجز فعالية
  bookEvent(eventId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(this.apiUrl, { eventId }, { headers });
  }

  // جلب كل الحجوزات بتاعة المستخدم
  getUserBookings(): Observable<number[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<any[]>(this.apiUrl, { headers }).pipe(
      map(bookings => bookings.map(booking => booking.eventId))
    );
  }

  // التحقق من حالة الحجز
  isBooked(eventId: number): Observable<boolean> {
    return this.getUserBookings().pipe(
      map(bookedEventIds => bookedEventIds.includes(eventId))
    );
  }

  // إعداد رأس التوثيق
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token || ''}`);
  }
}
