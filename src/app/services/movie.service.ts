import axios from 'axios'

const client = axios.create({
    baseURL: 'http://localhost:8080/movie',
    headers:{
        'Accept': 'application/json'
    }
})

export class MovieService{
    
    static async getAllMovies(){
        return client.get('getAllMovies')
    }

    static async getPromoMovie(){
        return client.get('getPromoMovie')
    }

    static async getMovieById(id: number){
        return client.get(`/getMovieById/${id}`)
    }


}