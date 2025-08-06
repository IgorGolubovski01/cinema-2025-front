import { Component } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { MovieModel } from '../models/movie.model';
import { AxiosError } from 'axios';
import { RouterLink, RouterModule } from '@angular/router';
import { NgFor } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-home',
  imports: [NgFor, MatCardModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  public error: string | null = null

  public movies: MovieModel[] | null = null
  public promoMovie: MovieModel | null = null

  constructor() {
    MovieService.getAllMovies()
      .then(rsp => {
        this.movies = rsp.data
      }).catch((e: AxiosError) => this.error = `${e.code}: ${e.message}`)

    MovieService.getPromoMovie()
      .then(rsp => {
        this.promoMovie = rsp.data
      }).catch((e: AxiosError) => this.error = `${e.code}: ${e.message}`)


  }

  scrollToShowing() {
    const el = document.getElementById('showing');
    if (el) {
      const yOffset = -100;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }



}
