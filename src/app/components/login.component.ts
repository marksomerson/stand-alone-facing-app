import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  template: `
    <div class="container">
      <h1>Patient Portal</h1>
      <p>Connect to your health records through Cerner</p>
      <button (click)="login()" class="login-btn">Login with Cerner</button>
    </div>
  `,
  styles: [`
    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      text-align: center;
    }
    
    h1 {
      color: #2c3e50;
      margin-bottom: 10px;
    }
    
    p {
      color: #6c757d;
      margin-bottom: 30px;
    }
    
    .login-btn {
      background: #007bff;
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
    }
    
    .login-btn:hover {
      background: #0056b3;
    }
  `]
})
export class LoginComponent {
  constructor(private authService: AuthService) {}

  login(): void {
    this.authService.initiateAuth();
  }
}