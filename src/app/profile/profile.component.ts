import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ProfileOrders } from '../models/profileOrders.model';
import { OrderService } from '../services/order.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  imports: [MatTableModule, MatInputModule, MatSelectModule, FormsModule, NgIf, RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  name = '';
  displayedColumns: string[] = [
    'title',
    'filmDateTime',
    'quantity',
    'totalPrice',
    'status',
    'action',
  ];
  dataSource = new MatTableDataSource<ProfileOrders>([])
  userService = UserService;

  filterValue = ''
  statusFilter = ''

  constructor(private router: Router) {
    if (!this.userService.checkActive()) {
      router.navigate(['/login']);
    }

    const activeUserString = localStorage.getItem('active')
    if (activeUserString) {
      const activeUser = JSON.parse(activeUserString)
      this.name = activeUser.username
      this.loadOrders(activeUser.id)
    }

    this.dataSource.filterPredicate = (data: ProfileOrders, filter: string) => {
      const searchTerms = JSON.parse(filter)
      const matchesTitle = data.title
        .toLowerCase()
        .includes(searchTerms.title)  
      const matchesStatus = searchTerms.status
        ? data.status.statusName === searchTerms.status
        : true
      return matchesTitle && matchesStatus
    };
  }

  async loadOrders(userId: number) {
    try {
      const response = await OrderService.getAllUserOrders(userId)
      this.dataSource.data = response.data
      console.log(this.dataSource.data)
    } catch (error) {
      console.error('Error fetching orders', error)
    }
  }

  applyFilter() {
    this.dataSource.filter = JSON.stringify({
      title: this.filterValue.trim().toLowerCase(),
      status: this.statusFilter,
    });
  }

  formatStatus(status: string): string {
    switch (status) {
      case 'IN_CART': return 'In Cart'
      case 'PURCHASED': return 'Purchased'
      case 'WATCHED': return 'Watched'
      case 'CANCELLED': return 'Cancelled'
      default: return status
    }
  }

  doPurchase(orderId: number) {

    OrderService.purchase(orderId)
      .then(() => {
        alert("Successfully purchased.");
        window.location.reload()
      })
      .catch((err) => {
        console.error(err);
        alert(err.response.data);
      });
  }

  doCancel(orderId: number) {
    OrderService.cancel(orderId)
      .then(() => {
        alert("Successfully cancelled.");
        window.location.reload()
      })
      .catch((err) => {
        console.error(err);
        alert("Something went wrong.");
      });

  }

  doEditProfile(){
    this.router.navigate(['/edit-profile'])
  }

  dontShow(orderId: number){
    OrderService.dontShow(orderId)
    window.location.reload()
  }

}
