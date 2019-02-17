import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { RegService } from '../reg.service';
import { NzMessageService } from 'ng-zorro-antd';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  BasUserServiceProxy,
  PhoneCodeConfirm,
  PhoneCodeInput,
  SmsHelperServiceProxy,
} from '@shared/service-proxies/service-proxies';
import { DA_SERVICE_TOKEN, TokenService } from '@delon/auth';

@Component({
  selector: 'regstep1',
  templateUrl: './regstep1.component.html',
  styleUrls: ['./regstep1.component.css'],
  providers: [SmsHelperServiceProxy],
})
export class Regstep1Component implements OnInit {

  form: FormGroup;
  userInfo: any;
  timer: any;
  getCodeBtn: string = '获取验证码';
  disabledBtn: boolean = false;
  getCodeLoading: boolean = false;
  submitLoading: boolean = false;

  constructor(private fb: FormBuilder,
              public item: RegService,
              private msg: NzMessageService,
              private proxyService: BasUserServiceProxy,
              private smsProxy: SmsHelperServiceProxy,
              @Inject(DA_SERVICE_TOKEN)private tokenService: TokenService) { }

  ngOnInit() {
    this.getBasUserInfo();
    this.form = this.fb.group({
      refereeEmail: [null],
      realName: [null, [Validators.required]],
      sexy: [null, [Validators.required]],
      mobilePhone: [null],
      email: [null],
      confirmCode: [null, [Validators.required]]
    });
    this.form.patchValue(this.item);
  }

  /** 获取用户信息 */
  getBasUserInfo(): void{
    this.proxyService.getBasUser(this.tokenService.get().userId).subscribe(resp => {
      const base: any = {
        linkUserId: resp.linkUserId,
        level: resp.level,
        isFinishIdentify: resp.isFinishIdentify,
        credit: resp.credit,
        address: resp.address,
        remarks: resp.remarks,
      };

      this.userInfo = base;
      this.form.get('email').setValue(resp.email);
    });
  }

  /** 获取手机验证码 */
  getPhoneCode(ev, phoneNumber: any){
    ev.preventDefault();

    this.getCodeLoading = true;
    this.smsProxy.sendSms(<PhoneCodeInput>{mobilePhone: phoneNumber}).subscribe(resp => {
      if(resp){
        this.msg.success('验证码发送成功！');
        this.getCodeBtn = `59s`;
        this.disabledBtn = true;
        this.countDown();
      }else{
        this.msg.error('验证码发送失败！');
      }

      this.getCodeLoading = false;
    });
  }

  /** 获取手机验证码倒计时 */
  countDown(){
    let origin: number = 59;
    let timer: any = null;

    this.timer = setInterval(() => {
      if(origin > 0){
        --origin;

        let second: string | number = origin > 9 ? origin : `0${origin}`;

        this.getCodeBtn = `${second}s`;
      }else{
        this.getCodeBtn = '重新获取验证码';
        this.disabledBtn = false;
        clearInterval(this.timer);
      }
    }, 1000);
  }

  /** 提交表单: 进入第二步 */
  submitForm(): void {
    this.submitLoading = true;

    this.smsProxy.checkIfConfirmCodeOk(<PhoneCodeConfirm>{confirmCode: this.form.value.confirmCode}).subscribe(resp => {
      if(resp){
        ++this.item.step;
        this.item = Object.assign(this.item, this.form.value, this.userInfo);
      }else{
        this.msg.error('手机验证码不正确！');
      }
      this.submitLoading = false;
      this.timer = null;
    });
  }
}

