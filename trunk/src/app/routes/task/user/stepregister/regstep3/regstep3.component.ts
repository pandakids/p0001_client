import { Component, Injectable, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegService } from '../reg.service';
import {
  BasUserServiceProxy,
  CreateMemberSchoolInput,
  EditBasUserInput,
} from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'regstep3',
  templateUrl: './regstep3.component.html',
  styleUrls: ['./regstep3.component.css']
})
export class Regstep3Component implements OnInit {
  schoolForm: FormGroup;
  companyForm: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder,
              public item: RegService,
              private editUserProxy: BasUserServiceProxy) { }

  ngOnInit() {
    this.schoolForm = this.fb.group({
      degree: [null, Validators.required],
      schoolName: [null, Validators.required],
      rangeTime: [null, Validators.required],
      major: [null, Validators.required],
    });

    this.companyForm = this.fb.group({
      companyName: [null, Validators.required],
      teamRole: [null, Validators.required],
      rangeTime: [null, Validators.required],
    });
  }

  _submitForm() {
    this.loading = true;
    this.editUserProxy.editBasUser(EditBasUserInput.fromJS(this.renderDate())).subscribe(resp => {
      this.loading = false;
      ++this.item.step;
    });
  }

  prev() {
    --this.item.step;
  }

  /** 格式化起始日期 */
  renderDate(): any {
    const schoolFromTime: string = this.schoolForm.get('rangeTime').value;
    const companyFromTime: string = this.companyForm.get('rangeTime').value;

    let careersInfo: any = {
      degree: this.schoolForm.get('degree').value,
        memberSchools: [Object.assign(this.schoolForm.value, {
        fromTime: schoolFromTime[0],
        toTime: schoolFromTime[1],
        // 学校非必填字段
        remarks: null,
        schoolId: 0,
        isUtilNow: true,
        linkUserId: this.item.linkUserId,
      })],
      memberCareers: [Object.assign(this.companyForm.value, {
        fromTime: companyFromTime[0],
        toTime: companyFromTime[1],
        // 公司非必填字段
        remarks: null,
        companyId: 0,
        isUtilNow: true,
        teamMemberNum: 0,
        linkUserId: this.item.linkUserId,
      })],
    };

    return Object.assign(this.item, careersInfo);
  }
}
