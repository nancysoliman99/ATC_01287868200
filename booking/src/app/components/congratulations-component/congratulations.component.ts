import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"
import { NavComponent } from "../NavComponent/nav.component"
import { footerComponent } from "../footer/footer.component"

@Component({
  selector: "app-congratulations",
  standalone: true,
  imports: [CommonModule, RouterModule, NavComponent, footerComponent],
  templateUrl: "./congratulations.component.html",
  styleUrls: ["./congraturlations.component.scss"],
})
export class CongratulationsComponent {}
