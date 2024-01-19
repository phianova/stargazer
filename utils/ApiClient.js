import axios from "axios";
import { GET } from "../app/api/weather/route";

export class ApiClient {
    
    responseStatusCheck(responseObject) {
        if (responseObject.status >= 200 && responseObject.status < 300) {
        return Promise.resolve(responseObject)
        } else {
            return Promise.reject(new Error(responseObject.statusText))
        }
    }
    getRequest(url) {
        return axios.get(url).then(this.responseStatusCheck).catch((err) => {
            console.error(err);
        })
    }

    async getWeather(city) {
        try {
            const response = await this.getRequest(`../api/weather?city=${city}`)
            return response.data;
        } catch (error) {
            console.error(error)    
        }
       
    }
}