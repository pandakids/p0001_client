import { Component, OnInit, Input } from '@angular/core';
import { DynamicComponent } from '@shared/dynamic-component/dynamic.component';
import { STColumn, STColumnButton, STChange } from '@delon/abc';
import { ModalHelper } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';
import { PrjDataService } from '../prj-data.service';

  @Component({
    selector: 'prj-service-address',
    templateUrl: './project-service-address.component.html'
  })
  export class PrjServiceAddressComponent implements OnInit {

     get data() {
    return this.prjDataService.projectDetail.projectServiceAddressListDto;
  }

    columns: STColumn[] = [
      { title: '地址', index: 'address' },
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