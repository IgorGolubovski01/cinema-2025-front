import axios from 'axios'

const client = axios.create({
    baseURL: 'http://localhost:8080/movie',
    headers: {
        'Accept': 'application/json'
    }
})

export class MovieService {

    static async getAllMovies(page: number = 0, size: number = 12) {
        return client.get('getAllMovies', {
            params: { page, size }
        })
    }

    static async getPromoMovie() {
        return client.get('getPromoMovie')
    }

    static async getMovieById(id: number) {
        return client.get(`/getMovieById/${id}`)
    }


}