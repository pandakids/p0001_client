import { Component, OnInit, Input } from '@angular/core';
import { DynamicComponent } from '@shared/dynamic-component/dynamic.component';
import { STColumn, STData, STColumnButton, STChange } from '@delon/abc';
import { ModalHelper } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';
import { PrjDataService } from '../prj-data.service';

  @Component({
    selector: 'prj-cost',
    templateUrl: './project-cost.component.html'
  })
  export class PrjCostComponent implements OnInit {

     get data() {
    return this.prjDataService.projectDetail.projectCostListDto;
  }

    columns: STColumn[] = [
      { title: '标题', index: 'title' },
      { title: '费用', index: 'costAmount', type: 'currency' },
      { title: '是否已核对', index: 'isCheck', format: this.isCheckFormat},
      { title: '核对人', index: 'checkUser'},
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

    dataProcess(data: STData[]) {
    return data.map((i: STData, index: number) => {
      i.disabled = true;
      return i;
    });
  }

  isCheckFormat(cell: any, row: any){
      if (cell&&cell.checkUser){
        return '<span>是</span>';
      }

      return '<span>否</span>';
    }

}