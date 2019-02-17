import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { ProjectRoleServiceProxy, ProjectRoleTypeServiceProxy } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-admin-project-edit',
  templateUrl: './roleedit.component.html',
})
export class RoleEditComponent implements OnInit {
  @Input() item: any;

  // 角色类型
  cats: any[];

  constructor(
    private modal: NzModalRef,
    public msgSrv: NzMessageService,
    public http: _HttpClient,
    private roleProxy: ProjectRoleServiceProxy,
    private roleTypeProxy: ProjectRoleTypeServiceProxy
  ) {}

  ngOnInit() {
    this.getRoleTypes();
    this.item.name && (this.item.changeReason = '完善信息');
  }

  save() {
    if(this.item.id) {
      this.roleProxy.editProjectRole(this.item)
        .subscribe(resp => {
          this.msgSrv.success('修改成功！');
          this.modal.close(true);
          this.close();
        });
    }else{
      this.roleProxy.createProjectRole(this.item)
        .subscribe(resp => {
          this.msgSrv.success('添加成功！');
          this.modal.close(true);
          this.close();
        });
    }
  }

  close() {
    this.modal.destroy();
  }

  getRoleTypes(){
    this.roleTypeProxy.getProjectRoleTypes()
      .subscribe(resp => {
        this.cats = resp.items;
      });
  }
}
