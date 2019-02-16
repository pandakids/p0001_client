import { Component, OnInit, Input } from '@angular/core';
import { DynamicComponent } from '@shared/dynamic-component/dynamic.component';
import { STColumn, STColumnButton, STChange } from '@delon/abc';
import { ModalHelper } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';
import { ProjectRequirementServiceProxy, CreateProjectReqInput, EditProjectReqInput } from '@shared/service-proxies/service-proxies';
import { CreatePrjReqComponent } from './create-prj-req.component';

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
        {
          title: '操作',
          fixed: 'right' , width: '150px',
          buttons:[
          {
            text: `编辑`,
            click: this.edit.bind(this)
          },
          {
            text: `删除`,
            click: this.delete.bind(this)
          },
          ],
        }
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

      add(){
        const para = {
          type:0,
          data:{},
          projectMainId:this.inputData.projectMainId
        }
        this.modal
      .static(CreatePrjReqComponent, { inputPara: para })
      .subscribe((data) => {
        console.log(data);
        const input: CreateProjectReqInput = new CreateProjectReqInput();
        input.name = data.name;
        input.projectModuleId = this.inputData.id;
        input.projectReqTypeId = data.projectReqTypeId;
        input.projectVersionId = data.projectVersionId;
        input.remarks = data.remarks;
        this.loading = true;
        this.projectRequirementServiceProxy.createProjectRequirement(input)
        .subscribe((res:any)=>{
          this.initData();
        },
        error=>{this.msg.error(error)},
        ()=>{ this.loading = false; });
      });
      }

      edit(record){
        const para = {
          type:1,
          data:record,
          projectMainId:this.inputData.projectMainId
        }
        this.modal
        .static(CreatePrjReqComponent, { inputPara: para })
        .subscribe((data) => {
          console.log(data);
          const input: EditProjectReqInput = new EditProjectReqInput();
          input.id = record.id;
          input.name = data.name;
          input.projectModuleId = this.inputData.id;
          input.projectReqTypeId = data.projectReqTypeId;
          input.projectVersionId = data.projectVersionId;
          input.remarks = data.remarks;
          this.loading = true;
          this.projectRequirementServiceProxy.editProjectRequirement(input)
          .subscribe((res:any)=>{
            this.initData();
          },
          error=>{this.msg.error(error)},
          ()=>{ this.loading = false; });
        });
      }
      
      delete(record){
        this.projectRequirementServiceProxy.deleteProjectRequirement(record.id)
          .subscribe((res:any)=>{
            this.initData();
          },
          error=>{this.msg.error(error)},
          ()=>{ this.loading = false; });
      }
  
}