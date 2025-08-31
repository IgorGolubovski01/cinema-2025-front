import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { BuyTicketComponent } from './buy-ticket/buy-ticket.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';


export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'buy-ticket/:id', component: BuyTicketComponent },
    { path: 'edit-profile', component: EditProfileComponent },

    
    { path: '**', redirectTo: '' }
];
