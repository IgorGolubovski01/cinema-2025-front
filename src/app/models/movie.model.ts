import { ActorModel } from "./actor.model";
import { GenreModel } from "./genre.model";

export interface MovieModel {
    id: number,
    title: string,
    description: string,
    director: string,
    duration: string,
    filmDateTime: string,
    price: number,
    releaseDate: string,
    genre: GenreModel,
    promo: boolean
    actors: ActorModel[]
}