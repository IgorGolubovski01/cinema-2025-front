import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserModel } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signup',
  imports: [ FormsModule ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  fistName: string = ''
  lastName: string = ''

  email: string = ''
  phone: string = ''
  address: string = ''

  username: string = ''
  password: string = ''
  rePassword: string = ''


  constructor(){
    
  }


  doSignup(){
    if(this.password != this.rePassword){
      alert('Passwords do not match.')
    }

    
  }
}
