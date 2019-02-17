import { Component, OnInit, Input } from '@angular/core';
import { DynamicComponent } from '@shared/dynamic-component/dynamic.component';
import { STColumn, STColumnButton, STChange } from '@delon/abc';
import { ModalHelper } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';
import { PrjDataService } from '../prj-data.service';

  @Component({
    selector: 'prj-income',
    templateUrl: './project-income.component.html'
  })
  export class PrjIncomeComponent implements OnInit {

     get data() {
    return this.prjDataService.projectDetail.projectInComeListDto;
  }

    columns: STColumn[] = [
      { title: '金额', index: 'amount' },
      { title: '收入简述', index: 'title' },
      { title: '经手人', index: 'linkUser' },
      { title: '收入详情', index: 'remarks' },
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