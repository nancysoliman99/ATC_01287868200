import { Component } from "@angular/core"
import {  Router, RouterLink } from "@angular/router"
import { FormsModule } from "@angular/forms"
import { CommonModule } from "@angular/common"
import  { AuthService } from "../../services/auth.service"
import { NavComponent } from "../NavComponent/nav.component"
import { footerComponent } from "../footer/footer.component";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NavComponent, footerComponent],
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  username = ""
  password = ""
  errorMessage = ""

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  login(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        this.router.navigate(["/events"]) // Redirect after login
      },
      error: (err) => {
        this.errorMessage = "Invalid username or password"
        console.error("Login error", err)
      },
    })
  }
}
/*import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    if (this.username === 'adminuser' && this.password === 'Admin@1234') {
      this.authService.setToken('dummy-token');
      this.authService.setUser(this.username, 'Admin');
      this.router.navigate(['/']);
    } else if (this.username === 'user' && this.password === 'User@1234') {
      this.authService.setToken('dummy-token');
      this.authService.setUser(this.username, 'User');
      this.router.navigate(['/']);
    } else {
      this.errorMessage = 'Invalid credentials';
    }
  }
}*/
