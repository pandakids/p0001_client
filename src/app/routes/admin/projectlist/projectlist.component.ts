import { Component, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { ModalHelper } from '@delon/theme';
import { STComponent, STColumn, STColumnButton } from '@delon/abc';
import { ProjectEditComponent } from './edit/edit.component';
import { ProjectMainServiceProxy,
  ListResultDtoOfProjectMainListDto } from '@shared/service-proxies/service-proxies';
  import { ProjectLogoComponent } from './logo/project-logo.component';

@Component({
  selector: 'projectlist',
  templateUrl: './projectlist.component.html',
  styleUrls: ['./projectlist.component.css']
})
export class ProjectlistComponent {

  @ViewChild('st') st: STComponent;
  s: any = {
    pi: 1,
    ps: 10,
    s: '',
  };

  url = '/,pois';
  datalists = [];
  columns: STColumn[] = [
    { title: '编号', index: 'code', width: '100px' },
    { title: '项目名称', index: 'name' },
    { title: '图标', type: 'img', width: '50px', index: 'logo' },
    { title: '简介', index: 'remarks' },
    { title: 'Defect积分', index: 'gongfenEachDefect' },
    { title: 'REQ积分', index: 'gongfenEachReq' },
    { title: '状态', index: 'projectStatus', width: '100px' },
    {
      title: '操作',
      width: '180px',
      buttons: [
        {
          text: '编辑',
          type: 'modal',
          component: ProjectEditComponent,
          paramName: 'i',
          click: () => {
            this.msg.info('回调，重新发起列表刷新')
          },
        },
        {
          text: '图标',
          type: 'modal',
          component: ProjectLogoComponent,
          paramName: 'inputData',
          click: (res:any) => {
            // let that =this;
            let index = this.datalists.findIndex(function(element) {
              return element.id == res.id;
            });
            if (index>=0){
              this.proxy.getProjectLogo(this.datalists[index].id).subscribe(
                result=>{
                  if (result && result.profilePicture) {
                    this.datalists[index].logo = 'data:image/jpeg;base64,' + result.profilePicture;
                    this.st.reload();
                  }
                });
            }
            this.msg.info('添加图标成功！');
        },
        },
        { text: '跳转至', click: () => this.msg.info('click photo') },
      ],
    },
  ];
  query = {
    ProjectStatusId:null,
    projectCode:null,
    projectName:null,
  }
  constructor(public msg: NzMessageService,
              private modal: ModalHelper,
              private proxy: ProjectMainServiceProxy) {}
  ngOnInit() {
    this.getData();
  }
  getStatusId(projectStatusId:number){
    this.query.ProjectStatusId = projectStatusId;
  }
  queryData(){
    if(this.query.projectCode==null || this.query.projectCode=='')
      this.query.projectCode=undefined;
    if(this.query.projectName==null || this.query.projectName=='')
      this.query.projectName=undefined;
    if(this.query.ProjectStatusId==null || this.query.ProjectStatusId=='')
      this.query.ProjectStatusId=undefined;
    this.proxy.getProjectsWithPaging(this.query.projectCode,
      this.query.projectName,
      this.query.ProjectStatusId,undefined,undefined,10,1)
      .subscribe((data:ListResultDtoOfProjectMainListDto)=> {
      this.datalists = data.items;
    });
  }
  getData(){
    this.proxy.getProjectMains()
      .subscribe((data:ListResultDtoOfProjectMainListDto)=> {
        this.datalists = data.items;
        let that = this;
        for (let i = 0; i < data.items.length; ++i) {
          let element:any = data.items[i];
            this.proxy.getProjectLogo(element.id).subscribe(result => {
            if (result && result.profilePicture) {
                element.logo = 'data:image/jpeg;base64,' + result.profilePicture;
                if (i==data.items.length-1){
                  that.st.load();
                }
            }
        });
        }
//         this.datalists.forEach(function(element) {
//            that._profileService.getProfilePicture().subscribe(result => {
//             if (result && result.profilePicture) {
//                 element.logo = 'data:image/jpeg;base64,' + result.profilePicture;
//             }
//         });
// });
      }); 
       }
  add() {
    this.modal
      .static(ProjectEditComponent, { i: { id: 0 } })
      .subscribe(() => {
        this.st.load();
        this.msg.info('刷新');
      });
  }

}
