import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {PanelMenuModule} from 'primeng/panelmenu';
import {MenuItem} from 'primeng/api';
import {CommonService} from '../../utils/common.service'

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
		isCollapsed = false;
		username:string;
		constructor(private router: Router,private common: CommonService) { }
		ngOnInit() {
			let username1 = sessionStorage.getItem("username");
			
			this.username = username1;
			if(!username1){
				this.router.navigate(["login"]);
			}
		}
		exit(){
			sessionStorage.removeItem("username");
			this.router.navigate(["login"]);
		}

}    


