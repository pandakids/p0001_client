import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzTabChangeEvent } from 'ng-zorro-antd';
import {  ModalHelper } from '@delon/theme';
import { STColumn } from '@delon/abc';
import { JoinprojectComponent } from '../common/joinproject.component';
import { addTaskComponent } from '../common/addTask.component';
import {ProjectMainServiceProxy, ProjectRoleServiceProxy} from '@shared/service-proxies/service-proxies';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { PrjDataService } from './prj-data.service';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { CreateDailyReportComponent } from './project-daily-report/create-daily-report.component';
import { CreateServiceAddressComponent } from './project-service-address/create-service-address.component'
import { CreatePrjVersionComponent } from './project-version/create-prj-version.component';
import { CreateProjectIncomeComponent } from './project-income/create-project-income.component';
import { CreateProjectCostComponent } from './project-cost/create-project-cost.component';
import { CreateProjecetModuleComponent } from './project-module/create-project-module.component';
import { EditTaskDefectComponent } from '../tasklist/defect/edit-task-defect.component';
@Component({
  selector: 'projectdetail',
  templateUrl: './projectdetail.component.html',
  styleUrls: ['./projectdetail.component.css'],
  providers: [ PrjDataService ],
})
export class ProjectdetailComponent implements OnInit {

  get projectDetail() {
    return this.prjDataService.projectDetail;
  }

  private prjId: any;

  constructor(public msg: NzMessageService,
    private prjDataService:PrjDataService,
    private prjRoleServiceProxy: ProjectRoleServiceProxy,
    private router: Router,
    private route: ActivatedRoute,
    private modal: ModalHelper,
    private prjProxy: ProjectMainServiceProxy,
    ) {}

  ngOnInit() {
    // this.route.paramMap.subscribe(
    //   (params: ParamMap) =>{
    //     let id = params.get('id');
    //     this.prjProxy.getProjectById(Number(id)).subscribe(
    //       (data)=>{
    //         this.prjDataService.projectDetail= data;
    //         console.log(this.projectDetail);
    //       }
    //       );
        
    //   });
    this.route.paramMap.subscribe(
      (params: ParamMap) =>{
        this.prjId = Number(params.get('id'));
        this.initData();
      });
  }

  initData(){
     forkJoin(
        this.prjProxy.getProjectById(this.prjId),
        this.prjRoleServiceProxy.getProjectRoles()
        )
      .subscribe(([prjDetail, roles])=>{
        const that = this;
        that.prjDataService.projectDetail = prjDetail;
        that.prjDataService.projectDetail.projectMainRoleListDto.forEach(function (element, index, array) {
        element.projectRoleName = roles.items.find((d) => (d.id == element.projectRoleId)).name;
        });

        that.prjDataService.projectDetail= prjDetail;
        console.log(prjDetail);
      },
      error=>{console.log(error)},
      ()=>{ });
  }

  selectTab(args: NzTabChangeEvent) {
    //this.showTabIndex = args.index;
  }

  joinproject(){

    const params = {
      inputData: `${this.prjId}`
    };

    this.modal
      .static(JoinprojectComponent, params)
      .subscribe(() => {
      });
  }

  addTask(){
    this.modal
      .static(addTaskComponent, {inputPara:this.projectDetail})
      .subscribe(() => {
      });
  }

  addDefect(){
    this.modal
      .static(EditTaskDefectComponent, {inputPara:this.projectDetail})
      .subscribe(() => {
      });
  }

  CreateProjectDailyReport() {
    this.modal
      .static(CreateDailyReportComponent, {inputPara:this.prjId})
      .subscribe((res) => {
        if (res){
          this.initData();
        }
      });
  }

  CreateServieAddress() {
    this.modal
      .static(CreateServiceAddressComponent, {inputPara:this.prjId})
      .subscribe((res) => {
        if (res){
          this.initData();
        }
      });
  }

  CreateVersion() {
    this.modal
      .static(CreatePrjVersionComponent, {inputPara:this.prjId})
      .subscribe((res) => {
        if (res){
          this.initData();
        }
      });
  }

  CreateProjectModule() {
     this.modal
      .static(CreateProjecetModuleComponent, {inputPara:this.projectDetail})
      .subscribe((res) => {
        if (res){
          this.initData();
        }
      });
  }

  CreateProjectIncome() {
    this.modal
      .static(CreateProjectIncomeComponent, {inputPara:this.projectDetail})
      .subscribe((res) => {
        if (res){
          this.initData();
        }
      });
  }

  CreateProjectCost() {
    this.modal
      .static(CreateProjectCostComponent, {inputPara:this.projectDetail})
      .subscribe((res) => {
        if (res){
          this.initData();
        }
      });
  }

}
