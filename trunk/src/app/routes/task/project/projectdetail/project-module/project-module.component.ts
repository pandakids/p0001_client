import { Component, OnInit, Input } from '@angular/core';
import { DynamicComponent } from '@shared/dynamic-component/dynamic.component';
import { STColumn, STColumnButton, STChange } from '@delon/abc';
import { ModalHelper } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';
import { PrjDataService } from '../prj-data.service';
import { PrjReqComponent } from '../project-req/project-req';

  @Component({
    selector: 'prj-module',
    templateUrl: './project-module.component.html'
  })
  export class PrjModuleComponent implements OnInit {

     get data() {
    return this.prjDataService.projectDetail.projectModuleListDto;
  }

    columns: STColumn[] = [
      { title: '编号', index: 'code' },
      { title: '名称', index: 'name' },
      { title: '项目', index: 'projectName' },
      { title: '工分', index: 'gongfen', type: 'number' },
      { title: '备注', index: 'remarks', default: '-' },
      {
        title: '操作区',
        buttons: [
          {
            text: '需求',
            type: 'modal',
            paramName: 'inputData',
            component: PrjReqComponent,
            click: (record: any, modal: any) =>
              // this.message.success(
              //   `重新加载页面，回传值：${JSON.stringify(modal)}`,
              // ),
            {

            }
          }
        ]
      }
    ];

    constructor(
      private modal: ModalHelper,
      public msg: NzMessageService,
      private prjDataService:PrjDataService,
      ) {
    }

    ngOnInit() {
    }
}