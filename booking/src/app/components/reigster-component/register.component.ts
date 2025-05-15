import { Component } from "@angular/core"
import  { AuthService } from "../../services/auth.service"
import {  Router, RouterLink } from "@angular/router"
import { FormsModule } from "@angular/forms"
import { CommonModule } from "@angular/common"
import { NavComponent } from "../NavComponent/nav.component"
import { footerComponent } from "../footer/footer.component";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NavComponent, footerComponent],
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent {
  username = ""
  email = ""
  password = ""
  role = "User" // Default User, can be changed to Admin
  errorMessage = ""

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  register(): void {
    this.authService.register(this.username, this.email, this.password, this.role).subscribe({
      next: () => {
        this.router.navigate(["/login"]) // Redirect to Login page after registration
      },
      error: (err) => {
        this.errorMessage = "Registration failed. Try again."
        console.error("Registration error", err)
      },
    })
  }
}
