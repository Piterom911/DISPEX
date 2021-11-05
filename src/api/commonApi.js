import axios from "axios";


const instance = axios.create({
    baseURL: 'https://dispex.org/api/vtest/'
})

export const addressApi = {
    getStreets() {
        return instance.get('Request/streets')
    },
    getHouses(id) {
        return instance.get(`Request/houses/${id}`)
    },
    getApartments(id) {
        return instance.get(`Request/house_flats/${id}`)
    },
}

export const clientApi = {
    createClient(clientData) {
        return instance.post(`/HousingStock/client`, clientData)
    },
    getClient(phone) {
        return instance.get(`/HousingStock/client?phone=${phone}`)
    },
    bindClient(AddressId, ClientId) {
        return instance.put(`/HousingStock/bind_client`, {AddressId, ClientId})
    },
}

export const clientsApi = {
    getAllClients(addressID) {
        return instance.get(`HousingStock/clients?addressId=${addressID}`)
    },
}