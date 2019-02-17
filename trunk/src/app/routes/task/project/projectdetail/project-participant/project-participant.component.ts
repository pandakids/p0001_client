import { Component, OnInit, Input } from '@angular/core';
import { DynamicComponent } from '@shared/dynamic-component/dynamic.component';
import { STColumn, STColumnButton, STChange } from '@delon/abc';
import { ModalHelper } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';
import { PrjDataService } from '../prj-data.service';
  @Component({
    selector: 'prj-participant',
    templateUrl: './project-participant.component.html'
  })
  export class PrjParticipantComponent implements OnInit {

    loading = false;
     get data() {
    return this.prjDataService.projectDetail.projectMainRoleListDto;
  }

    columns: STColumn[] = [
    { title: '参与者名称', index: 'partnerName' },
    { title: '名称', index: 'name' },
    { title: '项目角色', index: 'projectRoleName' },
    { title: 'remarks', index: 'remarks' },
    ];

    constructor(
      private modal: ModalHelper,
      private prjDataService:PrjDataService,
      public msg: NzMessageService,
      ) {
    }
;
    ngOnInit() {
      this.getData();
    }

    private getData() {
      // this.loading = true;
      //  this.prjInvestProxy.getProjectInvestMains()
      // .subscribe(res=>{
      //   console.log(res);
      //   this.dataSet = res.items;
      //   //this.dataSet[0].checked = true;
      // },
      // error=>{console.log(error)},
      // ()=>{ this.loading = false; });
    }

    onSaveEdit(data: any) { 
     // this.loading = true;
     // const input:EditProjectInvestMainInput = new EditProjectInvestMainInput();
     // input.id = data.id;
     // input.code = data.code;
     // input.name = data.name;
     // input.changeReason = "change reason";
     // input.projectTypeId = data.projectTypeId;
     // this.prjInvestProxy.editProjectInvestMain(input)
     // .subscribe(res=>{
     //   this.getData();
     //  },
     //  error=>{console.log(error)},
     //  ()=>{ this.loading = false; });
    }

    onDelete(data: any) {
     //this.deleteProjectInvest(data);
    }

    add() {
      // this.modal
      // .static(EditPrjInvestComponent, { inputData: {} })
      // .subscribe((data) => {
      //   console.log(data);
      //   const input: CreateProjectInvestMainInput = new CreateProjectInvestMainInput();
      //   input.code = data.code;
      //   input.name = data.name;
      //   input.projectTypeId = data.projectTypeId;
      //   this.loading = true;
      //   this.prjInvestProxy.createProjectInvestMain(input)
      //   .subscribe((res:any)=>{
      //     this.getData();
      //   },
      //   error=>{this.msg.error(error)},
      //   ()=>{ this.loading = false; });
      // });
    }

    private deleteProjectInvest(data: any){
    // this.prjInvestProxy.deleteProjectInvestMain(data.id)
    // .subscribe((res:any)=>{
    //   this.getData();
    // },
    // error=>{this.msg.error(error)},
    // ()=>{this.loading = false;});
  }
}