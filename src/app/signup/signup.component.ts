import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  fistName: string|null = null
  lastName: string|null = null
  email: string|null = null
  phone: string|null = null
  password: string|null = null
  rePassword: string|null = null

  constructor(){}
}
