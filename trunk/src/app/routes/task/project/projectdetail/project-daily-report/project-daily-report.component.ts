import { Component, OnInit, Input } from '@angular/core';
import { DynamicComponent } from '@shared/dynamic-component/dynamic.component';
import { STColumn, STColumnButton, STChange } from '@delon/abc';
import { ModalHelper } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';
import { PrjDataService } from '../prj-data.service';

  @Component({
    selector: 'prj-daily-report',
    templateUrl: './project-daily-report.component.html'
  })
  export class PrjDailyReportComponent implements OnInit {

     get data() {
    return this.prjDataService.projectDetail.projectDailyReportListDto;
  }

    columns: STColumn[] = [
      { title: '编号', index: 'code' },
      { title: '名称', index: 'title' },
      { title: '开始时间', index: 'startTime' },
      { title: '结束时间', index: 'endTime' },
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