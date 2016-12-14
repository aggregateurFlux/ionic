import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { AuthData } from '../../providers/auth-data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  jsonFilter : any;
  public loading: any;
  public cards = [];

  constructor(public nav: NavController, public alertCtrl: AlertController,
    public loadingCtrl: LoadingController, public authData: AuthData ) {
    //this.jsonFilter = ['google', 'instagram', 'tweeter'];
    //we have to get the current api subscribed
    this.jsonFilter = ['instagram', 'tweeter'];
  }

  ionViewDidEnter() {
    this.loadFeed();
  }

  showFilterCheckbox() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Which timeline are allowed?');

    var arrayLength = this.jsonFilter.length;
    for (var i = 0; i < arrayLength; i++) {
      var allowed = (window.localStorage.getItem("filter_"+this.jsonFilter[i]) === "true")
                    || (window.localStorage.getItem("filter_"+this.jsonFilter[i]) == null);

      alert.addInput({
        type: 'checkbox',
        label: this.jsonFilter[i],
        value: this.jsonFilter[i],
        checked: allowed
      });
    }

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Okay',
      handler: data => {

        var arrayLength = this.jsonFilter.length;
        for (var i = 0; i < arrayLength; i++) {
          
          if(data.indexOf(this.jsonFilter[i]) != -1){
            window.localStorage.setItem("filter_"+this.jsonFilter[i], "true");
          }else{
            window.localStorage.setItem("filter_"+this.jsonFilter[i], "false");
          }
        }
        this.loadFeed();
      }
    });
    alert.present();
  }

  loadFeed(){
    var allowedApi = [];
    var arrayLength = this.jsonFilter.length;
    for (var i = 0; i < arrayLength; i++) {
      if((window.localStorage.getItem("filter_"+this.jsonFilter[i]) === "true")
      || (window.localStorage.getItem("filter_"+this.jsonFilter[i]) == null)){
        allowedApi.push(this.jsonFilter[i]);
      }
    }

    this.loading = this.loadingCtrl.create({
      dismissOnPageChange: true,
    });

    this.loading.present();

    var id = 1; //get id from the connected user

    this.authData.getFeed(id).then( data => {
      this.cards = data;
      this.loading.dismiss();
    }, error => {
      this.loading.dismiss().then( () => {
        let alert = this.alertCtrl.create({
          message: error.message,
          buttons: [
            {
              text: "Ok",
              role: 'cancel'
            }
          ]
        });
        alert.present();
      });
    });

  }
}