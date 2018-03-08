import {RouterModule,Routes} from "@angular/router";

import {HomeComponent} from '../components/home/home.component'
import {LoginComponent} from '../components/login/login.component'
import {AllgoodsComponent} from '../components/allgoods/allgoods.component'
import {AddgoodsComponent} from '../components/addgoods/addgoods.component'
import {AlluserComponent} from '../components/alluser/alluser.component'
import {AdduserComponent} from '../components/adduser/adduser.component'


const appRoutes:Routes = [
    {path:'',component:HomeComponent,
        children:[
            {path:'allgoods',component:AllgoodsComponent},
            {path:'addgoods',component:AddgoodsComponent},
            {path:'alluser',component:AlluserComponent},
            {path:'adduser',component:AdduserComponent}

        ]

    },
    {path:'login',component:LoginComponent},
    
        
]

export const RootRouter = RouterModule.forRoot(
		appRoutes,
		{enableTracing:false}
	)
