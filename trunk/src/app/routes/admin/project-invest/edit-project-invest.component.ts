import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicComponent } from '@shared/dynamic-component/dynamic.component';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { ProjectTypeServiceProxy } from '@shared/service-proxies/service-proxies';

@Component({
    selector: 'eidt-prj-invest',
    templateUrl: './edit-project-invest.component.html',
    styleUrls  : [ './edit-project-invest.component.less']
})
export class EditPrjInvestComponent implements OnInit {

    @Input() inputData: any;
    types: any[] = [];
    investForm: FormGroup;
    get name() { return this.investForm.get('name'); }
    get code() { return this.investForm.get('code'); }
    get prjType() { return this.investForm.get('prjType'); }
    constructor(
        private fb: FormBuilder,
        private modal: NzModalRef,
        private prjTypeServiceProxy: ProjectTypeServiceProxy,) {
    }


    ngOnInit() {
        console.log(this.inputData);
        this.investForm = this.fb.group({
            code: ['', [Validators.required]],
            name: ['', [Validators.required]],
            prjType: [''],
        });

         this.prjTypeServiceProxy.getProjectTypes()
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