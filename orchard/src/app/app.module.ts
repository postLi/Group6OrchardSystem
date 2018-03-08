import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {RootRouter} from "./orchard/router/router";
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap';
import { AlertModule } from 'ngx-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap';

import {HttpService} from './orchard/utils/http.service';
import {CommonService} from './orchard/utils/common.service'

import {RangePipe} from './orchard/utils/range.pipe';
import { AppComponent } from './app.component';
import { HomeComponent } from './orchard/components/home/home.component';
import { HeightlineDirective } from './orchard/directives/heightline.directive';
import { DataGridComponent } from './orchard/components/datagrid/datagrid.component';
import { DataformComponent } from './orchard/components/dataform/dataform.component';
import { LoginComponent } from './orchard/components/login/login.component';
import { AllgoodsComponent } from './orchard/components/allgoods/allgoods.component';

import { AlluserComponent } from './orchard/components/alluser/alluser.component';
import { AdduserComponent } from './orchard/components/adduser/adduser.component';
import { AddgoodsComponent } from './orchard/components/addgoods/addgoods.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeightlineDirective,
    DataGridComponent,
    DataformComponent,
    LoginComponent,
    RangePipe,
    AllgoodsComponent,
    AlluserComponent,
    AdduserComponent,
    AddgoodsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RootRouter,
    BrowserAnimationsModule,
    NgZorroAntdModule.forRoot(),
    PaginationModule.forRoot(),
    AlertModule.forRoot(),
    BsDropdownModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [HttpService,CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
