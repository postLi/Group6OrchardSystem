import {RouterModule,Routes} from "@angular/router";

import {HomeComponent} from '../components/home/home.component'
import {LoginComponent} from '../components/login/login.component'
import {AllgoodsComponent} from '../components/allgoods/allgoods.component'
import {LianxiComponent} from '../components/lianxi/lianxi.component'
const appRoutes:Routes = [
   
    {path:'login',component:LoginComponent},
    {path:'allgoods',component:AllgoodsComponent}
    {path:'lianxi',component:LianxiComponent}
    
   
        
]

export const RootRouter = RouterModule.forRoot(
		appRoutes,
		{enableTracing:false}
	)
