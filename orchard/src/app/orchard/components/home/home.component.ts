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
    lanType: string = "en";
    isCollapsed = false;
    constructor(private router: Router,private common: CommonService) { }
    ngOnInit() {
    }
    exit(){
        this.router.navigate(["login"]);
    }

}    


