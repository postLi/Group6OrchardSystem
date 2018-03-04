import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {RootRouter} from "./orchard/router/router";
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ReactiveFormsModule } from '@angular/forms';

import {HttpService} from './orchard/utils/http.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './orchard/components/home/home.component';
import { HeightlineDirective } from './orchard/directives/heightline.directive';
import { DatagridComponent } from './orchard/components/datagrid/datagrid.component';
import { RegComponent } from './orchard/components/reg/reg.component';
import { LoginComponent } from './orchard/components/login/login.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeightlineDirective,
    DatagridComponent,
    RegComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RootRouter,
    BrowserAnimationsModule,
    NgZorroAntdModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [HttpService],
  bootstrap: [LoginComponent]
})
export class AppModule { }
