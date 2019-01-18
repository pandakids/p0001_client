import { Component, OnInit, Input } from '@angular/core';
import { DynamicComponent } from '@shared/dynamic-component/dynamic.component';
import { STColumn, STColumnButton, STChange } from '@delon/abc';
import { ModalHelper } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';
import { PrjDataService } from '../prj-data.service';

  @Component({
    selector: 'prj-version',
    templateUrl: './project-version.component.html'
  })
  export class PrjVersionComponent implements OnInit {

     get data() {
    return this.prjDataService.projectDetail.projectVersionListDto;
  }

    columns: STColumn[] = [
      { title: '编号', index: 'code' },
      { title: '名称', index: 'name' },
      { title: '版本', index: 'versionName' },
      { title: '等级', index: 'level', type:'number' },
      { title: '等级1', index: 'level1', type:'number' },
      { title: '等级2', index: 'level2', type:'number' },
      { title: '等级3', index: 'level3', type:'number' },
      { title: '等级4', index: 'level4', type:'number' },
      { title: '备注', index: 'remarks', default: '-' },
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