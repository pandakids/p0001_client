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
      { title: '编号', index: 'code', fixed: 'left' , width: '70px'},
      { title: '名称', index: 'name', fixed: 'left' , width: '150px'},
      { title: '是否完成', index: 'isDone'},
      { title: '工分', index: 'gongfen', type:'number', width: '70px'},
      { title: '执行人', index: 'owner', width: '100px'},
      { title: '预计完成时间', index: 'planFinishTime', type:'date',dateFormat:'YYYY-MM-DD', width: '100px'},
      { title: '完成时间', index: 'finishedTime', type:'date',dateFormat:'YYYY-MM-DD', width: '100px'},
      { title: '发送时间', index: 'sendTime', type:'date',dateFormat:'YYYY-MM-DD', width: '100px'},
      { title: '定额', index: 'isFix', width: '100px'},
      { title: '定额价格', index: 'fixUnitRate', type:'number', width: '100px'},
      { title: '需求', index: 'projectRequirement', width: '100px'},
      { title: '任务状态', index: 'projectTaskStatus', width: '100px'},
      { title: '项目名称', index: 'projectName', width: '100px'},
      { title: '版本', index: 'projectVersion', width: '100px'},
      { title: '模块', index: 'projectModule', width: '100px'},
      { title: '协助人', index: 'helper', width: '100px'},
      {
        title: '操作',
        fixed: 'right' , width: '100px',
        buttons: <STColumnButton[]>[
        {
          text: 'BUGs',
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