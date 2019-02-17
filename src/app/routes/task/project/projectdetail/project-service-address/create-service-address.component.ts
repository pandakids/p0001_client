import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { ProjectServiceAddressTypeServiceProxy,
  ProjectServiceAddressServiceProxy, CreateProjectServiceAddressInput
 } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'create-service-address',
  templateUrl: './create-service-address.component.html'
})
export class CreateServiceAddressComponent implements OnInit {
  @Input() inputPara: any;
  validateForm: FormGroup;
  types: any[] = [];

   get address() { return this.validateForm.get('address'); }
   get remarks() { return this.validateForm.get('remarks'); }
   get projectServiceAddressTypeId() { return this.validateForm.get('projectServiceAddressTypeId'); }
   
  constructor(private fb: FormBuilder,
    private modal: NzModalRef,
    private msg: NzMessageService,
    private projectServiceAddressTypeServiceProxy: ProjectServiceAddressTypeServiceProxy,
    private projectServiceAddressServiceProxy: ProjectServiceAddressServiceProxy,) {
    
  }

  ngOnInit() {
    this.initForm();
    this.initData();
    console.log(this.inputPara);
  }

  initForm(){
    this.validateForm = this.fb.group({
      address: [ '', [ Validators.required ] ],
      remarks   : [ '', [ Validators.required ] ],
      projectServiceAddressTypeId: [ '', [ Validators.required ] ],
    });
  }

  initData(){
    this.projectServiceAddressTypeServiceProxy.getProjectServiceAddressTypes()
    .subscribe(
       (res)=>{
         this.types = res.items;
       },
      error=>{this.msg.error(error);},
      ()=>{ });
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
    const input:CreateProjectServiceAddressInput = value;
    input.projectMainId = this.inputPara;
    this.projectServiceAddressServiceProxy.createProjectServiceAddress(input)
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
