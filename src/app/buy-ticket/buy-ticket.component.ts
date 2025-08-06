import { Component } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { ActivatedRoute } from '@angular/router';
import { MovieModel } from '../models/movie.model';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-buy-ticket',
  imports: [MatCardModule],
  templateUrl: './buy-ticket.component.html',
  styleUrl: './buy-ticket.component.css'
})
export class BuyTicketComponent {

  movieService = MovieService
  movie: MovieModel | null = null
  longText = "asdasdasd"

  constructor(private route: ActivatedRoute){
    route.params.subscribe(params => {
      MovieService.getMovieById(params['id'])
      .then(rsp => {
        this.movie = rsp.data 
      })
    })
  }

}
