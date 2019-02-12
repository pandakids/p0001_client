import { Component, OnInit, Input } from '@angular/core';
import { STColumn, STColumnButton, STChange } from '@delon/abc';
import { ModalHelper } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';
import { ProjectTaskDefectServiceProxy } from '@shared/service-proxies/service-proxies';


  @Component({
    selector: 'prj-defect',
    templateUrl: './project-defect.component.html'
  })
  export class PrjDefectComponent implements OnInit {

    @Input() prjId: string;
    s: any = {
      pi: 1,
      ps: 10,
    };
    query: any = {
      name: undefined,
      taskId:undefined,
      projectMainId:undefined,
      maxResultCount: this.s.ps,
      skipCount: 0,
    };
    totalCount: number = 0;
    loading = false;
    data: any[] = [];
  
    
  
      columns: STColumn[] = [
        { title: '名称', index: 'name'},
        { title: '工分', index: 'gongfen', type:'number'},
        // { title: 'projectMain', index: 'projectMain'},
        // { title: 'projectRequirement', index: 'projectRequirement'},
        // { title: 'projectTask', index: 'projectTask'},
        // { title: 'projectModule', index: 'projectModule'},
        { title: 'owner', index: 'owner'},
        { title: 'remarks', index: 'remarks'},
      ];
  
      constructor(
        private modal: ModalHelper,
        public msg: NzMessageService,
        private projectTaskDefectServiceProxy: ProjectTaskDefectServiceProxy
        ) {
      }
  
      ngOnInit() {
      }
  
      initData(){
        this.query.projectMainId = this.prjId;
        this.loading = true;
        this.projectTaskDefectServiceProxy.getProjectTaskDefectsWithPaging(this.query.name, this.query.projectTaskStatusId,this.query.projectMainId,this.query.maxResultCount, this.query.skipCount)
        .subscribe(resp => {
          this.data = resp.items;
          this.totalCount = resp.totalCount;
          this.loading = false;
        });
      }
  
    change(event){
      console.log(event);
      if(event&&event.type=='pi'){
        this.query.skipCount = (event.pi-1)*this.s.ps;
        this.initData();
      }
    }
}