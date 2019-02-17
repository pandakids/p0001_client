import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import {
  ProjectTaskServiceProxy,
  HandleProjectTaskInput,
  ProjectRoleServiceProxy
} from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'edit-project-task',
  templateUrl: './edit-project-task.component.html',
   styleUrls: ['./edit-project-task.component.less'],
})
export class EditProjectTaskComponent implements OnInit {
  @Input() inputPara: any;
  roleList: any[];
  validateForm: FormGroup;

  constructor(private fb: FormBuilder,
    private modal: NzModalRef,
    private msg: NzMessageService,
    private taskProxy: ProjectTaskServiceProxy,
    private projectRolesProxy: ProjectRoleServiceProxy) {
  }

  ngOnInit() {
     this.initForm();
     this.getRoleList();
  }

  initForm(){
    this.validateForm = this.fb.group({
      taskId: [''],
      handleUserId: [''],
      remarks: [ '', [ Validators.required ] ],
    });
  }

  getRoleList(){
    this.projectRolesProxy.getProjectRoles()
      .subscribe(resp => {
        this.roleList = resp.items;
        console.log(this.roleList);
      });
  }

  close() {
    this.modal.destroy();
  }

  submitForm($event, value){
    $event.preventDefault();

    const params: HandleProjectTaskInput = value;

    this.taskProxy
      .handleProjectTask(params)
      .subscribe(resp => {
        this.msg.success('任务处理成功');
        this.modal.close(true);
      });
  }

}
