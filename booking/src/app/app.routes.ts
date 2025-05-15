import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { EventUpdateComponent } from './components/event-update-component/event-update.component';
import { EventCreateComponent } from './components/event-create-componant/event-create.component';
import { RegisterComponent } from './components/reigster-component/register.component';
import { CongratulationsComponent } from './components/congratulations-component/congratulations.component';

import { EventDetailsComponent } from './components/event-details-component/event-details.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { EventsComponent } from './components/event-list.component/event-list.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'events', component: EventsComponent, canActivate: [AuthGuard] },
  { path: 'event-create', component: EventCreateComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'event-update/:id', component: EventUpdateComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'event-details/:id', component: EventDetailsComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/events', pathMatch: 'full' },



   { path: 'register', component: RegisterComponent },
  { path: 'congratulations', component: CongratulationsComponent },
   { path: '**', redirectTo: '/events' },


];
/*

  ,
  { path: 'event-details/:id', component: EventDetailsComponent, canActivate: [AuthGuard] },
 */
