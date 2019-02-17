import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';

@Component({
  selector: 'task-module-lookup',
  templateUrl: './taskModule.component.html',
  styleUrls: ['./joinproject.component.css']
})
export class taskModuleComponent implements OnInit {

values: any;

  options = [{
    value: 'zhejiang',
    label: '任务管理',
    children: [{
      value: 'hangzhou',
      label: '后台',
      children: [{
        value: 'xihu',
        label: '任务管理',
        isLeaf: true
      }]
    }, {
      value: 'ningbo',
      label: '前端',
      isLeaf: true
    }]
  }, {
    value: 'jiangsu',
    label: '投资管理',
    children: [{
      value: 'nanjing',
      label: '后台',
      children: [{
        value: 'zhonghuamen',
        label: 'Zhong Hua Men',
        isLeaf: true
      }]
    }]
  }];

  /** ngModel value */
  public nzOptions: any[] = null;

  constructor(private fb: FormBuilder,
    private modal: NzModalRef) { }

  ngOnInit() {

    /** init data */
    this.nzOptions = this.options;
   
  }

  public onChanges(values: any): void {
  }

  close() {
    this.modal.destroy();
  }
}
