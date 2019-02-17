import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicComponent } from '@shared/dynamic-component/dynamic.component';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';

@Component({
    selector: 'eidt-prj-task-status',
    templateUrl: './edit-prj-task-status.component.html',
    styleUrls  : [ './edit-prj-task-status.component.less']
})
export class EditPrjTaskStatusComponent implements DynamicComponent, OnInit {

    @Input() inputData: any;
    statusForm: FormGroup;
    get name() { return this.statusForm.get('name'); }
    get code() { return this.statusForm.get('code'); }

    constructor(
        private fb: FormBuilder,
        private modal: NzModalRef,) {
    }


    ngOnInit() {
        console.log(this.inputData);
        this.statusForm = this.fb.group({
            code: ['', [Validators.required]],
            name: ['', [Validators.required]],
            remarks: ['', [Validators.required]],
        });
    }

    onSubmit() {
        this.modal.close(this.inputData);
        this.close();
    }

    close() {
    this.modal.destroy();
  }

}