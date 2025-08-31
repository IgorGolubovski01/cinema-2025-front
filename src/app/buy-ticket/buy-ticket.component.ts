import { Component } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieModel } from '../models/movie.model';
import { MatCardModule } from '@angular/material/card';
import { UserService } from '../services/user.service';
import { AddToCartModel } from '../models/addToCart.model';
import { OrderService } from '../services/order.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-buy-ticket',
  imports: [MatCardModule, NgFor],
  templateUrl: './buy-ticket.component.html',
  styleUrl: './buy-ticket.component.css'
})
export class BuyTicketComponent {

  movieService = MovieService
  movie: MovieModel | null = null
  private userService = UserService
  availableTickets: number | null = null

  constructor(private route: ActivatedRoute, private router: Router) {
    route.params.subscribe(params => {
      MovieService.getMovieById(params['id'])
        .then(rsp => {
          this.movie = rsp.data
          this.availableTickets = rsp.data.capacity - rsp.data.soldTickets
        })
    })
  }



  doBuyTicket() {
    if (!this.userService.checkActive()) {
      alert('Please log in first.');
      this.router.navigate(['/login']);
      return;
    }

    if (this.availableTickets! <= 0) {
      alert('Tickets for this movie are sold out!')
      return

    }

    try {
      const activeUserString = localStorage.getItem('active');
      if (!activeUserString) {
        alert('Please log in first.');
        this.router.navigate(['/login']);
        return;
      }
      const activeUser = JSON.parse(activeUserString);

      if (!this.movie || this.availableTickets === null) return;

      let quantityStr = prompt(`Enter number of tickets (Available: ${this.availableTickets}):`, '1');
      if (!quantityStr) return;
      let quantity = parseInt(quantityStr, 10);

      if (isNaN(quantity) || quantity < 1 || quantity > this.availableTickets) {
        alert(`Invalid number! Please select up to ${this.availableTickets} tickets.`);
        return;
      }

      const m: AddToCartModel = {
        movieId: this.movie.id,
        userId: activeUser.id,
        quantity: quantity
      };

      console.log('Adding to cart:', m);

      OrderService.addToCart(m)
        .then(() => {
          alert("Added to the cart.");
          this.router.navigate(['/home']);
        })
        .catch(err => {
          console.error(err);
          alert('Something went wrong while adding the ticket. Please try again.');
        });

    } catch (e) {
      console.error(e);
      alert('Something went wrong while adding the ticket. Please try again.');
    }
  }

}
