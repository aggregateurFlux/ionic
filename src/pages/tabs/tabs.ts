import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {HomePage} from '../home/home';
import {ProfilePage} from '../profile/profile';

/*
  Generated class for the Tabs page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
	HomePage : any;
	ProfilePage : any;
	constructor() {
		// Remember the tabs.html template?
		// we used these vars
		this.HomePage = HomePage;
		this.ProfilePage = ProfilePage;
	}

}