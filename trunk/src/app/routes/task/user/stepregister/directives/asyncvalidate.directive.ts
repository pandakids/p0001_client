import { Directive, forwardRef, Input, Attribute } from '@angular/core';
import { FormControl, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { BasUserServiceProxy, QueryBasUserInput } from '@shared/service-proxies/service-proxies';
import { RegService } from '../reg.service';
import { Observable } from 'rxjs-compat';
import { AsyncValidator, ValidationErrors } from '@angular/forms/src/directives/validators';

@Directive({
  selector: '[async-validate][formControlName]',
  providers: [{
    provide: NG_ASYNC_VALIDATORS,
    useExisting: forwardRef(() => AsyncValidateDirective),
    multi: true
  }]
})
export class AsyncValidateDirective implements AsyncValidator{
  private errorMsg: ErrorMsg = new ErrorMsg();

  // 邮箱正则
  private EMAIL_REGEXP: RegExp = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;
  // 手机号正则
  private PHONE_REGEXP: RegExp =/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;


  constructor(private proxyService: BasUserServiceProxy,
              public item: RegService,
              @Attribute('async-validate') public field: string){

  }

  /** 校验手机号/邮箱/推荐人 */
  validate(control: FormControl): Observable<ValidationErrors>{
    if(control.dirty){
      let value: string = control.value;

      if (value) {
        let curKey: string;

        switch (this.field) {
          case 'mobilePhone':
            curKey = 'mobilePhone';
            if(!this.checkPhone(value)){
              return Observable.of({mobilePhone: {info: this.errorMsg['mobilePhone']['regexp']}});
            }
            break;
          case 'email':
            curKey = 'email';
            if(!this.checkEmail(value)){
              return Observable.of({email: {info: this.errorMsg['email']['regexp']}});
            }
            break;
          case 'refereeEmail':
            curKey = 'mobilePhone';
            if(!this.checkPhone(value) && !this.checkEmail(value)){
              return Observable.of({[this.field]: {info: this.errorMsg[this.field]['regexp']}});
            }
            break;
          default: break;
        }

        let params: any = {
          [curKey]: control.value,
          userId: 0,
        };
        let userInput: QueryBasUserInput = new QueryBasUserInput(params);

        return control.valueChanges
          .debounceTime(100)
          .distinctUntilChanged()
          .mergeMap(() => this.proxyService.checkUserIfExist(userInput))
          .mergeMap(data => {
            if(this.field == 'refereeEmail'){
              if(Object.keys(data).length <= 0){
                return Observable.of({[this.field]: {info: this.errorMsg[this.field].error}});
              }else{
                this.item.refereeId = data.id;
                return Observable.of(null);
              }
            }else{
              if(Object.keys(data).length <= 0){
                return Observable.of(null);
              }else{
                return Observable.of({[this.field]: {info: this.errorMsg[this.field].error}});
              }
            }
          })
          .first()
          .catch(this.handleError);

      } else {
        return Observable.of({[this.field]: {info: this.errorMsg[this.field].empty}});
      }
    }else{
      return Observable.of(null);
    }
  }

  private handleError(error: any){
    return Observable.of(error);
  }

  /** 校验邮箱 */
  checkEmail(email: any): null | any[]{
    return this.EMAIL_REGEXP.exec(email + '');
  }

  /** 校验手机号 */
  checkPhone(phone: any): null | any[]{
    return this.PHONE_REGEXP.exec(phone + '');
  }
}

/**
 * 错误信息类
 */
class ErrorMsg {
  email: {[key: string]: string} = {
    empty: '请输入邮箱',
    regexp: '邮箱格式不正确',
    error: '该邮箱已存在',
  };
  mobilePhone: {[key: string]: string} = {
    empty: '请输入手机号',
    regexp: '手机号格式不正确',
    error: '该手机号已被注册',
  };
  refereeEmail: {[key: string]: string} = {
    empty: '请输入推荐人（手机号或邮箱）',
    regexp: '推荐人只能为手机号或邮箱',
    error: '推荐人ID不存在'
  };

  constructor(){}
}
