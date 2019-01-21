import { Injectable } from '@angular/core';
import { MenuService } from '@delon/theme';
import { ACLService } from '@delon/acl';
import { PermissionCheckerService } from 'abp-ng2-module/dist/src/auth/permission-checker.service';

import {  _HttpClient } from '@delon/theme';
import * as Contants from '../common/Contants';


@Injectable()
export class AbpACLService {
  constructor(
    private menuService: MenuService,
    private aclService: ACLService,
    private permission: PermissionCheckerService,
    private http: _HttpClient
  ) {}

  initACL() {
    this.http.get(Contants.API.SERVER_URL +'/AbpUserConfiguration/GetAll')
    .subscribe (
      (response:any)=>{
          $.extend(true, abp, response.result);
          this.aclService.setAbility(Object.getOwnPropertyNames(abp.auth.allPermissions));
        // 初始化菜单
        let menus = this.menuService.menus;
        menus.forEach((item)=>{
          this.checkMenuItemPermission(item);
        });
        this.menuService.clear();
        this.menuService.add(menus);
        });
  }

  private checkMenuItemPermission(menuItem) {

        for (let i = 0; i < menuItem.children.length; i++) {
            let subMenuItem = menuItem.children[i];
            subMenuItem.hide = !subMenuItem.permissionName || !this.permission.isGranted(subMenuItem.permissionName);
            if (subMenuItem.children && subMenuItem.children.length) {
                this.checkMenuItemPermission(subMenuItem);
            } else if (!subMenuItem.permissionName) {
              subMenuItem.hide = true;
            }
        }
    }

}
