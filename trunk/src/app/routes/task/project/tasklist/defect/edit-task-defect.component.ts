import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { ProjectTaskDefectServiceProxy } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'edit-task-defect',
  templateUrl: './edit-task-defect.component.html'
})
export class EditTaskDefectComponent implements OnInit {
  @Input() inputPara: any;
  validateForm: FormGroup;

   get name() { return this.validateForm.get('name'); }
   get remarks() { return this.validateForm.get('remarks'); }
   get gongfen() { return this.validateForm.get('gongfen'); }
   get ownerId() { return this.validateForm.get('ownerId'); }
   
  constructor(private fb: FormBuilder,
    private modal: NzModalRef,
    private msg: NzMessageService,
    private ProjectTaskDefectServiceProxy: ProjectTaskDefectServiceProxy) {

  }

  ngOnInit() {
    this.initForm();
    //this.initData();
    console.log(this.inputPara);
  }

  initForm(){
    this.validateForm = this.fb.group({
      name   : [ this.inputPara.data.name, [ Validators.required ] ],
      ownerId:[this.inputPara.data.ownerId],
      gongfen   : [ this.inputPara.data.gongfen, [ Validators.required ] ],
      remarks: [ this.inputPara.data.remarks, [ Validators.required ] ]
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

    this.modal.close(value); 
  }

}
