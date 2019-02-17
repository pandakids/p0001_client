import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicComponent } from '@shared/dynamic-component/dynamic.component';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import {ProjectRoleTypeServiceProxy } from '@shared/service-proxies/service-proxies';
@Component({
    selector: 'eidt-prj-invest',
    templateUrl: './edit-project-invest-pct.component.html',
    styleUrls  : [ './edit-project-invest-pct.component.less']
})
export class EditPrjInvestPCTComponent implements OnInit {

    @Input() inputData: any;
    types: any[] = [];
    investForm: FormGroup;
    get name() { return this.investForm.get('name'); }
    get code() { return this.investForm.get('code'); }
    get percent() { return this.investForm.get('percent'); }
    get prjRole() { return this.investForm.get('prjRole'); }
    get remarks() { return this.investForm.get('remarks'); }
    constructor(
        private fb: FormBuilder,
        private modal: NzModalRef,
        private prjRoleTypeProxy: ProjectRoleTypeServiceProxy,
        ) {
    }


    ngOnInit() {
        console.log(this.inputData);
        this.investForm = this.fb.group({
            code: ['', [Validators.required]],
            name: ['', [Validators.required]],
            percent: ['', [Validators.required]],
            prjRole: [''],
            remarks: [''],
        });

         this.prjRoleTypeProxy.getProjectRoleTypes()
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
}