import { Component, OnInit, Input } from '@angular/core';
import { DynamicComponent } from '@shared/dynamic-component/dynamic.component';
import { STColumn, STColumnButton, STChange } from '@delon/abc';
import { ModalHelper } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';
import { ProjectRequirementServiceProxy } from '@shared/service-proxies/service-proxies';


  @Component({
    selector: 'prj-req',
    templateUrl: './project-req.component.html'
  })
  export class PrjReqComponent implements OnInit {

    @Input() inputData: any;
    loading = false;
    data: any[] = [];
  
      columns: STColumn[] = [
        { title: '名称', index: 'name'},
        { title: 'projectName', index: 'projectName'},
        { title: 'remarks', index: 'remarks'},
      ];
  
      constructor(
        private modal: ModalHelper,
        public msg: NzMessageService,
        private projectRequirementServiceProxy: ProjectRequirementServiceProxy
        ) {
      }
  
      ngOnInit() {
        this.initData();
      }
  
      initData(){
        this.loading = true;
        this.projectRequirementServiceProxy.getProjectRequirements(Number(this.inputData.id))
        .subscribe(resp => {
          this.data = resp.items;
          this.loading = false;
        });
      }
  
}