import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { UserModel } from '../models/user.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-edit-profile',
  imports: [FormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {


  userId: number = -1

  firstName = ''
  lastName = ''
  username = ''
  email = ''
  phone = ''
  address = ''

  password = ''
  repassword = ''



  constructor(private router: Router) {
    const active = localStorage.getItem("active")
    if(!active){
      this.router.navigate(['/login']);
      return;
    }

    if (active) {
      const user = JSON.parse(active);
      this.userId = user.id;
      console.log("User ID:", this.userId);
    }

    UserService.getUserById(this.userId)
      .then(rsp => {
        this.firstName = rsp.data.firstName
        this.lastName = rsp.data.lastName
        this.username = rsp.data.username
        this.email = rsp.data.email
        this.phone = rsp.data.phone
        this.address = rsp.data.address
      })

  }

  doUpdateProfile() {

    if (this.password !== this.repassword) {
      alert("Passwords do not match.")
    } else {

      const userModel: UserModel = {
        firstName: this.firstName,
        lastName: this.lastName,
        username: this.username,
        email: this.email,
        phone: this.phone,
        address: this.address,
        password: this.password
      }
      UserService.editProfile(userModel)
      alert("Profile info updated.")
    }


  }

}



