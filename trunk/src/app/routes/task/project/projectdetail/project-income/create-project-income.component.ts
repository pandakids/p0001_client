import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { ProjectInComeServiceProxy,CreateProjectInComeInput
 } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'create-project-income',
  templateUrl: './create-project-income.component.html'
})
export class CreateProjectIncomeComponent implements OnInit {
  @Input() inputPara: any;
  validateForm: FormGroup;

   get title() { return this.validateForm.get('title'); }
   get remarks() { return this.validateForm.get('remarks'); }
   get amount() { return this.validateForm.get('amount'); }
   get linkUserId() { return this.validateForm.get('linkUserId'); }
   
  constructor(private fb: FormBuilder,
    private modal: NzModalRef,
    private msg: NzMessageService,
    private projectInComeServiceProxy: ProjectInComeServiceProxy) {

  }

  ngOnInit() {
    this.initForm();
    this.initData();
    console.log(this.inputPara);
  }

  initForm(){
    this.validateForm = this.fb.group({
      title   : [ '', [ Validators.required ] ],
      remarks: [ '', [ Validators.required ] ],
      amount : [ 0, [ Validators.required] ],
      linkUserId : [ 0, [ Validators.required] ]
    });
  }

  initData(){
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
    const input:CreateProjectInComeInput = value;
    input.projectMainId = this.inputPara.projectMainDto.id;
    input.isCheck = true;
    input.checkUserId=0;
    input.incomePicGuid='';
    this.projectInComeServiceProxy.createProjectInCome(input)
    .subscribe(
       (res)=>{
         this.modal.close(true);
       },
      error=>{
        console.log(error);
        this.modal.close(false);
      },
      ()=>{ });
    
  }

}
