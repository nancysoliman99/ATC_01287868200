import { Component, OnInit } from '@angular/core';
import {  RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { EventService } from '../../services/event.service';
import { AuthService } from '../../services/auth.service';
import { Event } from '../../models/event.model';
import { NavComponent } from '../NavComponent/nav.component';
import { footerComponent } from '../footer/footer.component';
import { routes } from '../../app.routes';


@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, RouterLink, NavComponent, footerComponent],
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventsComponent implements OnInit {
  events: Event[] = [];
  bookedEvents: Map<number, boolean> = new Map();
  loading = true;

  constructor(
    public authService: AuthService,
    private eventService: EventService  ) {}


  ngOnInit(): void {
    this.loadEvents();
  }

  private formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;

    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  } catch {
    return dateString;
  }
}

loadEvents(): void {
    this.loading = true;
    this.eventService.getEvents().pipe(
      switchMap(events => {
        this.events = events.map(event => ({
          ...event,
          date: this.formatDate(event.date)
        }));

        if (this.authService.isLoggedIn()) {
          return this.eventService.getUserBookings().pipe(
            map(bookings => {
              bookings.forEach(booking => {
                this.bookedEvents.set(booking.eventId, true);
              });
              return events;
            }),
            catchError(() => of(events))
          );
        } else {
          return of(events);
        }
      })
    ).subscribe({
      next: () => this.loading = false,
      error: (err) => {
        console.error('Error loading events', err);
        this.loading = false;
      }
    });
  }


  isBooked(eventId: number | undefined): boolean {
    return !!eventId && this.bookedEvents.has(eventId);
  }

  deleteEvent(id: number | undefined): void {
    if (!id) return;

    if (confirm('هل أنت متأكد من حذف هذا الحدث؟')) {
      this.eventService.deleteEvent(id).subscribe({
        next: () => {
          this.events = this.events.filter(event => event.id !== id);
          this.bookedEvents.delete(id);
        },
        error: (err) => console.error('خطأ في حذف الحدث', err)
      });
    }
  }
}

function of<T>(value: T): Observable<T> {
  return new Observable(observer => {
    observer.next(value);
    observer.complete();
  });
}
