const isGitHubPages = window.location.hostname.includes('github.io');
const baseUrl = isGitHubPages 
  ? `https://${window.location.hostname}${window.location.pathname}`
  : 'http://localhost:4200/';

export const CernerConfig = {
  applicationId: '6d520da4-5f38-46fd-a4db-181ea8173e20',
  clientId: 'df64587d-f810-4b76-bb92-0e85966ee287',
  applicationType: 'patient',
  fhirBaseUrl: 'https://fhir-ehr-code.cerner.com/r4/ec2458f2-1e24-41c8-b71b-0e701af7583d',
  redirectUri: baseUrl,
  scope: 'patient/Patient.read patient/Observation.read patient/Condition.read launch/patient online_access openid profile'
};