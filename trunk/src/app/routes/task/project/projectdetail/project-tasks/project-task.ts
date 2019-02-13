import { Component, OnInit, Input } from '@angular/core';
import { DynamicComponent } from '@shared/dynamic-component/dynamic.component';
import { STColumn, STColumnButton, STChange } from '@delon/abc';
import { ModalHelper } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';
import { PrjDataService } from '../prj-data.service';
import { ProjectTaskServiceProxy } from '@shared/service-proxies/service-proxies';
import { DefectListComponent } from '../../tasklist/defect/defect-list.component';

  @Component({
    selector: 'prj-task',
    templateUrl: './project-task.component.html'
  })
  export class PrjTaskComponent implements OnInit {

  @Input() prjId: string;
  s: any = {
    pi: 1,
    ps: 10,
  };
  query: any = {
    name: undefined,
    projectTaskStatusId:undefined,
    projectMainId:undefined,
    maxResultCount: this.s.ps,
    skipCount: 0,
  };
  totalCount: number = 0;
  loading = false;
  data: any[] = [];

  

    columns: STColumn[] = [
      { title: '编号', index: 'code', fixed: 'left' , width: '100px'},
      { title: '名称', index: 'name', fixed: 'left' , width: '300px'},
      { title: '是否完成', index: 'isDone'},
      { title: '工分', index: 'gongfen', type:'number'},
      { title: '预计完成时间', index: 'planFinishTime', type:'date',dateFormat:'YYYY-MM-DD'},
      { title: '完成时间', index: 'finishedTime', type:'date',dateFormat:'YYYY-MM-DD' },
      { title: 'sendTime', index: 'sendTime', type:'date',dateFormat:'YYYY-MM-DD' },
      { title: 'isFix', index: 'isFix'},
      { title: 'fixUnitRate', index: 'fixUnitRate', type:'number'},
      { title: 'projectRequirement', index: 'projectRequirement'},
      { title: 'projectTaskStatus', index: 'projectTaskStatus'},
      { title: 'projectName', index: 'projectName'},
      { title: 'projectVersion', index: 'projectVersion'},
      { title: 'projectModule', index: 'projectModule'},
      { title: 'owner', index: 'owner'},
      { title: 'helper', index: 'helper'},
      {
        title: '操作',
        buttons: <STColumnButton[]>[
        {
          text: 'Defects',
          type: 'modal',
          component: DefectListComponent,
          paramName: 'inputPara',
          //click: this.onSaveEdit.bind(this)
        }
        ],
      }
    ];

    constructor(
      private modal: ModalHelper,
      public msg: NzMessageService,
      private prjDataService:PrjDataService,
      private projectTaskServiceProxy: ProjectTaskServiceProxy
      ) {
    }

    ngOnInit() {
    }

    initData(){
      this.query.projectMainId = this.prjId;
      this.loading = true;
      this.projectTaskServiceProxy.getAllProjectTasksWithPaging(this.query.name, this.query.projectTaskStatusId,this.query.projectMainId,this.query.maxResultCount, this.query.skipCount)
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