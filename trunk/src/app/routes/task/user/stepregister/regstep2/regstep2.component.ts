import { Component, OnInit } from '@angular/core';
import { RegService } from '../reg.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectRoleServiceProxy } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'regstep2',
  templateUrl: './regstep2.component.html',
  styleUrls: ['./regstep2.component.css']
})
export class Regstep2Component implements OnInit {
  // 角色数据
  rolesData: any[];
  form: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    public item: RegService,
    private roleProxy: ProjectRoleServiceProxy) { }

  ngOnInit() {
    this.getRolesData();
    this.form = this.fb.group({
      defaultRoleId: [null, Validators.required],
    });
    this.form.patchValue(this.item);
  }

  _submitForm() {
    this.loading = true;
    this.item = Object.assign(this.item, this.form.value);
    setTimeout(() => {
      this.loading = false;
      ++this.item.step;
    }, 1000);
  }

  prev() {
    --this.item.step;
  }

  /** 获取角色数据 */
  getRolesData(): void{
    this.roleProxy.getProjectRoles().subscribe(resp => {
      this.rolesData = resp.items;
    });
  }
}
