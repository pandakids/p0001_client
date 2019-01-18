import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { ProjectCostServiceProxy,CreateProjectCostInput
 } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'create-project-cost',
  templateUrl: './create-project-cost.component.html'
})
export class CreateProjectCostComponent implements OnInit {
  @Input() inputPara: any;
  validateForm: FormGroup;

   get title() { return this.validateForm.get('title'); }
   get remarks() { return this.validateForm.get('remarks'); }
   get costAmount() { return this.validateForm.get('costAmount'); }
   get linkUserId() { return this.validateForm.get('linkUserId'); }
   
  constructor(private fb: FormBuilder,
    private modal: NzModalRef,
    private msg: NzMessageService,
    private projectCostServiceProxy: ProjectCostServiceProxy) {

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
      costAmount : [ 0, [ Validators.required] ],
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
    const input:CreateProjectCostInput = value;
    input.projectMainId = this.inputPara.projectMainDto.id;
    input.isCheck = true;
    input.checkUserId=0;
    this.projectCostServiceProxy.createProjectCost(input)
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
