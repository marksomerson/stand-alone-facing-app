import { Injectable } from '@angular/core';
import { CernerConfig } from '../config/cerner.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  async initiateAuth(): Promise<void> {
    const codeVerifier = this.generateCodeVerifier();
    const codeChallenge = await this.generateCodeChallenge(codeVerifier);
    
    // Store code verifier for token exchange
    sessionStorage.setItem('code_verifier', codeVerifier);
    
    const authUrl = `https://authorization.cerner.com/tenants/ec2458f2-1e24-41c8-b71b-0e701af7583d/protocols/oauth2/profiles/smart-v1/personas/patient/authorize?` +
      `response_type=code&` +
      `client_id=${CernerConfig.clientId}&` +
      `redirect_uri=${encodeURIComponent(CernerConfig.redirectUri)}&` +
      `scope=${encodeURIComponent(CernerConfig.scope)}&` +
      `aud=${encodeURIComponent(CernerConfig.fhirBaseUrl)}&` +
      `code_challenge=${codeChallenge}&` +
      `code_challenge_method=S256&` +
      `state=${this.generateState()}`;
    
    window.location.href = authUrl;
  }

  private generateState(): string {
    return Math.random().toString(36).substring(2, 15);
  }

  private generateCodeVerifier(): string {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return btoa(String.fromCharCode.apply(null, Array.from(array)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  }

  private async generateCodeChallenge(verifier: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(verifier);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, Array.from(new Uint8Array(hash))))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  }
}