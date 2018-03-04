import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {PanelMenuModule} from 'primeng/panelmenu';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    isCollapsed = false;
   
    constructor(private router: Router) { }
    ngOnInit() {
    }
    exit(){
        console.log(this.router.navigate)
        this.router.navigate(["login"]);
    }

}


