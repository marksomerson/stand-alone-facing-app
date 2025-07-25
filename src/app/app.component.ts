import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'standalone-patient-facing-app';

  constructor(private authService: AuthService) {}

  login(): void {
    this.authService.initiateAuth();
  }
}
