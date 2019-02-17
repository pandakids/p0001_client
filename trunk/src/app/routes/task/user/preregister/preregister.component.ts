import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { STColumn } from '@delon/abc';
import { _HttpClient } from '@delon/theme';
import { NzMessageService, NzTabChangeEvent } from 'ng-zorro-antd';
import { ProjectMainServiceProxy,
ListResultDtoOfProjectMainListDto } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'preregister',
  templateUrl: './preregister.component.html',
  styleUrls: ['./preregister.component.css']
})
export class PreregisterComponent implements OnInit {

  editIndex = -1;
  editObj = {};

  q: any = {
    ps: 8,
    categories: [],
    owners: ['zxx'],
  };

  form: FormGroup;
  users: any[] = [
    { value: 'xiao', label: '付晓晓' },
    { value: 'mao', label: '周毛毛' },
  ];

  list: any[] = [];

  data = {
    advancedOperation1: [],
    advancedOperation2: [],
    advancedOperation3: [],
  };

  opColumns: STColumn[] = [
    { title: '操作类型', index: 'type' },
    { title: '操作人', index: 'name' },
    { title: '执行结果', index: 'status', render: 'status' },
    { title: '操作时间', index: 'updatedAt', type: 'date' },
    { title: '备注', index: 'memo', default: '-' },
  ];

  constructor(private fb: FormBuilder,
    private http: _HttpClient,
    public msg: NzMessageService,
    private proxy: ProjectMainServiceProxy) {}

  ngOnInit() {

    //测试代码，测试会不会自动加token到header
    // this.http.get(Contants.API.GET_PRJ)
    // .subscribe ((data)=> {
    //   console.log(data);
    // });
    this.proxy.getProjectMains()
    .subscribe ((data:ListResultDtoOfProjectMainListDto)=> {
      console.log(data);
    });

    this.form = this.fb.group({
      name: [null, [Validators.required]],
      url: [null, [Validators.required]],
      owner: [undefined, [Validators.required]],
      approver: [null, [Validators.required]],
      date_range: [null, [Validators.required]],
      type: [null, [Validators.required]],
      name2: [null, [Validators.required]],
      summary: [null, [Validators.required]],
      owner2: [null, [Validators.required]],
      approver2: [null, [Validators.required]],
      time: [null, [Validators.required]],
      type2: [null, [Validators.required]],
      items: this.fb.array([]),
    });
    const userList = [
      {
        key: '1',
        workId: '00001',
        name: 'John Brown',
        department: 'New York No. 1 Lake Park',
      },
      {
        key: '2',
        workId: '00002',
        name: 'Jim Green',
        department: 'London No. 1 Lake Park',
      },
      {
        key: '3',
        workId: '00003',
        name: 'Joe Black',
        department: 'Sidney No. 1 Lake Park',
      },
    ];
    userList.forEach(i => {
      const field = this.createUser();
      field.patchValue(i);
      this.items.push(field);
    });

    this.http.get('/profile/advanced').subscribe((res: any) => {
      this.data = res;
      this.change({ index: 0, tab: null });
    });
  }

  change(args: NzTabChangeEvent) {
    this.list = this.data[`advancedOperation${args.index + 1}`];
  }

  createUser(): FormGroup {
    return this.fb.group({
      key: [null],
      workId: [null, [Validators.required]],
      name: [null, [Validators.required]],
      department: [null, [Validators.required]],
    });
  }

  //#region get form fields
  get name() {
    return this.form.controls.name;
  }
  get url() {
    return this.form.controls.url;
  }
  get owner() {
    return this.form.controls.owner;
  }
  get approver() {
    return this.form.controls.approver;
  }
  get time_start() {
    return this.form.controls.time_start;
  }
  get time_end() {
    return this.form.controls.time_end;
  }
  get type() {
    return this.form.controls.type;
  }
  get name2() {
    return this.form.controls.name2;
  }
  get summary() {
    return this.form.controls.summary;
  }
  get owner2() {
    return this.form.controls.owner2;
  }
  get approver2() {
    return this.form.controls.approver2;
  }
  get time() {
    return this.form.controls.time;
  }
  get type2() {
    return this.form.controls.type2;
  }
  get items() {
    return this.form.controls.items as FormArray;
  }
  //#endregion

  add() {
    this.items.push(this.createUser());
    this.edit(this.items.length - 1);
  }

  del(index: number) {
    this.items.removeAt(index);
  }

  edit(index: number) {
    if (this.editIndex !== -1 && this.editObj) {
      this.items.at(this.editIndex).patchValue(this.editObj);
    }
    this.editObj = { ...this.items.at(index).value };
    this.editIndex = index;
  }

  save(index: number) {
    this.items.at(index).markAsDirty();
    if (this.items.at(index).invalid) return;
    this.editIndex = -1;
  }

  cancel(index: number) {
    if (!this.items.at(index).value.key) {
      this.del(index);
    } else {
      this.items.at(index).patchValue(this.editObj);
    }
    this.editIndex = -1;
  }

  _submitForm() {
    for (const i in this.form.controls) {
      this.form.controls[i].markAsDirty();
      this.form.controls[i].updateValueAndValidity();
    }
    if (this.form.invalid) return;
  }

}
