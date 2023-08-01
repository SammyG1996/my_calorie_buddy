import axios from "axios";
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

    static async getJobs(){
        const res = await this.get(`/jobs`);
        return res.data.jobs
    }

    static async getJobsByCompany(company){
        const res = await this.get(`/companies/${company}`);
        return res.data.company.to_json.jobs
    }

    static async getUserJobApplications(username){
        console.log(username)
        const res = await this.getWithValidation(`/users/${username}/applications`)
        return res.data.applications
    }

    static async getUserData(username){
        const res = await this.getWithValidation(`/users/${username}`);
        return res.data.user
    }

    static async getCompanies(){
        const res = await JoblyApi.get('/companies');
        return res.data.companies
    }

    static async applyToJob(username, jobID, data){
        const res = await this.post(`/users/${username}/jobs/${jobID}`, data, true)
        console.log(res)
    }

    static async getFilterCompany(inputData){
        const res = await this.get(`/companies`, {name : inputData})
        return res.data.companies
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
        console.log(res.name)
        console.log(res.response.data.error.message[0])

        
    }
}

export default JoblyApi;