import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserModel } from '../models/user.model';
import { UserService } from '../services/user.service';
import { LoginModel } from '../models/login.model';

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
      .then(response => {
        const loginModel: LoginModel = {
          username: userModel.username,
          password: userModel.password
        }
        UserService.login(loginModel)
          .then(success => {
            if(success){
              alert("Registration successful")
              this.router.navigate(['/home'])
            }else{
              alert("Failed")
            }
          })
      })


  }


}
