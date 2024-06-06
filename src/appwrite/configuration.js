import config from "../config/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    storage;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteDatabaseId);
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client)
    }

    //createPost
    async createPost({ title, slug, content, images, status, userID }) {
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    images,
                    status,
                    userID
                }
            )
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
        }
    }

    //updatePost
    async updatePost(slug, { title, content, images, status }) {
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    images,
                    status
                }
            )
        } catch (error) {
            console.log("Appwrite service :: updatepost :: error", error);

        }
    }


    //deletePost
    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log("Appwrite service :: deletepost :: error", error);
            return false

        }
    }

    //getPost 
    async getPost(slug) {
        try {
            await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error);
            return false
        }
    }

    //getPosts 
    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries,
            )
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error", error);
            return false
        }
    }

    //fileUpload
    async uploadFile(file){
        try{
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )
        }catch(error){
            console.log("Appwrite service :: uploadFile :: error",error);
            return false
        }
    }

    //deleteFile
    async deleteFile(fileId){
        try{
            await this.bucket,this.deleteFile(
                config.appwriteBucketId,
                fileId
            )
            return true
        }catch(error){
            console.log("Appwrite service :: deleteFile :: error",error);
            return false
        }
    }
    
    //previewFile
    previewFile(fileId){
        return this.bucket.previewFile(
            config.appwriteBucketId,
            fileId
        )
    }
}

const service = new Service()
export default service