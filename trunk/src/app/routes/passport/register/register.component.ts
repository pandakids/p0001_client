import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import {  _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';
import * as Contants from '../../../common/Contants';

@Component({
  selector: 'passport-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less'],
})
export class UserRegisterComponent implements OnDestroy {
  form: FormGroup;
  error = '';
  type = 0;
  loading = false;
  visible = false;
  status = 'pool';
  progress = 0;
  passwordProgressMap = {
    ok: 'success',
    pass: 'normal',
    pool: 'exception',
  };

  constructor(
    fb: FormBuilder,
    private router: Router,
    public msg: NzMessageService,
    private http: _HttpClient
    ) {
    this.form = fb.group({
      mail: [null, [Validators.email]],
      lastName: [null, [Validators.required]],//姓
      firstName: [null, [Validators.required]],//名
      userName: [null, [Validators.required]],
      password: [
        null,
        [
          Validators.required,
          Validators.minLength(6),
          UserRegisterComponent.checkPassword.bind(this),
        ],
      ],
      confirm: [
        null,
        [
          Validators.required,
          Validators.minLength(6),
          UserRegisterComponent.passwordEquar,
        ],
      ],
      // mobilePrefix: ['+86'],
      // mobile: [null, [Validators.required, Validators.pattern(/^1\d{10}$/)]],
      // captcha: [null, [Validators.required]],
    });
  }

  static checkPassword(control: FormControl) {
    if (!control) return null;
    const self: any = this;
    self.visible = !!control.value;
    if (control.value && control.value.length > 9) self.status = 'ok';
    else if (control.value && control.value.length > 5) self.status = 'pass';
    else self.status = 'pool';

    if (self.visible)
      self.progress =
        control.value.length * 10 > 100 ? 100 : control.value.length * 10;
  }

  static passwordEquar(control: FormControl) {
    if (!control || !control.parent) return null;
    if (control.value !== control.parent.get('password').value) {
      return { equar: true };
    }
    return null;
  }

  // region: fields

  get mail() {
    return this.form.controls.mail;
  }
  get lastName() {
    return this.form.controls.lastName;
  }
  get firstName() {
    return this.form.controls.firstName;
  }
  get userName() {
    return this.form.controls.userName;
  }

  get password() {
    return this.form.controls.password;
  }
  get confirm() {
    return this.form.controls.confirm;
  }
  // get mobile() {
  //   return this.form.controls.mobile;
  // }
  // get captcha() {
  //   return this.form.controls.captcha;
  // }

  // endregion

  // region: get captcha

  count = 0;
  interval$: any;

  // getCaptcha() {
  //   this.count = 59;
  //   this.interval$ = setInterval(() => {
  //     this.count -= 1;
  //     if (this.count <= 0) clearInterval(this.interval$);
  //   }, 1000);
  // }

  // endregion

  submit() {
    this.error = '';
    for (const i in this.form.controls) {
      this.form.controls[i].markAsDirty();
      this.form.controls[i].updateValueAndValidity();
    }
    if (this.form.invalid) return;
    // console.log(this.form.value);
    // mock http
    // this.loading = true;
    // setTimeout(() => {
    //   this.loading = false;
    //   this.router.navigate(['/passport/register-result']);
    // }, 1000);
    // const registerInput: RegisterInput = new RegisterInput();
    // registerInput.name = this.form.value.firstName;
    // registerInput.surname = this.form.value.lastName;
    // registerInput.userName = this.form.value.userName;
    // registerInput.emailAddress = this.form.value.mail;
    // registerInput.password = this.form.value.password;
    // // registerInput.captchaResponse = 'aaaa';

    // this._accountService.register(registerInput).subscribe(data=>{
    //   console.log(data);
    // },
    // err=>{
    //   console.log(err);
    // });
    
    const params = {
      name: this.form.value.firstName,
      surname: this.form.value.lastName,
      userName: this.form.value.userName,
      emailAddress: this.form.value.mail,
      password: this.form.value.password,
    };
    this.loading = true;
    this.http.post(Contants.API.SERVER_URL + '/' + Contants.API.REGISTER, params, {_allow_anonymous:'true'})
    .subscribe (
      (response:any)=>{
        this.router.navigate(['/passport/register-result']);
      }, error => {
        this.createMessage('error', '注册失败!')
      },
      ()=>{
        this.loading = false;
        console.log('complete');
      });

  }

  createMessage(type: string, content: string): void {
    this.msg.create(type, content);
  }
  ngOnDestroy(): void {
    if (this.interval$) clearInterval(this.interval$);
  }
}
