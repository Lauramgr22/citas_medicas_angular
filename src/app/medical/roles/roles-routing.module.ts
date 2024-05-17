import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRoleUserComponent } from './add-role-user/add-role-user.component';
import { RolesComponent } from './roles.component';

const routes: Routes = [
  {
    path:'',
    component: RolesComponent,
    children:[
      {
        path:'registro',
        component:AddRoleUserComponent
      }
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule { }
