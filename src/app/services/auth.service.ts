import { Injectable } from '@angular/core';
import { CernerConfig } from '../config/cerner.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  initiateAuth(): void {
    const authUrl = `https://authorization.cerner.com/tenants/ec2458f2-1e24-41c8-b71b-0e701af7583d/protocols/oauth2/profiles/smart-v1/personas/patient/authorize?` +
      `response_type=code&` +
      `client_id=${CernerConfig.clientId}&` +
      `redirect_uri=${encodeURIComponent(CernerConfig.redirectUri)}&` +
      `scope=${encodeURIComponent(CernerConfig.scope)}&` +
      `state=${this.generateState()}`;
    
    window.location.href = authUrl;
  }

  private generateState(): string {
    return Math.random().toString(36).substring(2, 15);
  }
}