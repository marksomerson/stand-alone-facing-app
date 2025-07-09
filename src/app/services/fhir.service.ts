import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CernerConfig } from '../config/cerner.config';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class FhirService {
  private accessToken: string | null = null;

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  setAccessToken(token: string): void {
    this.accessToken = token;
  }

  getPatientData(): Observable<any> {
    const patientId = this.tokenService.getPatientContext();
    
    if (patientId) {
      // Try with a specific patient ID first
      const headers = new HttpHeaders({
        'Accept': 'application/fhir+json'
      });
      
      // If we have an access token, include it
      if (this.accessToken && this.accessToken !== 'mock-token-for-demo') {
        headers.set('Authorization', `Bearer ${this.accessToken}`);
      }
      
      return this.http.get(`${CernerConfig.fhirBaseUrl}/Patient/${patientId}`, { headers });
    } else {
      // Fallback to a known test patient ID from Cerner's sandbox
      const testPatientId = '12724066';
      const headers = new HttpHeaders({
        'Accept': 'application/fhir+json'
      });
      
      return this.http.get(`${CernerConfig.fhirBaseUrl}/Patient/${testPatientId}`, { headers });
    }
  }

  getPatientById(patientId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.accessToken}`,
      'Accept': 'application/fhir+json'
    });

    return this.http.get(`${CernerConfig.fhirBaseUrl}/Patient/${patientId}`, { headers });
  }
}