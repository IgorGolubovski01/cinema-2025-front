import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginModel } from '../models/login.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private router: Router) { }

  username: string = ''
  password: string = ''


  async doLogin() {
    
    const loginModel: LoginModel = {
      username: this.username,
      password: this.password
    }
    if(await UserService.login(loginModel) == true){
      alert('logged in')   
      this.router.navigate(['/home'])

    }
    
    if(await UserService.login(loginModel) == false)
      alert('failed')

    
  }

}
