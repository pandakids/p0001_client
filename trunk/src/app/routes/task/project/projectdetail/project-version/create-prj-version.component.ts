import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { ProjectVersionServiceProxy,CreateProjectVersionInput
 } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'create-prj-version',
  templateUrl: './create-prj-version.component.html'
})
export class CreatePrjVersionComponent implements OnInit {
  @Input() inputPara: any;
  validateForm: FormGroup;

   get code() { return this.validateForm.get('code'); }
   get versionName() { return this.validateForm.get('versionName'); }
   get remarks() { return this.validateForm.get('remarks'); }
   get level() { return this.validateForm.get('level'); }
   get level1() { return this.validateForm.get('level1'); }
   get level2() { return this.validateForm.get('level2'); }
   get level3() { return this.validateForm.get('level3'); }
   get level4() { return this.validateForm.get('level4'); }
   
  constructor(private fb: FormBuilder,
    private modal: NzModalRef,
    private msg: NzMessageService,
    private projectVersionServiceProxy: ProjectVersionServiceProxy) {

  }

  ngOnInit() {
    this.initForm();
    this.initData();
    console.log(this.inputPara);
  }

  initForm(){
    this.validateForm = this.fb.group({
      code: [ '', [ Validators.required ] ],
      versionName   : [ '', [ Validators.required ] ],
      remarks: [ '', [ Validators.required ] ],
      level : [ 0, [ Validators.required] ],
      level1 : [ 0, [ Validators.required] ],
      level2 : [ 0, [ Validators.required] ],
      level3 : [ 0, [ Validators.required] ],
      level4 : [ 0, [ Validators.required] ]
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
    const input:CreateProjectVersionInput = value;
    input.projectMainId = this.inputPara;
    this.projectVersionServiceProxy.createProjectVersion(input)
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
