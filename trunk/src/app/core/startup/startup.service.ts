import { Injectable, Injector, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { zip } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  MenuService,
  SettingsService,
  TitleService,
  ALAIN_I18N_TOKEN,
} from '@delon/theme';
import { ACLService } from '@delon/acl';
import { TranslateService } from '@ngx-translate/core';
import { I18NService } from '../i18n/i18n.service';
import { AbpACLService } from '../abp-acl.service';

//import {  _HttpClient } from '@delon/theme';
//import * as Contants from '../../common/Contants';


/**
 * 用于应用启动时
 * 一般用来获取应用所需要的基础数据等
 */
@Injectable()
export class StartupService {
  constructor(
    private menuService: MenuService,
    private translate: TranslateService,
    @Inject(ALAIN_I18N_TOKEN) private i18n: I18NService,
    private settingService: SettingsService,
    private aclService: ACLService,
    private titleService: TitleService,
    private httpClient: HttpClient,
    private injector: Injector,
    private abpACLService: AbpACLService
    //private http: _HttpClient

  ) {}

  load(): Promise<any> {
    // only works with promises
    // https://github.com/angular/angular/issues/15088
    return new Promise((resolve, reject) => {
      zip(
        this.httpClient.get(`assets/tmp/i18n/${this.i18n.defaultLang}.json`),
        this.httpClient.get('assets/tmp/app-data.json'),
      )
        .pipe(
          // 接收其他拦截器后产生的异常消息
          catchError(([langData, appData]) => {
            resolve(null);
            return [langData, appData];
          }),
        )
        .subscribe(
          ([langData, appData]) => {
            // setting language data
            this.translate.setTranslation(this.i18n.defaultLang, langData);
            this.translate.setDefaultLang(this.i18n.defaultLang);

            // application data
            const res: any = appData;
            // 应用信息：包括站点名、描述、年份
            this.settingService.setApp(res.app);
            // 用户信息：包括姓名、头像、邮箱地址
            //this.settingService.x(res.user);
            // ACL：设置权限为全量
            this.aclService.setFull(false);
            this.menuService.add(res.menu);
            // 设置页面标题的后缀
            this.titleService.suffix = res.app.name;

          //     this.http.get(Contants.API.SERVER_URL +'/AbpUserConfiguration/GetAll')
          // .subscribe (
          //   (response:any)=>{
          //      $.extend(true, abp, response.result);
          //      //this.aclService.setAbility(Object.getOwnPropertyNames(abp.auth.allPermissions));
          //     // 初始化菜单
          //   // res.menu.forEach((item)=>{
          //   //   this.checkChildMenuItemPermission(item);
          //   // });
          //   // this.menuService.add(res.menu);
          //   //   resolve(null);
          //    });

          //this.abpACLService.initACL();

          },
          () => {},
          () => {
            resolve(null);
          },
        );
    })
    .then(()=>{
      return this.abpACLService.initACL();
    });
  }

}
