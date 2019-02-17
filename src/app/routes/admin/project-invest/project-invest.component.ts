import { Component, OnInit, Input } from '@angular/core';
import { DynamicComponent } from '@shared/dynamic-component/dynamic.component';
import { ProjectInvestMainServiceProxy, 
EditProjectInvestMainInput,
CreateProjectInvestMainInput,
ProjectInvestPercentServiceProxy,
CreateProjectInvestPercentInput,
EditProjectInvestPercentInput, } from '@shared/service-proxies/service-proxies';
import { STColumn, STColumnButton, STChange } from '@delon/abc';
import { ModalHelper } from '@delon/theme';
import { EditPrjInvestComponent } from './edit-project-invest.component';
import { EditPrjInvestPCTComponent } from './edit-project-invest-pct.component';
import { Observable } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd';
import { filter } from 'rxjs/operators';

  @Component({
    selector: 'prj-invest',
    templateUrl: './project-invest.component.html',
    styleUrls  : [ './project-invest.component.less']
  })
  export class PrjInvestComponent implements OnInit {

    dataSet: any[] = [];
    loading = false;
    selectItem: any = null;

    dataSetPCT: any[] = [];
    loadingPCT = false;

    columns: STColumn[] = [
    { title: '选择', index: 'id', type: 'radio' },
    { title: '编码', index: 'code'},
    { title: '名称', index: 'name'},
    { title: '项目类型', index: 'projectType'},
    {
      title: '操作',
      buttons: <STColumnButton[]>[
      {
        text: '编辑',
        type: 'modal',
        component: EditPrjInvestComponent,
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

columnsPCT: STColumn[] = [
    { title: '编码', index: 'code'},
    { title: '名称', index: 'name'},
    { title: '百分比', index: 'percent'},
    { title: '项目策略主题', index: 'projectInvestMain'},
    { title: '项目角色类型', index: 'projectRoleType'},
    { title: '备注', index: 'remarks'},
    {
      title: '操作',
      buttons: <STColumnButton[]>[
      {
        text: '编辑',
        type: 'modal',
        component: EditPrjInvestPCTComponent,
        paramName: 'inputData',
        click: this.onSaveEditPCT.bind(this)
      },
      {
        text: '删除',
        type: 'del',
        click: this.onDeletePCT.bind(this)
      },
      ],
    },
    ];

    constructor(
      private modal: ModalHelper,
      public msg: NzMessageService,
      private prjInvestProxy: ProjectInvestMainServiceProxy,
      private prjInvestPCTProxy: ProjectInvestPercentServiceProxy
      ) {
    }

    ngOnInit() {
      this.getData();
    }

    private getData() {
      this.loading = true;
       this.prjInvestProxy.getProjectInvestMains()
      .subscribe(res=>{
        console.log(res);
        this.dataSet = res.items;
        //this.dataSet[0].checked = true;
      },
      error=>{console.log(error)},
      ()=>{ this.loading = false; });
    }

    private getPCTData() {
      this.loadingPCT = true;
       this.prjInvestPCTProxy.getProjectInvestPercents()
      .subscribe(res=>{
        console.log(res);
        this.dataSetPCT = [];
        this.dataSetPCT = res.items.filter(item=>item.projectInvestMainId==this.selectItem.id);
        console.log("dataSetPCT", this.dataSetPCT);
      },
      error=>{console.log(error)},
      ()=>{ this.loadingPCT = false; });
    }

    onSaveEdit(data: any) { 
     this.loading = true;
     const input:EditProjectInvestMainInput = new EditProjectInvestMainInput();
     input.id = data.id;
     input.code = data.code;
     input.name = data.name;
     input.changeReason = "change reason";
     input.projectTypeId = data.projectTypeId;
     this.prjInvestProxy.editProjectInvestMain(input)
     .subscribe(res=>{
       this.getData();
      },
      error=>{console.log(error)},
      ()=>{ this.loading = false; });
    }

    onDelete(data: any) {
     this.deleteProjectInvest(data);
    }

    onSaveEditPCT(data: any) { 
     this.loading = true;
     const input:EditProjectInvestPercentInput = new EditProjectInvestPercentInput();
     input.id = data.id;
     input.code = data.code;
     input.name = data.name;
     input.remarks = data.remarks;
     input.percent = data.percent;
     input.changeReason = "change reason";
     input.projectInvestMainId = data.projectInvestMainId;
     input.projectRoleTypeId = data.projectRoleTypeId;
     this.prjInvestPCTProxy.editProjectInvestPercent(input)
     .subscribe(res=>{
       this.getPCTData();
      },
      error=>{console.log(error)},
      ()=>{ this.loading = false; });
    }

    onDeletePCT(data: any) {
     this.deleteProjectInvestPCT(data);
    }

    addPCT() {
      if (!this.selectItem) {
        this.msg.warning('请选择一个投资策略主体！');
        return;
      }
      this.modal
      .static(EditPrjInvestPCTComponent, { inputData: {} })
      .subscribe((data) => {
        console.log(data);
        const input: CreateProjectInvestPercentInput = new CreateProjectInvestPercentInput();
        input.code = data.code;
        input.name = data.name;
        input.percent = data.percent;
        input.remarks = data.remarks;
        input.projectInvestMainId = this.selectItem.id;
        input.projectRoleTypeId = data.projectRoleTypeId;
        this.loadingPCT = true;
        this.prjInvestPCTProxy.createProjectInvestPercent(input)
        .subscribe((res:any)=>{
          this.getPCTData();
        },
        error=>{this.msg.error(error)},
        ()=>{ this.loadingPCT = false; });
      });
    }

    add() {
      this.modal
      .static(EditPrjInvestComponent, { inputData: {} })
      .subscribe((data) => {
        console.log(data);
        const input: CreateProjectInvestMainInput = new CreateProjectInvestMainInput();
        input.code = data.code;
        input.name = data.name;
        input.projectTypeId = data.projectTypeId;
        this.loading = true;
        this.prjInvestProxy.createProjectInvestMain(input)
        .subscribe((res:any)=>{
          this.getData();
        },
        error=>{this.msg.error(error)},
        ()=>{ this.loading = false; });
      });
    }

    private deleteProjectInvest(data: any){
    this.prjInvestProxy.deleteProjectInvestMain(data.id)
    .subscribe((res:any)=>{
      this.getData();
    },
    error=>{this.msg.error(error)},
    ()=>{this.loading = false;});
  }

  private deleteProjectInvestPCT(data: any){
    this.prjInvestPCTProxy.deleteProjectInvestPercent(data.id)
    .subscribe((res:any)=>{
      this.getPCTData();
    },
    error=>{this.msg.error(error)},
    ()=>{this.loading = false;});
  }

  change(ret: STChange) {
    // console.log('change', ret);
    if (ret.type==='radio') {
      if (ret.radio.checked) {
        this.selectItem = ret.radio;
        this.getPCTData();
      } else {
        this.selectItem = null;
        this.dataSetPCT = [];
      }
    }
  }
  rowClick(e: any) {
    //this.selectItem = e.item;
    // e.item.checked = !e.item.checked;
    // console.log('rowClick', e);
  }
}