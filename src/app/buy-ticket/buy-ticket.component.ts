import { Component } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieModel } from '../models/movie.model';
import { MatCardModule } from '@angular/material/card';
import { UserService } from '../services/user.service';
import { addToCartModel } from '../models/addToCart.model';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-buy-ticket',
  imports: [MatCardModule],
  templateUrl: './buy-ticket.component.html',
  styleUrl: './buy-ticket.component.css'
})
export class BuyTicketComponent {

  movieService = MovieService
  movie: MovieModel | null = null
  private userService = UserService
  availableTickets: number|null = null

  constructor(private route: ActivatedRoute, private router: Router){
    route.params.subscribe(params => {
      MovieService.getMovieById(params['id'])
      .then(rsp => {
        this.movie = rsp.data
        this.availableTickets = rsp.data.capacity-rsp.data.soldTickets
      })
    })
  }

  

  doBuyTicket(){
    if(!(this.userService.checkActive())){
      alert('Please log in first.')
      this.router.navigate(['/login'])
    }

    const m: addToCartModel={
      movieId: 5,
      userId: 14,
      quantity: 1
    }
    console.log(m);
    
    OrderService.addToCart(m)
  }

}
