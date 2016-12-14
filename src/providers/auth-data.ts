import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

/*
import { AngularFire } from 'angularfire2';

@Injectable()
export class AuthData {
  fireAuth: any;
  constructor(public af: AngularFire) {
    af.auth.subscribe( user => {
      if (user) { this.fireAuth = user.auth; }
    });
  }

  loginUser(newEmail: string, newPassword: string): any {
    return this.af.auth.login({ email: newEmail, password: newPassword });
  }

  resetPassword(email: string): any {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logoutUser(): any {
    return this.af.auth.logout();
  }

  signupUser(newEmail: string, newPassword: string): any {
    return this.af.auth.createUser({ email: newEmail, password: newPassword });
  }

}
*/

@Injectable()
export class AuthData {
  apiAuth: any;
  constructor(private http: Http) {
    this.apiAuth = {user_id:"",user_name:""};
  }

  loginUser(newEmail: string, newPassword: string): any {
    return new Promise(resolve => {
      // We're using Angular HTTP provider to request the data,
      // then on the response, it'll map the JSON data to a parsed JS object.
      // Next, we process the data and resolve the promise with the new data.
      this.http.get('data/login.json')
        .map(res => res.json())
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.apiAuth.user_id = data.user_id;
          this.apiAuth.user_name = data.user_name;
          window.localStorage.setItem("isLogged", "true");
          resolve(this.apiAuth);
        });
    });
  }

  resetPassword(email: string): any {
    console.log("Not ready!");
  }

  logoutUser(): any {
    window.localStorage.setItem("isLogged", "false");
  }

  signupUser(newEmail: string, newPassword: string): any {
    return new Promise(resolve => {
      //replace ce get function by post function like below
      //this.http.post('http://localhost:8080/core_aggreg/webapi/user/createAccount',JSON.stringify({email:newEmail,password:newPassword})) 
      this.http.get('data/login.json') 
        .map(res => res.json())
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.apiAuth.user_id = data.user_id;
          this.apiAuth.user_name = data.user_name;
          window.localStorage.setItem("isLogged", "true");
          resolve(this.apiAuth);
        });
    });
  }

  getFeed(id): any {
    return new Promise(resolve => {
      this.http.get('data/getFeed.json') 
        .map(res => res.json())
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          resolve(data);
        });
    });
  }

}