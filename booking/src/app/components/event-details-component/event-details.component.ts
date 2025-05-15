import { Component,  OnInit } from "@angular/core"
import  { EventService } from "../../services/event.service"
import  { Event } from "../../models/event.model"
import {  ActivatedRoute, Router, RouterLink } from "@angular/router"
import  { BookingService } from "../../services/booking.service"
import { CommonModule } from "@angular/common"
import  { Observable } from "rxjs"
import { NavComponent } from "../NavComponent/nav.component"
import { footerComponent } from "../footer/footer.component"

@Component({
  selector: "app-event-details",
  standalone: true,
  imports: [CommonModule, NavComponent, footerComponent, RouterLink],
  templateUrl: "./event-details.component.html",
  styleUrls: ["./evenet-details.component.scss"],
})
export class EventDetailsComponent implements OnInit {
  event: Event | null = null
  eventId: number
  isBooked$!: Observable<boolean>

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router,
    private bookingService: BookingService,
  ) {
    this.eventId = +this.route.snapshot.paramMap.get("id")!
  }

  ngOnInit(): void {
    this.loadEvent()
    this.isBooked$ = this.bookingService.isBooked(this.eventId)
  }

  loadEvent(): void {
    this.eventService.getEventById(this.eventId).subscribe({
      next: (data) => (this.event = data),
      error: (err) => console.error("Error loading event", err),
    })
  }

  bookEvent(): void {
    this.bookingService.bookEvent(this.eventId).subscribe({
      next: () => {
        this.router.navigate(["/congratulations"])
      },
      error: (err) => console.error("Error booking event", err),
    })
  }
}
