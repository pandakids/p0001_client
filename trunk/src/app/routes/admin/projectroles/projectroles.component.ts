import { Component, OnInit, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { ModalHelper } from '@delon/theme';
import { STComponent, STColumn, STColumnButton } from '@delon/abc';
import { RoleEditComponent } from './edit/roleedit.component';
import { ProjectRoleServiceProxy } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'projectroles',
  templateUrl: './projectroles.component.html',
  styleUrls: ['./projectroles.component.css']
})
export class ProjectrolesComponent implements  OnInit{

  @ViewChild('st') st: STComponent;
  s: any = {
    pi: 1,
    ps: 10,
    s: '',
  };

  columns: STColumn[] = [
    { title: '角色名称', index: 'name' },
    { title: '角色类型', index: 'projectRoleType' },
    {
      title: '操作',
      width: '180px',
      buttons: [
        {
          text: '编辑',
          type: 'modal',
          component: RoleEditComponent,
          paramName: 'item',
          click: (record: any) => {
            this.getProjectRoles();
          },
        },
        {
          text: '删除',
          type: 'del',
          click: (record: any) => {
            this.delProjectRole(record.id, record.name);
          }
        },
      ],
    },
  ];
  datas: any[];

  constructor(public msg: NzMessageService,
              private modal: ModalHelper,
              private roleProxy: ProjectRoleServiceProxy) {}

  ngOnInit(){
    this.getProjectRoles();
  }

  /** 添加项目角色 */
  add() {
    const params = {
      item: {
        name: '',
        projectRoleType: '',
      },
    };

    this.modal
      .static(RoleEditComponent, params)
      .subscribe(resp => {
        this.getProjectRoles();
      });
  }

  /** 删除角色 */
  delProjectRole(id: number, name: string){
    this.roleProxy.deleteProjectRole(id)
      .subscribe(() => {
        this.msg.info(`删除项目角色[${name}]成功！`);
        this.getProjectRoles();
      });
  }

  /** 获取角色列表数据 */
  getProjectRoles(){
    this.roleProxy.getProjectRoles().subscribe(resp => {
      this.datas = resp.items;
    });
  }
}
