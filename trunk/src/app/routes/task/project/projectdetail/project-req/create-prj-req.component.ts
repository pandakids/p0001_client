import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { ProjectVersionServiceProxy,ProjectReqTypeServiceProxy
 } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'create-prj-req',
  templateUrl: './create-prj-req.component.html'
})
export class CreatePrjReqComponent implements OnInit {
  @Input() inputPara: any;
  validateForm: FormGroup;
  prjVersions: Array<any>=[];
  reqTypes: Array<any>=[];


   get name() { return this.validateForm.get('name'); }
   get projectModuleId() { return this.validateForm.get('projectModuleId'); }
   get remarks() { return this.validateForm.get('remarks'); }
   get projectReqTypeId() { return this.validateForm.get('projectReqTypeId'); }
   get projectVersionId() { return this.validateForm.get('projectVersionId'); }
   
  constructor(private fb: FormBuilder,
    private modal: NzModalRef,
    private msg: NzMessageService,
    private projectVersionServiceProxy: ProjectVersionServiceProxy,
    private projectReqTypeServiceProxy: ProjectReqTypeServiceProxy) {

  }

  ngOnInit() {
    this.initForm();
    this.initData();
    console.log(this.inputPara);
  }

  initForm(){
    this.validateForm = this.fb.group({
      name: [ this.inputPara.data.name, [ Validators.required ] ],
      remarks: [ this.inputPara.data.remarks, [ Validators.required ] ],
      projectReqTypeId : [ this.inputPara.data.projectReqTypeId, [ Validators.required] ],
      projectVersionId : [ this.inputPara.data.projectVersionId, [ Validators.required] ],
    });
  }

  initData(){
    if (this.inputPara && this.inputPara.projectMainId){
      this.projectVersionServiceProxy.getProjectVersions(this.inputPara.projectMainId)
    .subscribe((res)=>{
         this.prjVersions = res.items;
       },
      error=>{console.log(error);},
      ()=>{ });

    this.projectReqTypeServiceProxy.getProjectReqTypes()
    .subscribe(
       (res)=>{
         this.reqTypes = res.items;
       },
      error=>{console.log(error);},
      ()=>{ });
    }
  }

  close() {
    this.modal.destroy();
  }

  submitForm($event, value){
    $event.preventDefault();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[ key ].markAsDirty();
      this.validateForm.controls[ key ].updateValueAndValidity();
    }

    this.modal.close(value); 
    
  }

}
