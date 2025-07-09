import { Component } from '@angular/core';
import { FhirService } from '../services/fhir.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  template: `
    <div class="home-container">
      <header>
        <!-- <h1>SMART on FHIR Patient App</h1> -->
        <p>Welcome! You are successfully authenticated.</p>
      </header>

      <main>
        <div class="card">
          <h2>Patient Dashboard</h2>
          <p>Access your health information securely through this FHIR-enabled application.</p>
        </div>

        <div class="actions">
          <button class="btn-primary" (click)="loadPatientData()">View Patient Info</button>
          <button class="btn-secondary">View Observations</button>
          <button class="btn-secondary">View Conditions</button>
        </div>

        <div *ngIf="loading" class="loading">
          Loading patient data...
        </div>

        <div *ngIf="patientData" class="patient-info">
          <h3>Patient Information</h3>
          <div class="info-grid">
            <div><strong>Name:</strong> {{getPatientName()}}</div>
            <div><strong>Gender:</strong> {{patientData.gender}}</div>
            <div><strong>Birth Date:</strong> {{patientData.birthDate}}</div>
            <div><strong>ID:</strong> {{patientData.id}}</div>
          </div>
        </div>

        <div *ngIf="error" class="error">
          {{error}}
        </div>
      </main>
    </div>
  `,
  styles: [`
    .home-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }

    header {
      text-align: center;
      margin-bottom: 30px;
    }

    h1 {
      color: #2c3e50;
      margin-bottom: 10px;
    }

    .card {
      background: #f8f9fa;
      border: 1px solid #dee2e6;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 20px;
    }

    .actions {
      display: flex;
      gap: 10px;
      justify-content: center;
      flex-wrap: wrap;
    }

    .btn-primary, .btn-secondary {
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
    }

    .btn-primary {
      background: #007bff;
      color: white;
    }

    .btn-secondary {
      background: #6c757d;
      color: white;
    }

    .btn-primary:hover, .btn-secondary:hover {
      opacity: 0.9;
    }

    .loading {
      text-align: center;
      padding: 20px;
      color: #6c757d;
    }

    .patient-info {
      background: #e8f5e8;
      border: 1px solid #c3e6c3;
      border-radius: 8px;
      padding: 20px;
      margin-top: 20px;
    }

    .info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-top: 15px;
    }

    .error {
      background: #f8d7da;
      border: 1px solid #f5c6cb;
      color: #721c24;
      padding: 15px;
      border-radius: 4px;
      margin-top: 20px;
    }
  `]
})
export class HomeComponent {
  patientData: any = null;
  loading = false;
  error: string | null = null;

  constructor(private fhirService: FhirService) {}

  loadPatientData(): void {
    this.loading = true;
    this.error = null;

    console.log('Loading patient data...');

    this.fhirService.getPatientData().subscribe({
      next: (data) => {
        this.loading = false;
        console.log('Patient data received:', data);

        if (data.resourceType === 'Patient') {
          // Single patient response
          this.patientData = data;
        } else if (data.entry && data.entry.length > 0) {
          // Bundle response
          this.patientData = data.entry[0].resource;
        } else {
          this.error = 'No patient data found';
        }
      },
      error: (err) => {
        this.loading = false;
        console.error('FHIR API Error:', err);
        this.error = `Failed to load patient data: ${err.status} ${err.statusText || err.message}`;
      }
    });
  }

  getPatientName(): string {
    if (!this.patientData?.name || this.patientData.name.length === 0) {
      return 'N/A';
    }
    const name = this.patientData.name[0];
    return `${name.given?.join(' ') || ''} ${name.family || ''}`.trim();
  }
}
