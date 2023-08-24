import axios from "axios";
import apiKey from "../../config/apiKey";
import { apiUrl } from "../../config/apiUrl";

class JoblyApi {
    static token;
    static bearer_token_req;

    // query params needs to be an object with on of the following key/value pairs: 
    // name, minEmployees, maxEmployees
    static async get(urlPath, queryparams=null){
        try {
            if(!queryparams){
                const res = await axios.get(`${apiUrl}${urlPath}`);
                return res
            } else {
                const res = await axios.get(`${apiUrl}${urlPath}`, {params : queryparams});
                return res
            }
        } catch (error) {
            console.log(error)
            return error
        }
    }

    static async getWithValidation(urlPath, queryparams=null){
        try {
            if(!queryparams){
                const res = await axios.get(`${apiUrl}${urlPath}`, this.bearer_token_req)
                return res
            } else {
                const res = await axios.get(`${apiUrl}${urlPath}`, this.bearer_token_req, {params : queryparams})
                return res
            }
        } catch (error) {
            console.log(error)
            return error
        }
    }

    static async post(urlPath, data = {}, validationNeeded = false){
        try {
            console.log('inside post',data)
            console.log(validationNeeded)
            console.log(this.bearer_token_req)
            // This conditional decides whether to include validation or not.
            const res = validationNeeded ? await axios.post(`${apiUrl}${urlPath}`, data, this.bearer_token_req) : await axios.post(`${apiUrl}${urlPath}`, data);
            console.log(res)
            return res
        } catch (error) {
            console.log(error)
            return error
        }

    }

    static async patch(urlPath, data){
        try {
            const res = await axios.patch(`${apiUrl}${urlPath}`, data, this.bearer_token_req)
            console.log(res)
            return res
        } catch (error) {
            console.log(error)
        }
    }

    static async delete(urlPath, data = {}){
        try {
            // This conditional decides whether to include validation or not.
            const res = await axios.delete(`${apiUrl}${urlPath}`, this.bearer_token_req);
            return res
        } catch (error) {
            console.log(error)
            return error
        }

    }

    static async login(inputData){
        const res = await this.post(`/auth/token`, inputData)
        console.log(res)
        this.token = res.data.token
        this.bearer_token_req = {
            headers: { 
                Authorization: `Bearer ${this.token}`
            }
        }
        return res.data.token
    }  

    static async getUserData(username){
        const res = await this.getWithValidation(`/users/${username}`);
        return res.data.user
    }


    static async getNutritionData(inputData){
        const res = await axios.get(`https://api.api-ninjas.com/v1/nutrition?query=${inputData}`, {headers : {'X-Api-Key': apiKey}})
        console.log(res.data)
        return res.data
    }

    static async updateUser(username, firstName, lastName, email, password=null){
        const data = password ? {firstName, lastName, email, password} : {firstName, lastName, email}
        await this.patch(`/users/${username}`, data)
    }
    
    static async createUser(username, firstName, lastName, email, password){
        const data = {username, firstName, lastName, email, password}    
        const res = await this.post(`/auth/register`, data)
        console.log(res)
        return res
    }

    static async addFoodToLog(username, data){
        const res = await this.post(`/logs/${username}`, data, true)
        return res
    }

    static async getItems(username, date){
        const res = await this.getWithValidation(`/logs/${username}/${date}`);
        return res.data
    }

    static async deleteItem(username, id){
        const res = await this.delete(`/logs/${username}/${id}`)
        return res.data
    }
}

export default JoblyApi;