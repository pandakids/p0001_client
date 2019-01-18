import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicComponent } from '@shared/dynamic-component/dynamic.component';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { ProjectStageTypeServiceProxy } from '@shared/service-proxies/service-proxies';

@Component({
    selector: 'eidt-prj-stage',
    templateUrl: './edit-project-stage.component.html',
    styleUrls  : [ './edit-project-stage.component.less']
})
export class EditPrjStageComponent implements OnInit {

    @Input() inputData: any;
    types: any[] = [];
    statusForm: FormGroup;
    get name() { return this.statusForm.get('name'); }
    get code() { return this.statusForm.get('code'); }
    get stageType() { return this.statusForm.get('stageTypeForm'); }
    constructor(
        private fb: FormBuilder,
        private modal: NzModalRef,
        private prjStageTypeServiceProxy: ProjectStageTypeServiceProxy,) {
    }


    ngOnInit() {
        console.log(this.inputData);
        this.statusForm = this.fb.group({
            code: ['', [Validators.required]],
            name: ['', [Validators.required]],
            stageType: [''],
        });

         this.prjStageTypeServiceProxy.getProjectStageTypes()
        .subscribe(res=>{
           this.types = res.items;
      },
      error=>{console.log(error)},
      ()=>{ });
    }

    onSubmit() {
        this.modal.close(this.inputData);
        this.close();
    }

    close() {
    this.modal.destroy();
  }

  compareFn(s1: any, s2: any): boolean {
    return s1 && s2 ? s1.id === s2.id : s1 === s2;
}

}