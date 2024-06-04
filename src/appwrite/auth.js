import config from "../config/config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteDatabaseId);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            await this.account.create(ID.unique(), email, password, name)
            if (userAccount) {
                return this.login({email, password})
            } else {
                return userAccount
            }
        } catch (error) {
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            await this.account.createEmailPasswordSession(email,password);
        } catch (error) {
               throw error
        }
    }

    async getCurrentUser(){
        try {
            await this.account.get();
        } catch (error) {
           console.log("Appwrite service :: getCurrentUser :: error", error);
        }

        return null; //when it has error that time it return and whike not throw error that also rturn null
    }

    async logout(){
        try{
            await this.account.deleteSession('all');
        }catch(error){
            console.log("Appwrite service :: logout :: error", error);
        }
    }
}

const authService = new AuthService();

export default authService;