import { Component, OnInit, Input } from '@angular/core';
import { DynamicComponent } from '@shared/dynamic-component/dynamic.component';
import { ProjectTaskStatusServiceProxy, EditProjectTaskStatusInput,
  ProjectReqTypeServiceProxy, EditProjectReqTypeInput,
  ProjectRoleTypeServiceProxy, EditProjectRoleTypeInput,
  ProjectStageTypeServiceProxy, EditProjectStageTypeInput,
  ProjectTypeServiceProxy, EditProjectTypeInput,
  ProjectStatusServiceProxy, EditProjectStatusInput, ProjectServiceAddressTypeServiceProxy, EditProjectServiceAddressTypeInput } from '@shared/service-proxies/service-proxies';
  import { STColumn, STColumnButton } from '@delon/abc';
  import { ModalHelper } from '@delon/theme';
  import { EditPrjTaskStatusComponent } from './edit-prj-task-status.component';
  import { Observable } from 'rxjs';
  import { NzMessageService } from 'ng-zorro-antd';

  @Component({
    selector: 'prj-task-status',
    templateUrl: './prj-task-status.component.html',
    styleUrls  : [ './prj-task-status.component.less']
  })
  export class PrjTaskStatusComponent implements DynamicComponent, OnInit {

    @Input() inputData: any;
    dataSet: any[] = [];
    loading = false;

    columns: STColumn[] = [
    { title: '编码', index: 'code'},
    { title: '名称', index: 'name'},
    { title: '备注', index: 'remarks'},
    {
      title: '操作',
      buttons: <STColumnButton[]>[
      {
        text: '编辑',
        type: 'modal',
        component: EditPrjTaskStatusComponent,
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
      private prjTaskStatusProxy: ProjectTaskStatusServiceProxy,
      private prjReqTypeServiceProxy: ProjectReqTypeServiceProxy,
      private prjRoleTypeServiceProxy: ProjectRoleTypeServiceProxy,
      private prjStageTypeServiceProxy: ProjectStageTypeServiceProxy,
      private prjTypeProxy: ProjectTypeServiceProxy,
      private prjStatusProxy: ProjectStatusServiceProxy,
      private prjAddressTypeProxy: ProjectServiceAddressTypeServiceProxy) {
    }

    ngOnInit() {
      this.getData();
    }

    private getData() {
      if (this.inputData.type==0) {
        this.getPrjData();
      }else if (this.inputData.type==1) {
        this.getPrjReqTypeData();
      }
      else if (this.inputData.type==2) {
        this.getPrjRoleTypeData();
      }
      else if (this.inputData.type==3) {
        this.getPrjStageTypeData();
      }
      else if (this.inputData.type==4) {
        this.getPrjTypeData();
      } else if (this.inputData.type==5) {
        this.getProjectStatuss();
      }
      else if (this.inputData.type==6) {
        this.getProjectAddressType();
      }

    }

    onSaveEdit(data: any) { 
      if (this.inputData.type==0) {
        this.editPrjTaskStatus(data);
      }else if (this.inputData.type==1) {
        this.editProjectReqType(data);
      }
      else if (this.inputData.type==2) {
        this.editProjectRoleType(data);
      }
      else if (this.inputData.type==3) {
        this.editProjectStageType(data);
      }
      else if (this.inputData.type==4) {
        this.editProjectType(data);
      }
       else if (this.inputData.type==5) {
        this.editProjectStatus(data);
      }
      else if (this.inputData.type==6) {
        this.editProjectAddressType(data);
      }
    }

    onDelete(data: any) {
      if (this.inputData.type==0) {
        this.deletePrjTaskStatus(data);
      }else if (this.inputData.type==1) {
        this.deleteProjectReqType(data);
      }
      else if (this.inputData.type==2) {
        this.deleteProjectRoleType(data);
      }
      else if (this.inputData.type==3) {
        this.deleteProjectStageType(data);
      }
      else if (this.inputData.type==4) {
        this.deleteProjectType(data);
      }
      else if (this.inputData.type==5) {
        this.deleteProjectStatus(data);
      }
      else if (this.inputData.type==6) {
        this.deleteProjectAddressType(data);
      }
    }

    add() {
      this.modal
      .static(EditPrjTaskStatusComponent, { inputData: { name:'', code:'' } })
      .subscribe((data) => {
        if (data) {
          if (this.inputData.type==0) {
            this.addPrjTaskStatus(data);
          }else if (this.inputData.type==1) {
            this.addPrjReqType(data);
          }
          else if (this.inputData.type==2) {
            this.addPrjRoleType(data);
          }
          else if (this.inputData.type==3) {
            this.addPrjStageType(data);
          }
          else if (this.inputData.type==4) {
            this.addPrjType(data);
          }
          else if (this.inputData.type==5) {
            this.createProjectStatus(data);
          }
          else if (this.inputData.type==6) {
            this.createProjectAddressType(data);
          }
        }
      });
    }

    private getPrjData() {
      this.loading = true;
      this.prjTaskStatusProxy.getProjectTaskStatuss().
      subscribe((res:any)=>{
        this.dataSet = res.items;
      },
      error=>{console.log(error)},
      ()=>{ this.loading = false; });
    }

    private getPrjReqTypeData() {
      this.loading = true;
      this.prjReqTypeServiceProxy.getProjectReqTypes().
      subscribe((res:any)=>{
        this.dataSet = res.items;
      },
      error=>{console.log(error)},
      ()=>{ this.loading = false; });
    }

    private getPrjRoleTypeData() {
      this.loading = true;
      this.prjRoleTypeServiceProxy.getProjectRoleTypes().
      subscribe((res:any)=>{
        this.dataSet = res.items;
      },
      error=>{console.log(error)},
      ()=>{ this.loading = false; });
    }

    private getPrjStageTypeData() {
      this.loading = true;
      this.prjStageTypeServiceProxy.getProjectStageTypes().
      subscribe((res:any)=>{
        this.dataSet = res.items;
      },
      error=>{console.log(error)},
      ()=>{ this.loading = false; });
    }

    private getPrjTypeData() {
      this.loading = true;
      this.prjTypeProxy.getProjectTypes().
      subscribe((res:any)=>{
        this.dataSet = res.items;
      },
      error=>{console.log(error)},
      ()=>{ this.loading = false; });
    }

    private getProjectStatuss() {
      this.loading = true;
      this.loading = true;
      this.prjStatusProxy.getProjectStatuss().
      subscribe((res:any)=>{
        this.dataSet = res.items;
      },
      error=>{console.log(error)},
      ()=>{ this.loading = false; });
    }

    private getProjectAddressType() {
      this.loading = true;
      this.loading = true;
      this.prjAddressTypeProxy.getProjectServiceAddressTypes().
      subscribe((res:any)=>{
        this.dataSet = res.items;
      },
      error=>{console.log(error)},
      ()=>{ this.loading = false; });
    }


    private addPrjTaskStatus(data: any){
      this.loading = true;
      this.prjTaskStatusProxy.createProjectTaskStatus(data)
      .subscribe((res:any)=>{
        this.getData();
      },
      error=>{this.msg.error(error)},
      ()=>{ this.loading = false; });
    }

    private addPrjReqType(data: any){
      this.loading = true;
      this.prjReqTypeServiceProxy.createProjectReqType(data)
      .subscribe((res:any)=>{
        this.getData();
      },
      error=>{this.msg.error(error)},
      ()=>{ this.loading = false; });
    }

    private addPrjRoleType(data: any){
      this.loading = true;
      this.prjRoleTypeServiceProxy.createProjectRoleType(data)
      .subscribe((res:any)=>{
        this.getData();
      },
      error=>{this.msg.error(error)},
      ()=>{ this.loading = false; });
    }

    private addPrjStageType(data: any){
      this.loading = true;
      this.prjStageTypeServiceProxy.createProjectStageType(data)
      .subscribe((res:any)=>{
        this.getData();
      },
      error=>{this.msg.error(error)},
      ()=>{ this.loading = false; });
    }

    private addPrjType(data: any){
      this.loading = true;
      this.prjTypeProxy.createProjectType(data)
      .subscribe((res:any)=>{
        this.getData();
      },
      error=>{this.msg.error(error)},
      ()=>{ this.loading = false; });
    }

    private createProjectStatus(data: any){
      this.loading = true;
      this.prjStatusProxy.createProjectStatus(data)
      .subscribe((res:any)=>{
        this.getData();
      },
      error=>{this.msg.error(error)},
      ()=>{ this.loading = false; });
    }

    private createProjectAddressType(data: any){
      this.loading = true;
      this.prjAddressTypeProxy.createProjectServiceAddressType(data)
      .subscribe((res:any)=>{
        this.getData();
      },
      error=>{this.msg.error(error)},
      ()=>{ this.loading = false; });
    }

    private editPrjTaskStatus(data: any){
      this.loading = true;
      this.loading = true;
      let input = new EditProjectTaskStatusInput();
      input.id = data.id;
      input.changeReason = "string";
      input.code = data.code;
      input.name = data.name;
      input.remarks = data.remarks;
      this.prjTaskStatusProxy.editProjectTaskStatus(input)
      .subscribe((res:any)=>{
        this.getData();
      },
      error=>{this.msg.error(error)},
      ()=>{ this.loading = false; });
    }

    private editProjectAddressType(data: any){
      this.loading = true;
      this.loading = true;
      let input = new EditProjectServiceAddressTypeInput();
      input.id = data.id;
      input.changeReason = "string";
      input.code = data.code;
      input.name = data.name;
      input.remarks = data.remarks;
      this.prjAddressTypeProxy.editProjectServiceAddressType(input)
      .subscribe((res:any)=>{
        this.getData();
      },
      error=>{this.msg.error(error)},
      ()=>{ this.loading = false; });
    }

    private editProjectReqType(data: any){
     this.loading = true;
    let input = new EditProjectReqTypeInput();
    input.id = data.id;
    input.changeReason = "string";
    input.code = data.code;
    input.name = data.name;
    input.remarks = data.remarks;
    this.prjReqTypeServiceProxy.editProjectReqType(input)
    .subscribe((res:any)=>{
      this.getData();
    },
    error=>{this.msg.error(error)},
    ()=>{ this.loading = false; });
  }

  private editProjectRoleType(data: any){
    this.loading = true;
    let input = new EditProjectRoleTypeInput();
    input.id = data.id;
    input.changeReason = "string";
    input.code = data.code;
    input.name = data.name;
    input.remarks = data.remarks;
    this.prjRoleTypeServiceProxy.editProjectRoleType(input)
    .subscribe((res:any)=>{
      this.getData();
    },
    error=>{this.msg.error(error)},
    ()=>{ this.loading = false; });
  }

  private editProjectStageType(data: any){
    this.loading = true;
    let input = new EditProjectStageTypeInput();
    input.id = data.id;
    input.changeReason = "string";
    input.code = data.code;
    input.name = data.name;
    input.remarks = data.remarks;
    this.prjStageTypeServiceProxy.editProjectStageType(input)
    .subscribe((res:any)=>{
      this.getData();
    },
    error=>{this.msg.error(error)},
    ()=>{ this.loading = false; });
  }

  private editProjectType(data: any){
    this.loading = true;
    let input = new EditProjectTypeInput();
    input.id = data.id;
    input.changeReason = "string";
    input.code = data.code;
    input.name = data.name;
    input.remarks = data.remarks;
    this.prjTypeProxy.editProjectType(input)
    .subscribe((res:any)=>{
      this.getData();
    },
    error=>{this.msg.error(error)},
    ()=>{ this.loading = false; });
  }

 private editProjectStatus(data: any){
   this.loading = true;
    let input = new EditProjectStatusInput();
    input.id = data.id;
    input.changeReason = "string";
    input.code = data.code;
    input.name = data.name;
    input.remarks = data.remarks;
    this.prjStatusProxy.editProjectStatus(input)
    .subscribe((res:any)=>{
      this.getData();
    },
    error=>{this.msg.error(error)},
    ()=>{ this.loading = false; });
  }

  private deletePrjTaskStatus(data: any) {
    this.loading = true;
    this.prjTaskStatusProxy.deleteProjectTaskStatus(data.id)
    .subscribe((res:any)=>{
      this.getData();
    },
    error=>{this.msg.error(error)},
    ()=>{this.loading = false;});
  }

  private deleteProjectReqType(data: any) {
    this.loading = true;
    this.prjReqTypeServiceProxy.deleteProjectReqType(data.id)
    .subscribe((res:any)=>{
      this.getData();
    },
    error=>{this.msg.error(error)},
    ()=>{this.loading = false;});
  }

  private deleteProjectRoleType(data: any) {
    this.loading = true;
    this.prjRoleTypeServiceProxy.deleteProjectRoleType(data.id)
    .subscribe((res:any)=>{
      this.getData();
    },
    error=>{this.msg.error(error)},
    ()=>{false});
  }

  private deleteProjectStageType(data: any) {
    this.prjStageTypeServiceProxy.deleteProjectStageType(data.id)
    .subscribe((res:any)=>{
      this.getData();
    },
    error=>{this.msg.error(error)},
    ()=>{});
  }

  private deleteProjectType(data: any) {
    this.loading = true;
    this.prjTypeProxy.deleteProjectType(data.id)
    .subscribe((res:any)=>{
      this.getData();
    },
    error=>{this.msg.error(error)},
    ()=>{this.loading = false;});
  }

  private deleteProjectStatus(data: any) {
    this.loading = true;
    this.prjStatusProxy.deleteProjectStatus(data.id)
    .subscribe((res:any)=>{
      this.getData();
    },
    error=>{this.msg.error(error)},
    ()=>{this.loading = false;});
  }

  private deleteProjectAddressType(data: any) {
    this.loading = true;
    this.prjAddressTypeProxy.deleteProjectServiceAddressType(data.id)
    .subscribe((res:any)=>{
      this.getData();
    },
    error=>{this.msg.error(error)},
    ()=>{this.loading = false;});
  }

}