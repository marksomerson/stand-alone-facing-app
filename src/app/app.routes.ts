import { Routes } from '@angular/router';
import { CallbackComponent } from './components/callback.component';
import { HomeComponent } from './components/home.component';
import { LoginComponent } from './components/login.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'callback', component: CallbackComponent },
  { path: 'home', component: HomeComponent }
];
