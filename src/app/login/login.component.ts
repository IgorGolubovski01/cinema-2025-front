import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LoginModel } from '../models/login.model';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(routerLink: RouterLink) { }

  username: string = ''
  password: string = ''


  doLogin() {

    const loginModel: LoginModel = {
      username: this.username,
      password: this.password
    }

    
  }

}
