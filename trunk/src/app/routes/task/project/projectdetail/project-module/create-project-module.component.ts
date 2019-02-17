import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { ProjectModuleServiceProxy, CreateProjectModuleInput} from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'create-project-module',
  templateUrl: './create-project-module.component.html'
})
export class CreateProjecetModuleComponent implements OnInit {
  @Input() inputPara: any;
  validateForm: FormGroup;

   get code() { return this.validateForm.get('code'); }
   get name() { return this.validateForm.get('name'); }
   get remarks() { return this.validateForm.get('remarks'); }
   get gongfen() { return this.validateForm.get('gongfen'); }
   get projectParentModuleId() { return this.validateForm.get('projectParentModuleId'); }
   get projectVersionId() { return this.validateForm.get('projectVersionId'); }
   
  constructor(private fb: FormBuilder,
    private modal: NzModalRef,
    private msg: NzMessageService,
    private projectModuleServiceProxy: ProjectModuleServiceProxy
    ) {

  }

  ngOnInit() {
    this.initForm();
    this.initData();
    console.log(this.inputPara);
  }

  initForm(){
    this.validateForm = this.fb.group({
      code: [ '', [ Validators.required ] ],
      name   : [ '', [ Validators.required ] ],
      remarks: [ '', [ Validators.required ] ],
      gongfen: [ 0, [ Validators.required ] ],
      projectParentModuleId : [ 0],
      projectVersionId : [ 0, [ Validators.required] ]
    });
  }

  initData(){
    // this.projectVersionServiceProxy.getProjectVersions(this.inputPara.projectMainDto.id)
    // .subscribe(
    //    (res)=>{
    //      this.prjVersions = res.items;
    //    },
    //   error=>{console.log(error);},
    //   ()=>{ });
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
    const input:CreateProjectModuleInput = value;
    input.projectMainId = this.inputPara.projectMainDto.id;
    this.projectModuleServiceProxy.createProjectModule(input)
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
