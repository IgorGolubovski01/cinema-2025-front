import { Component } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { MovieModel } from '../models/movie.model';
import { AxiosError } from 'axios';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [NgFor, MatCardModule, RouterLink, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  public page = 0;
  public size = 12;
  public totalPages = 0;

  public error: string | null = null;

  public movies: MovieModel[] | null = null;
  public filteredMovies: MovieModel[] | null = null;
  public promoMovie: MovieModel | null = null;

  public searchTerm: string = "";

  constructor() {
    this.loadMovies();

    MovieService.getPromoMovie()
      .then(rsp => this.promoMovie = rsp.data)
      .catch((e: AxiosError) => this.error = `${e.code}: ${e.message}`);
  }

  loadMovies() {
    MovieService.getAllMovies(this.page, this.size)
      .then(rsp => {
        this.movies = rsp.data.content;
        this.filteredMovies = this.movies; // show all movies initially
        this.totalPages = rsp.data.totalPages;
      })
      .catch((e: AxiosError) => this.error = `${e.code}: ${e.message}`);
  }

  filterMovies() {
    if (!this.movies) return;
    const term = this.searchTerm.toLowerCase();
    this.filteredMovies = this.movies.filter(m =>
      m.title.toLowerCase().includes(term) ||
      m.genre.genreName.toLowerCase().includes(term) ||
      (m.actors && m.actors.some(a => a.actorName.toLowerCase().includes(term)))
    );
  }

  nextPage() {
    if (this.page + 1 < this.totalPages) {
      this.page++;
      this.loadMovies();

      window.scrollTo({
        top: this.page * window.innerHeight,
        behavior: 'smooth'
      });
    }
  }

  prevPage() {
    if (this.page > 0) {
      this.page--;
      this.loadMovies();
    }
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
