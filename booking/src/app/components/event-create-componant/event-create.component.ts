import { Component } from "@angular/core"
import  { Event } from "../../models/event.model"
import {  Router, RouterLink } from "@angular/router"
import { FormsModule } from "@angular/forms"
import { CommonModule } from "@angular/common"
import  { EventService } from "../../services/event.service"
import { NavComponent } from "../NavComponent/nav.component"
import { footerComponent } from "../footer/footer.component"

@Component({
  selector: "app-event-create",
  standalone: true,
  imports: [CommonModule, FormsModule, NavComponent, footerComponent, RouterLink],
  templateUrl: "./event-create.component.html",
  styleUrls: ["./event-create.component.scss"],
})
export class EventCreateComponent {
  event: Event = {
    name: "",
    description: "",
    category: "",
    date: "",
    venue: "",
    price: 0,
    image: "",
  }
  imageFile: File | null = null

  constructor(
    private eventService: EventService,
    private router: Router,
  ) {}

  onFileChange(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.imageFile = event.target.files[0]
    }
  }

  createEvent(): void {
    this.eventService.addEvent(this.event, this.imageFile!).subscribe({
      next: () => {
        this.router.navigate(["/events"])
      },
      error: (err) => console.error("Error creating event", err),
    })
  }
}
