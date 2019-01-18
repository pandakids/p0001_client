import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ProjectMainServiceProxy,
  EditProjectMainInput,ProjectMainListDto } from '@shared/service-proxies/service-proxies';
@Component({
  selector: 'app-admin-project-edit',
  templateUrl: './edit.component.html',
})
export class ProjectEditComponent implements OnInit {
  i: any;
  cat: string[] = ['美食', '美食,粤菜', '美食,粤菜,湛江菜'];
  form: FormGroup;
  fomrmat = "yyyy-MM-dd";
  constructor(
    private modal: NzModalRef,
    public msgSrv: NzMessageService,
    public http: _HttpClient,
    private fb: FormBuilder,
    private proxy: ProjectMainServiceProxy
  ) {}

  onChange(result: Date):void{
    this.i.startTime._i = result.toISOString().substring(0, 19).replace('T', ' ');
  }
  onChange1(result: Date):void{
    this.i.endTime._i = result.toISOString().substring(0, 19).replace('T', ' ');
  }
  onChange2(result: Date):void{
    this.i.planEndTime._i = result.toISOString().substring(0, 19).replace('T', ' ');
  }

  ngOnInit() {
    if(this.i.id==0)
      this.i = {id:0,code:'',name:'',projectStatusId:null,projectTypeId:null,projectStageId:null,
        projectInvestMainId:null,gongfen:null,gongfenEachDefect:null,gongfenEachReq:null,startTime:{_i:null}
        ,endTime:{_i:null},planEndTime:{_i:null},remarks:null};
  }
  getStatusId(projectStatusId:number){
     this.i.projectStatusId = projectStatusId;
  }
  getTypeId(projectTypeId:number){
    this.i.projectTypeId = projectTypeId;
  }
  getStageId(projectStatusId:number){
    this.i.projectStageId = projectStatusId;
  }
  getInvestMainId(projectInvestMainId:number){
    this.i.projectInvestMainId = projectInvestMainId;
  }
  save() {
    if(this.i.id>0){
      this.proxy.editProjectMain(this.i)
        .subscribe((data:EditProjectMainInput)=> {
          this.msgSrv.success('修改成功');
          this.modal.close(true);
      });
    }
    else{
      this.i.startTime = this.i.startTime._i;
      this.i.endTime = this.i.endTime._i;
      this.i.planEndTime = this.i.planEndTime._i;
      this.proxy.createProjectMain(this.i)
        .subscribe((data:ProjectMainListDto)=> {
          this.msgSrv.success('添加成功');
          this.modal.close(true);
        });
    }
  }

  close() {
    this.modal.destroy();
  }
}
