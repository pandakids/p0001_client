import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from '@delon/theme';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import {  ModalHelper } from '@delon/theme';
import { ChangeProfileComponent } from './change-profile.component';
import { ProfileServiceProxy
 } from '@shared/service-proxies/service-proxies';
import { Events } from '../../../../common/Events';
import { EventType } from '../../../../common/Events';

@Component({
  selector: 'header-user',
  template: `
  <nz-dropdown nzPlacement="bottomRight">
    <div class="alain-default__nav-item d-flex align-items-center px-sm" nz-dropdown>
      <nz-avatar [nzSrc]="profilePicture" nzSize="small" class="mr-sm"></nz-avatar>
      {{settings.user.name}}
    </div>
    <div nz-menu class="width-sm">
      <div nz-menu-item [nzDisabled]="true"><i class="anticon anticon-user mr-sm"></i>个人中心</div>
      <div nz-menu-item [nzDisabled]="true"><i class="anticon anticon-setting mr-sm"></i>设置</div>
      <div nz-menu-item (click)="changeProfile()"><i class="anticon anticon-setting mr-sm"></i>修改头象</div>
      <li nz-menu-divider></li>
      <div nz-menu-item (click)="logout()"><i class="anticon anticon-setting mr-sm"></i>退出登录</div>
    </div>
  </nz-dropdown>
  `,
})
export class HeaderUserComponent {

  profilePicture:string;

  constructor(
    public settings: SettingsService,
    private router: Router,
    private _profileService: ProfileServiceProxy,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private modal: ModalHelper,
  ) {
     Events.common
      .subscribe(p => {
        if (p == EventType.ProfilePictureChanged)
        this.getProfilePicture();
      });
  }

ngOnInit() {
  this.profilePicture = this.settings.user.avatar;
  this.getProfilePicture();
}

  logout() {
    this.tokenService.clear();
    this.router.navigateByUrl(this.tokenService.login_url);
  }

  changeProfile(){
     this.modal
      .static(ChangeProfileComponent)
      .subscribe(() => {
      });
  }

      getProfilePicture(): void {
        this._profileService.getProfilePicture().subscribe(result => {
            if (result && result.profilePicture) {
                this.profilePicture = 'data:image/jpeg;base64,' + result.profilePicture;
            }
        });
    }

}
