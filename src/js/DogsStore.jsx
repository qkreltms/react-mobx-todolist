import { observable, action } from 'mobx'
import axios from 'axios'
const fetchDogAxios = axios.create({
    baseURL: 'https://dog.ceo/api/breeds/image/random'
})

class Dogs {
    @observable img

    @action
    fetchDog = () => {
        fetchDogAxios.get()
            .then(
                res => {
                    this.img = res.data.message || ''
                },
                err => {
                    console.log(err)
                })
    }
}

export default new Dogs