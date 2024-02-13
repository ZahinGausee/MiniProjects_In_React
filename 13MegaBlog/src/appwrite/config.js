import { Client, Databases, Storage, Query, ID } from "appwrite";
import conf from "../conf/conf";

class Service {
  client = new Client();
  database;
  bucket;

  constructor() {
    this.client
    .setEndpoint(conf.appwriteUrl) // Your API Endpoint
    .setProject(conf.appwriteProjectId); // Your project ID
    this.database = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({userId, title, slug, featuredImage, content, status})  {
    try {
      return await this.database.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId, 
        slug,
        {
          title,
          featuredImage,
          content,
          status,
          userId
        }
      )
    } catch (error) {
      console.log("Appwrite service :: createPost :: Error", error);
    }
  }

  async updatePost(slug, {userId, title, featuredImage, content, status}) {
    try {
      return await this.database.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title, 
          featuredImage,
          content,
          status,
          userId
        }
      )
    } catch (error) {
        console.log("Appwrite service :: getPost :: Error", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.database.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      )
      return true;
    } catch (error) {
      console.log("Appwrite service :: DeletePost :: Error", error);
      return false
    }
  }

  async getPost(slug) {
    try {
      return await this.database.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      )
    } catch (error) {
      console.log("Appwrite service :: getPost :: Error", error);
    }
  }

  async getPosts(queries = [ Query.equal("status", "active")]) {
    try {
      return await this.database.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      )
    } catch (error) {
      console.log("Appwrite service :: listPosts :: Error", error);
      return false;
    }
  }

  // Uploading and deleting the files
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      )
    } catch (error) {
      console.log("Appwrite service :: uploadFiles :: Error", error);
      return false
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(
        conf.appwriteBucketId,
        fileId
      )
      return true;
    } catch (error) {
      console.log("Appwrite service :: delteFiles :: Error", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    try {
      return this.bucket.getFilePreview(
        conf.appwriteBucketId,
        fileId
      )
    } catch (error) {
      console.log("Appwrite service :: getPreviewFiles :: Error", error);
    }
  }
  
}

const service = new Service();

export default service;