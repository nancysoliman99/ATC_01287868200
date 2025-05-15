import { Component,  OnInit } from "@angular/core"
import  { EventService } from "../../services/event.service"
import  { Event } from "../../models/event.model"
import {  ActivatedRoute, Router, RouterLink } from "@angular/router"
import { FormsModule } from "@angular/forms"
import { CommonModule } from "@angular/common"
import { NavComponent } from "../NavComponent/nav.component"
import { footerComponent } from "../footer/footer.component"

@Component({
  selector: "app-event-update",
  standalone: true,
  imports: [CommonModule, FormsModule, NavComponent, footerComponent, RouterLink],
  templateUrl: "./event-update.component.html",
  styleUrls: ["./event-update.component.scss"],
})
export class EventUpdateComponent implements OnInit {
  event: Event = {
    id: 0,
    name: "",
    description: "",
    category: "",
    date: "",
    venue: "",
    price: 0,
    image: "",
  }
  eventId: number
  imageFile: File | null = null
  errorMessage = ""

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.eventId = +this.route.snapshot.paramMap.get("id")!
    this.event.id = this.eventId
  }

  ngOnInit(): void {
    this.loadEvent()
  }

  loadEvent(): void {
    this.eventService.getEventById(this.eventId).subscribe({
      next: (data) => {
        this.event = data
        this.event.id = this.eventId
      },
      error: (err) => {
        this.errorMessage = "Error loading event"
        console.error("Error loading event", err)
      },
    })
  }

  onFileChange(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.imageFile = event.target.files[0]
    }
  }

  updateEvent(): void {
    if (!this.event.name || !this.event.date) {
      this.errorMessage = "Name and Date are required"
      return
    }

    this.eventService.updateEvent(this.eventId, this.event, this.imageFile ?? undefined).subscribe({
      next: () => {
        this.router.navigate(["/events"])
      },
      error: (err) => {
        this.errorMessage = err.error?.title || "Error updating event"
        console.error("Error updating event", err)
      },
    })
  }
}
