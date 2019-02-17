import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { ProjectDailyReportServiceProxy,CreateProjectDailyReportInput
 } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'create-daily-report',
  templateUrl: './create-daily-report.component.html'
})
export class CreateDailyReportComponent implements OnInit {
  @Input() inputPara: any;
  validateForm: FormGroup;

   get code() { return this.validateForm.get('code'); }
   get title() { return this.validateForm.get('title'); }
   get remarks() { return this.validateForm.get('remarks'); }
   get startTime() { return this.validateForm.get('startTime'); }
   get endTime() { return this.validateForm.get('endTime'); }
   
  constructor(private fb: FormBuilder,
    private modal: NzModalRef,
    private msg: NzMessageService,
    private projectDailyReportServiceProxy: ProjectDailyReportServiceProxy) {

  }

  ngOnInit() {
    this.initForm();
    this.initData();
    console.log(this.inputPara);
  }

  initForm(){
    this.validateForm = this.fb.group({
      code: [ '', [ Validators.required ] ],
      title   : [ '', [ Validators.required ] ],
      remarks: [ '', [ Validators.required ] ],
      startTime : [ null, [ Validators.required] ],
      endTime : [ null, [ Validators.required] ]
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
    const input:CreateProjectDailyReportInput = value;
    input.projectMainId = this.inputPara;
    this.projectDailyReportServiceProxy.createProjectDailyReport(input)
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
