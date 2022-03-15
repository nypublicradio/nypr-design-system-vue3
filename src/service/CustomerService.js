import axios from 'axios'

export default class CustomerService {

    getCustomersLarge() {
		return axios.get('demo/data/customers-large.json').then(res => res.data.data);
    }
    
}