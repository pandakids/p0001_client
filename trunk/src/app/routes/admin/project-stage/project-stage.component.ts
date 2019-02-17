import { Component, OnInit, Input } from '@angular/core';
import { DynamicComponent } from '@shared/dynamic-component/dynamic.component';
import { ProjectStageServiceProxy, ProjectStageTypeServiceProxy
,ListResultDtoOfProjectStageTypeListDto
,ListResultDtoOfProjectStageListDto
,EditProjectStageInput} from '@shared/service-proxies/service-proxies';
import { STColumn, STColumnButton } from '@delon/abc';
import { ModalHelper } from '@delon/theme';
import { EditPrjStageComponent } from './edit-project-stage.component';
import { Observable } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd';
import { forkJoin } from 'rxjs/observable/forkJoin';

  @Component({
    selector: 'prj-stage',
    templateUrl: './project-stage.component.html',
    styleUrls  : [ './project-stage.component.less']
  })
  export class PrjStageComponent implements OnInit {

    dataSet: any[] = [];
    loading = false;

    columns: STColumn[] = [
    { title: '编码', index: 'code'},
    { title: '名称', index: 'name'},
    { title: '阶段类型', index: 'type.name'},
    {
      title: '操作',
      buttons: <STColumnButton[]>[
      {
        text: '编辑',
        type: 'modal',
        component: EditPrjStageComponent,
        paramName: 'inputData',
        click: this.onSaveEdit.bind(this)
      },
      {
        text: '删除',
        type: 'del',
        click: this.onDelete.bind(this)
      },
      ],
    },
    ];

    constructor(
      private modal: ModalHelper,
      public msg: NzMessageService,
      private prjStageProxy: ProjectStageServiceProxy,
      private prjStageTypeServiceProxy: ProjectStageTypeServiceProxy,
      ) {
    }

    ngOnInit() {
      this.getData();
    }

    private getData() {
      forkJoin(
        this.prjStageProxy.getProjectStages(),
        this.prjStageTypeServiceProxy.getProjectStageTypes()
        )
      .subscribe(([res1, res2])=>{
        const that = this;
        const list: any [] = [];
        res1.items.forEach(function (element, index, array) {
        const item: any = element;
        item.type = res2.items.find((d) => (d.id == element.projectStageTypeId))
        // item.type = {name:'test'};
        list.push(item);
        });

        that.dataSet = list;
      },
      error=>{console.log(error)},
      ()=>{ this.loading = false; });
    }

    onSaveEdit(data: any) { 
     this.loading = true;
     EditProjectStageInput
     const input:EditProjectStageInput = data;
     input.projectStageTypeId = data.type.id;
     this.prjStageProxy.editProjectStage(input)
     .subscribe(res=>{
       this.getData();
      },
      error=>{console.log(error)},
      ()=>{ this.loading = false; });
    }

    onDelete(data: any) {
     this.deleteProjectStage(data);
    }

    add() {
      this.modal
      .static(EditPrjStageComponent, { inputData: {} })
      .subscribe((data) => {
        console.log(data);
        data.projectStageTypeId = data.type.id;
        this.loading = true;
        this.prjStageProxy.createProjectStage(data)
        .subscribe((res:any)=>{
          this.getData();
        },
        error=>{this.msg.error(error)},
        ()=>{ this.loading = false; });
      });
    }

    private deleteProjectStage(data: any){
    this.prjStageProxy.deleteProjectStage(data.id)
    .subscribe((res:any)=>{
      this.getData();
    },
    error=>{this.msg.error(error)},
    ()=>{this.loading = false;});
  }
}