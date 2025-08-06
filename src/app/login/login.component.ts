import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LoginModel } from '../models/login.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor() { }

  username: string = ''
  password: string = ''


  async doLogin() {

    console.log(this.username);
    console.log(this.password);
    
    const loginModel: LoginModel = {
      username: this.username,
      password: this.password
    }
    if(await UserService.login(loginModel) == true)
      alert('logged in')    
    
    if(await UserService.login(loginModel) == false)
      alert('failed')

    
  }

}
