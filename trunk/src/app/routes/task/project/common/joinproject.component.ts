import { Component, OnInit,Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import {ProjectRoleServiceProxy, ProjectMainRoleServiceProxy, JoinProjectMainRoleInput} from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'joinproject',
  templateUrl: './joinproject.component.html',
  styleUrls: ['./joinproject.component.css']
})
export class JoinprojectComponent implements OnInit {
  @Input() inputData: any;

  joinInput:any={};
  roles = [];
  joinForm: FormGroup;

  get role() { return this.joinForm.get('role'); }
  get reason() { return this.joinForm.get('reason'); }


  constructor(private fb: FormBuilder,
    private modal: NzModalRef,
    public msg: NzMessageService,
    private prjRole: ProjectRoleServiceProxy,
    private prjJoin: ProjectMainRoleServiceProxy) { }

  ngOnInit() {
    this.joinForm = this.fb.group({
            role: ['', [Validators.required]],
            reason: [''],
        });

    //this.form.patchValue(this.item);
    console.log(this.inputData);
    this.prjRole.getProjectRoles().subscribe(
      (res:any)=>{
        this.roles = res.items;
      });
  }
  close() {
    this.modal.destroy();
  }

   save() {
     const input:JoinProjectMainRoleInput = new JoinProjectMainRoleInput()
     input.projectRoleId = this.joinInput.id;
     input.projectMainId = this.inputData;
     input.remarks = this.joinInput.reason;
     

     this.prjJoin.joinProjectMainRole(input).subscribe(
       (res)=>{
         this.msg.success('加入成功！');
         console.log(res);
         this.modal.close(true);
       },
      error=>{console.log(error);this.modal.close(false);},
      ()=>{ });
        //this.modal.close(this.inputData);
        this.close();
    }
}
