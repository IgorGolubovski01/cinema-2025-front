import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserModel } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signup',
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  constructor(private router: Router) { }

  firstName: string = ''
  lastName: string = ''
  email: string = ''
  phone: string = ''
  address: string = ''
  username: string = ''
  password: string = ''
  rePassword: string = ''


  doSignup() {
    if (this.password !== this.rePassword) {
      alert('Passwords do not match.');
      return;
    }
    const userModel: UserModel = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phone: this.phone,
      address: this.address,
      username: this.username,
      password: this.password,
    };
    UserService.signUp(userModel)
  }

  
}
