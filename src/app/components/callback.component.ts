import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-callback',
  template: `
    <div class="callback-container">
      <h2>Processing authentication...</h2>
      <p>Please wait while we complete your login.</p>
    </div>
  `,
  styles: [`
    .callback-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
    }
  `]
})
export class CallbackComponent implements OnInit {
  
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const code = params['code'];
      const state = params['state'];
      
      if (code) {
        console.log('Authorization code received:', code);
        // Handle token exchange here
      }
    });
  }
}