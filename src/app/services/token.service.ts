import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CernerConfig } from '../config/cerner.config';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  
  constructor(private http: HttpClient) {}

  exchangeCodeForToken(code: string, state: string): Observable<any> {
    const tokenUrl = 'https://authorization.cerner.com/tenants/ec2458f2-1e24-41c8-b71b-0e701af7583d/protocols/oauth2/profiles/smart-v1/token';
    const codeVerifier = sessionStorage.getItem('code_verifier');
    
    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: CernerConfig.redirectUri,
      client_id: CernerConfig.clientId,
      code_verifier: codeVerifier || ''
    });

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    });

    return this.http.post(tokenUrl, body.toString(), { headers });
  }

  // For testing - get patient context from token response
  getPatientContext(): string | null {
    return sessionStorage.getItem('patient_id');
  }

  setPatientContext(patientId: string): void {
    sessionStorage.setItem('patient_id', patientId);
  }
}