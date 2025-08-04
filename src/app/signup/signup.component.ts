import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserModel } from '../models/user.model';

@Component({
  selector: 'app-signup',
  imports: [RouterLink, FormsModule ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  fistName: string = ''
  lastName: string = ''
  email: string = ''
  phone: string = ''
  password: string = ''
  rePassword: string = ''

  constructor(){}
}
