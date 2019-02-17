import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegService {
  // 步骤
  step: 0 | 1 | 2 | 3 = 0;

  id: any = '';
  svnAccount: string = '';
  svnPassword: string = '';
  isSvnEnabled: boolean = false;
  changeReason: string = '';
  isFinishIdentify: any = '';
  address: string = '';
  remarks: string = '';
  credit: any = '';
  tags: string = '';
  realName: string = '';
  linkUserId: number = 0;
  level: string = '';
  refereeId: number = 0;
  defaultRoleId: number = 0;
  mobilePhone: string = '';
  email: string = '';
  sexy: string = '';

  constructor() { }


}
