import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FhirService } from '../services/fhir.service';
import { TokenService } from '../services/token.service';

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fhirService: FhirService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const code = params['code'];
      const state = params['state'];

      if (code) {
        console.log('Authorization code received:', code);
        console.log('All params:', params);

        // Extract patient ID if available in the callback
        const patientId = params['patient'];
        localStorage.setItem('authCode', code);
        localStorage.setItem('patientId', patientId || '');
        if (patientId) {
          console.log('Patient ID from callback:', patientId);
          this.tokenService.setPatientContext(patientId);
        }

        // For demo purposes, we'll use a mock token since browser-based token exchange
        // typically fails due to CORS. In production, this should be handled by a backend.
        const mockToken = 'mock-token-for-demo';
        this.fhirService.setAccessToken(mockToken);

        this.router.navigate(['/home']);
      }
    });
  }
}
