import { defineStore } from 'pinia';
import { getCookie, setCookie, removeCookie } from '../utils/cookie';

import type { IUser } from '../types/auth';
export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      isAuthorized: getCookie('isAuthorized') || false ,
      users: getCookie('users') || [] as IUser[],     
      userData : getCookie('userData')  || {} as IUser
    };
  },
  actions: {
    /* GENERAL */
    clearData() {
      this.isAuthorized = false ;
      this.userData = {};    
      setCookie('userData', this.userData, { path: '/', maxAge: 3600 })  
      setCookie('isAuthorized', this.isAuthorized, { path: '/', maxAge: 3600 })      
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

    isEmailInArray(email: string): boolean {
      return this.users.some(user => user.email === email);
    },
    
    isValidUser(email: string, password: string): boolean {
      const user = this.users.find(user => user.email === email && user.password === password);
      if (user) {
        this.currentUser = user;
        return true;
      }
      return false;
    },
    
    
    // set user data 
    setUserData(email:string, name : string, password : string) {
      this.loading = true;
      try {
        this.clearError()
        
        let user = {
          name : name,
          email : email,
          password : password
        }
        
        this.userData = user;
        setCookie('userData', this.userData, { path: '/', maxAge: 3600 })
    
        return this.userData
      }
      catch (error: any) {
        this.setError(error)        
      } finally {
        this.loading = false;
      }      
    },

    // set user data 
    addUserData(email:string, name : string, password : string) {
      this.loading = true;
      try {
        this.clearError()
        
        let user = {
          name : name,
          email : email,
          password : password
        }
        
        this.users.push(user);

        this.setUserData(user.email, user.name, user.password)
        setCookie('users', this.users, { path: '/', maxAge: 3600 })
        
        return this.users
      }
      catch (error: any) {
        this.setError(error)        
      } finally {
        this.loading = false;
      }      
    },

    // sign in
    signin(email:string, password : string) {
      this.loading = true;
      try {
        this.clearError();

        // checking user is registered or not
        let isSignedUp = this.isEmailInArray(email);
        if (!isSignedUp) {
          alert("You have not registered");
          this.loading = false;
          return;
        }

        let loginSuccess = this.isValidUser(email, password);
        if(loginSuccess) {
          this.isAuthorized = true;
        }else{
          this.isAuthorized = false;
        }
        setCookie('isAuthorized', this.isAuthorized, { path: '/', maxAge: 3600 })
        

        return loginSuccess;
        
        }
        catch (error: any) {
            this.setError(error)            
        } finally {
            this.loading = false;
        }
    },

    // sign in
    signup(email:string, name : string, password : string) {
      this.loading = true;
      try {
        this.clearError();

        // checking user is registered or not
        let isSignedUp = this.isEmailInArray(email);
        if (isSignedUp) {
          alert("You have registered already");
          this.loading = false;
          return false;
        }

        this.addUserData(email, name, password)
        this.isAuthorized = true;
        setCookie('isAuthorized', this.isAuthorized, { path: '/', maxAge: 3600 })

        let users = getCookie('users')        

        return true;
        
        }
        catch (error: any) {
          this.setError(error)            
        } finally {
          this.loading = false;
        }
    },

    // logout
    async logout() {
        this.loading = true;
        try {
            this.clearError()
            this.clearData();            
        }
        catch (error: any) {
            this.setError(error)            
        } finally {
            this.loading = false;
        }
    },
    
  }
});
