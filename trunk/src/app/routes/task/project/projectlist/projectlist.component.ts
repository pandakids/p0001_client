import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { Router } from '@angular/router';
import { ProjectMainServiceProxy,
          ProjectTypeServiceProxy,
          ListResultDtoOfProjectTypeListDto} from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'projectlist',
  templateUrl: './projectlist.component.html',
  styleUrls: ['./projectlist.component.css']
})
export class ProjectlistComponent implements OnInit {

  // 查询参数
  query: any = {
    code: '',
    name: '',
    projectStatusId: '',
    projectTypeId: new Array<Number>(),
    projectStageId: '',
    maxResultCount: 15,
    skipCount: 0,
  };
  // 分页参数
  pagination: any = {
    pi: 1,
    ps: 10,
    total: 0,
  };
  // 项目列表数据
  list: any[] = [];
  // 项目封面图[测试]
  coverUrl: string = 'https://gw.alipayobjects.com/zos/rmsportal/HrxcVbrKnCJOZvtzSqjN.png';
  loading: boolean = true;

  // 项目类别
  categories: any[];

  // 筛选项目类别变量
  all: boolean = true;
  singleCate: boolean[] = new Array();

  constructor(private http: _HttpClient,
              public msg: NzMessageService,
              private router: Router,
              private proxy: ProjectMainServiceProxy,
              private projectTypeProxy: ProjectTypeServiceProxy) {}

  /** 初始化 */
  ngOnInit() {
    this.getProjectsData();
    this.getProjectTypeData();

     // this.proxy.getProjectLogo().subscribe(result => {
     //        if (result && result.profilePicture) {
     //            this.coverUrl = 'data:image/jpeg;base64,' + result.profilePicture;
     //        }
     //    });
  }

  /** 按照项目类别筛选项目 */
  changeCategory(status: boolean, idx: number) {
    if(idx === -1){
      if(status){
        this.query.projectTypeId = new Array<Number>();
        this.singleCate.map((value, index, arr) => arr[index] = false);
      }
    }else{
      const id = this.categories[idx].id;

      if(status) {
        let flagIdx = this.query.projectTypeId.indexOf(id);

        this.all = false;
        this.singleCate[idx] = true;
        flagIdx > -1 ? '' : this.query.projectTypeId.push(id);
      }else{
        let idx = this.query.projectTypeId.indexOf(id);

        this.singleCate[idx] = false;
        this.query.projectTypeId.splice(idx, 1);
      }
    }
    this.query.skipCount = 0;
    this.getProjectsData();
  }

  /** 切换项目阶段 */
  changeStageId(stageId: number){
    this.query.projectStageId = stageId;
    this.query.skipCount = 0;
    this.getProjectsData();
  }

  /** 切换项目状态 */
  changeStatusId(statusId: number){
    this.query.projectStatusId = statusId;
    this.query.skipCount = 0;
    this.getProjectsData();
  }

  /** 查看项目详情 */
  // gotoDetail(){
  //   this.router.navigate(['/task/project/projectdetail']);
  // }

  /** 获取项目列表数据 */
  getProjectsData() {
    this.loading = true;
    this.proxy.getProjectsWithPaging(
      this.query.code,
      this.query.name,
      this.query.projectStatusId,
      this.query.projectTypeId,
      this.query.projectStageId,
      this.query.maxResultCount,
      this.query.skipCount).subscribe((res: any) => {
        this.list = res.items;
        this.pagination.total = res.totalCount;
        for (let i = 0; i < res.items.length; ++i) {
          let element:any = res.items[i];
            this.proxy.getProjectLogo(element.id).subscribe(result => {
            if (result && result.profilePicture) {
                element.logo = 'data:image/jpeg;base64,' + result.profilePicture;
                if (i==res.items.length-1){
                  //that.st.load();
                }
            }
        });
        }
        this.loading = false;
    });
  }

  /** 切换页码回调 */
  onChangePage(page: number){
    this.pagination.pi = page;
    if(page > 1){
      this.query.skipCount = (page - 1) * 15;
    }
    this.getProjectsData();
  }

  /** 项目类型 */
  getProjectTypeData(){
    this.projectTypeProxy.getProjectTypes().subscribe(resp => {
      this.categories = resp.items;
      resp.items.map(resp => {
        this.singleCate.push(false);
      });
    });
  }
}
