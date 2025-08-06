import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  private userService = UserService

  constructor(private router: Router){
    if(!this.userService.checkActive()){
      router.navigate(['/login'])
    }
  }
}
