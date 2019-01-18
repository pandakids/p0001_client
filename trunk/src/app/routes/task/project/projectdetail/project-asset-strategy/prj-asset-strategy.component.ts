import { Component, OnInit, Input } from '@angular/core';
import { DynamicComponent } from '@shared/dynamic-component/dynamic.component';
import { STColumn, STColumnButton, STChange } from '@delon/abc';
import { ModalHelper } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';
import { PrjDataService } from '../prj-data.service';

  @Component({
    selector: 'prj-asset-strategy',
    templateUrl: './prj-asset-strategy.component.html'
  })
  export class PrjAssetStrategyComponent implements OnInit {

     get data() {
    return this.prjDataService.projectDetail.projectInvestPercentListDto;
  }

    columns: STColumn[] = [
      { title: '编号', index: 'code' },
      { title: '名称', index: 'name' },
      { title: '比例', index: 'percent' },
      { title: '投资主体', index: 'projectInvestMain' },
      { title: '项目角色类型', index: 'projectRoleType' },
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