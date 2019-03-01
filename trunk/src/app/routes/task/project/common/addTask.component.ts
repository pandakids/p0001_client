import { Component, OnInit, Input,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { ProjectVersionServiceProxy,
ProjectModuleServiceProxy,
ProjectTaskServiceProxy,CreateProjectTaskInput,
 } from '@shared/service-proxies/service-proxies';
import { ReqLookupComponent } from './reqLookup.component';

@Component({
  selector: 'addTask',
  templateUrl: './addTask.component.html'
})
export class addTaskComponent implements OnInit {
  @Input() inputPara: any;
  taskForm: FormGroup;
  prjVersions: any [] = [];
  tasks: any [] = [];
  prjModules: any [] = [];
  isLoading = false;
  @ViewChild('prjReqLookup') prjReqLookup: ReqLookupComponent;

   get projectModuleId() { return this.taskForm.get('projectModuleId'); }
   get name() { return this.taskForm.get('name'); }
   get code() { return this.taskForm.get('code'); }
   get parentProjectTaskId() { return this.taskForm.get('parentProjectTaskId'); }
   get gongfen() { return this.taskForm.get('gongfen'); }
   get isFix() { return this.taskForm.get('isFix'); }
   get remarks() { return this.taskForm.get('remarks'); }
   get projectVersionId() { return this.taskForm.get('projectVersionId'); }
   get projectRequirementId() { return this.taskForm.get('projectRequirementId'); }
   get ownerId() { return this.taskForm.get('ownerId'); }
   get planFinishTime() { return this.taskForm.get('planFinishTime'); }
   get fixUnitRate() { return this.taskForm.get('fixUnitRate'); }

  constructor(private fb: FormBuilder,
    private modal: NzModalRef,
    private projectVersionServiceProxy: ProjectVersionServiceProxy,
    private projectModuleServiceProxy:ProjectModuleServiceProxy,
    private projectTaskServiceProxy: ProjectTaskServiceProxy,
    public msg: NzMessageService,) {

  }

  ngOnInit() {
    this.initForm();
    this.initData();
  }

  initForm(){
    this.taskForm = this.fb.group({
      projectModuleId:['', [Validators.required]],
      name:['', [Validators.required]],
      code:['', [Validators.required]],
      parentProjectTaskId:[''],
      gongfen:[0,[Validators.required]],
      isFix:[true, [Validators.required]],
      remarks:['', [Validators.required]],
      projectVersionId:['', [Validators.required]],
      projectRequirementId:['', [Validators.required]],
      ownerId:['', [Validators.required]],
      planFinishTime:['', [Validators.required]],
      fixUnitRate:['', [Validators.required]]
    });
  }

  initData(){
    this.projectVersionServiceProxy.getProjectVersions(this.inputPara.projectMainDto.id)
    .subscribe(
       (res)=>{
         this.prjVersions = res.items;
       },
      error=>{console.log(error);},
      ()=>{ });

    this.projectModuleServiceProxy.getProjectModules(this.inputPara.projectMainDto.id)
    .subscribe(
       (res)=>{
         this.prjModules = res.items;
       },
      error=>{console.log(error);},
      ()=>{ });

  }

  loadTasks(e:any){
    if (!e)
      return;

    if (this.projectRequirementId.value) {
    this.isLoading = true;
    this.projectTaskServiceProxy.getProjectTasks(this.projectRequirementId.value)
    .subscribe(
       (res)=>{
         this.tasks = res.items;
       },
      error=>{console.log(error);},
      ()=>{this.isLoading = false; });
    } else {
      this.msg.warning('请选择需求！');
    }
  }

  public onChanges(values: any): void {
    console.log(values, values);
  }

  public onPlanTimeChange(result: Date): void {
    console.log('Selected Time: ', result);
  }

  public onPlanTimeOk(result: Date): void {
    console.log('onOk', result);
  }

  close() {
    this.modal.destroy();
  }

  save(){
    const input:CreateProjectTaskInput = new CreateProjectTaskInput();
    input.name = this.name.value;
    input.remarks = this.remarks.value;
    input.gongfen = this.gongfen.value;
    input.projectRequirementId = this.projectRequirementId.value;
    input.parentProjectTaskId = this.parentProjectTaskId.value;
    input.projectMainId = this.inputPara.projectMainDto.id;
    input.projectModuleId = this.projectModuleId.value;
    input.ownerId = this.ownerId.value;
    input.helperId = 0;
    input.projectVersionId = this.projectVersionId.value;
    input.isFix = this.isFix.value;
    input.fixUnitRate = this.fixUnitRate.value;
    input.realFixUnitRate = 0;
    input.planFinishTime = this.planFinishTime.value;
    input.code = this.code.value;
    
    this.projectTaskServiceProxy.createProjectTask(input)
    .subscribe(
       (res)=>{
         this.msg.info("任务创建成功！");
       },
      error=>{this.msg.error(error);},
      ()=>{});
    this.modal.close();
  }
  moduleChanged(event){
    if (this.prjReqLookup.projectModuleId != event){
      this.prjReqLookup.projectModuleId = event;
      this.prjReqLookup.initData();
    }
    
  }
}
