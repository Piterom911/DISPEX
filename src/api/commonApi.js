import axios from "axios";


const instance = axios.create({
    baseURL: 'https://dispex.org/api/vtest/'
})

export const addressApi = {
    getStreets() {
        return instance.get('Request/streets')
    },
    getHouses(id) {
        console.log('API houses', id)
        return instance.get(`Request/houses/${id}`)
    },
    getApartments(id) {
        return instance.get(`Request/house_flats/${id}`)
    },
}