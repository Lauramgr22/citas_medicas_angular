import { Component } from '@angular/core';
import { DataService } from 'src/app/shared/data/data.service';

/*  
interface SubMenu {
  menuValue: string;
  route: string;
  base: string;
}

interface Menu {
  menuValue: string;
  hasSubRoute: boolean;
  showSubRoute: boolean;
  base: string;
  base2?: string;
  icon?: string;
  faIcon?: boolean;
  img?: string;
  subMenus: SubMenu[];
  route?: string;
}

interface SideBarSection {
  tittle: string;
  showAsTab: boolean;
  separateRoute: boolean;
  menu: Menu[];
}
*/

@Component({
  selector: 'app-add-role-user',
  templateUrl: './add-role-user.component.html',
  styleUrls: ['./add-role-user.component.scss']
})

export class AddRoleUserComponent {

  sideBar: any = [];
  
  constructor(
    public DataService: DataService
  ){

  }

  ngOnInit(): void{
    this.sideBar = this.DataService.sideBar[0].menu;
  }

}
