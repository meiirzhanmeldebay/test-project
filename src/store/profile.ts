import axiosInstance from '../axiosInstance'; // Import the Axios instance
import { defineStore } from 'pinia';

import type { PhotoItem, PostItem } from '../types/profile';
export const useProfileStore = defineStore('profile', {
  state: () => {
    return {
      profile: null,
      profilePosts: [] as PostItem[],
      profilePhotos: [] as PhotoItem[]
    };
  },
  actions: {
    /* GENERAL */
    clearData() {
      this.profile = null ;
      this.profilePosts = [];
      this.profilePhotos = [];
      
    },
    clearError() {
      this.error = {
        errors: {},
        code: 0,
        message: ''
      }
    },
    setError(error: { response: { data: { errors: any; message: any; }; status: any; }; message: any; }) {
      this.error = {
        errors: error.response?.data?.errors || {},
        message: error.response?.data?.message || error.message || '',
        code: error.response?.status || 0
      }

      console.error("Error:", error);
    },
    
    // get profile photos
    async getProfilePhotos() {
      this.loading = true;
      try {
        this.clearError()
        if(this.profilePhotos.length) return;  
        const { data: response } = await axiosInstance.get('photos');
    
        this.profilePhotos = response.slice(0,100);
      }
      catch (error: any) {
        this.setError(error)        
      } finally {
        this.loading = false;
      }

      return this.profilePhotos;
    },
    // get profile posts
    async getProfilePosts() {
      this.loading = true;      
      try {
        if(this.profilePosts.length) return;
        this.clearError()

        const { data: response } = await axiosInstance.get('posts');
    
        this.profilePosts = response.slice(0,100);
      }
      catch (error: any) {
        this.setError(error)        
      } finally {
        this.loading = false;
      }

      return this.profilePosts;
    },
    // get profile post by id
    async getProfilePostByID(id:number) {
      this.loading = true;
      try {
        this.clearError()

        const { data: response } = await axiosInstance.get(`posts/${id}`);
    
        return response
      }
      catch (error: any) {
        this.setError(error)        
      } finally {
        this.loading = false;
      }      
    },
    // get profile photo by id
    async getProfilePhotoByID(id:number) {
      this.loading = true;
      try {
        this.clearError()

        const { data: response } = await axiosInstance.get(`photos/${id}`);
    
        return response
      }
      catch (error: any) {
        this.setError(error)        
      } finally {
        this.loading = false;
      }      
    },
    
  }
});
