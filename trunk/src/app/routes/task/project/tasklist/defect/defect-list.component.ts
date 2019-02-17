import { Component, OnInit, Input } from '@angular/core';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { ProjectTaskDefectServiceProxy,CreateProjectTaskDefectInput,EditProjectTaskDefectInput } from '@shared/service-proxies/service-proxies';
import {  ModalHelper } from '@delon/theme';
import { EditTaskDefectComponent } from './edit-task-defect.component';
@Component({
  selector: 'defect-list',
  templateUrl: './defect-list.component.html',
  styleUrls: ['./defect-list.component.less'],
})
export class DefectListComponent implements OnInit {
  @Input() inputPara: any;

  query: any = {
    name: undefined,
    taskId: undefined,
    projectMainId:undefined,
    maxResultCount: 15,
    skipCount: 0,
  };
  totalCount: number = 0;

  q: any = {
    status: 'all',
  };
  loading = false;
  data: any[] = [];

  constructor(private http: _HttpClient, 
    public msg: NzMessageService,
    private projectTaskDefectServiceProxy: ProjectTaskDefectServiceProxy,
    private modal: ModalHelper) {}

  ngOnInit() {
    this.query.taskId = this.inputPara.id;
    this.query.projectMainId = this.inputPara.projectMainId;
    this.getData();
    console.log(this.inputPara);
  }

  getData() {
    this.loading = true;
    this.projectTaskDefectServiceProxy.getProjectTaskDefectsWithPaging(this.query.name, this.query.taskId, this.query.projectMainId,this.query.maxResultCount, this.query.skipCount)
      .subscribe(resp => {
        this.data = resp.items;
        this.totalCount = resp.totalCount;
        this.loading = false;
      });
  }

  addDefect(){
    let para = {
      type: 1,
      data: {}
    }
    this.modal
          .static(EditTaskDefectComponent, {inputPara: para})
          .subscribe((resp) => {
            if(resp){
              const input:CreateProjectTaskDefectInput = new CreateProjectTaskDefectInput();
              input.name = resp.name;
              input.remarks = resp.remarks;
              input.gongfen = resp.gongfen;
              input.projectMainId = this.inputPara.projectMainId;
              input.projectModuleId = this.inputPara.projectModuleId;
              input.projectRequirementId = this.inputPara.projectRequirementId;
              input.projectTaskId = this.inputPara.id;
              input.ownerId = this.inputPara.ownerId;
              this.projectTaskDefectServiceProxy.createProjectTaskDefect(input)
              .subscribe(res=>{
                this.getData();
              });
            }
          });
  }

    onChangePage(page: number): void{
      if(page > 1){
        this.query.skipCount = (page - 1) * 15;
      }
    this.getData();
  }

  eidt(defect:any){
    let para = {
      type: 1,
      data: defect
    }
     this.modal
          .static(EditTaskDefectComponent, {inputPara: para})
          .subscribe((resp) => {
            if(resp){
              const input:EditProjectTaskDefectInput = new EditProjectTaskDefectInput();
              input.id = defect.id;
              input.name = resp.name;
              input.remarks = resp.remarks;
              input.gongfen = resp.gongfen;
              input.changeReason='';
              input.projectMainId = defect.projectMainId;
              input.projectModuleId = defect.projectModuleId;
              input.projectRequirementId = defect.projectRequirementId;
              input.projectTaskId = defect.projectTaskId;
              input.ownerId = defect.ownerId;
              this.projectTaskDefectServiceProxy.editProjectTaskDefect(input)
              .subscribe(res=>{
                this.getData();
              });
            }
          });
  }
  
  deleteDefect(id:number){

    this.projectTaskDefectServiceProxy.deleteProjectTaskDefect(id)
    .subscribe(()=>{
      this.getData();
    });

  }
}
