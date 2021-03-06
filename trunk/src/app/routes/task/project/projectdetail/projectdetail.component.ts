import { Component, OnInit, ViewChild } from '@angular/core';
import { NzMessageService, NzTabChangeEvent } from 'ng-zorro-antd';
import {  ModalHelper } from '@delon/theme';
import { STColumn } from '@delon/abc';
import { JoinprojectComponent } from '../common/joinproject.component';
import { addTaskComponent } from '../common/addTask.component';
import {ProjectMainServiceProxy, ProjectRoleServiceProxy,
  CreateProjectTaskDefectInput,
  ProjectTaskDefectServiceProxy
} from '@shared/service-proxies/service-proxies';
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
import { PrjTaskComponent } from '../projectdetail/project-tasks/project-task';
import { PrjDefectComponent } from '../projectdetail/project-defects/project-defect';

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

  @ViewChild('prjDefect') prjDefectComponent: PrjDefectComponent;
  @ViewChild('prjTask') prjTaskComponent: PrjTaskComponent;
  currentStatus: number = 0;

  constructor(public msg: NzMessageService,
    private prjDataService:PrjDataService,
    private prjRoleServiceProxy: ProjectRoleServiceProxy,
    private router: Router,
    private route: ActivatedRoute,
    private modal: ModalHelper,
    private prjProxy: ProjectMainServiceProxy,
    private projectTaskDefectServiceProxy: ProjectTaskDefectServiceProxy
    ) {}

  ngOnInit() {
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
        if(that.projectDetail.projectStageListDto){
          for(let i=0; i<that.projectDetail.projectStageListDto.length;i++){
            let s = that.projectDetail.projectStageListDto[i];
            if (that.projectDetail.projectMainDto.projectStageId==s.id){
              that.currentStatus = s.sorting;
              break;
            }
          }
        }
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
    let para = {
      type: 0,
      data: this.projectDetail
    }
    this.modal
      .static(EditTaskDefectComponent, {inputPara:para})
      .subscribe((resp) => {
        if(resp){
          const input:CreateProjectTaskDefectInput = new CreateProjectTaskDefectInput();
          input.name = resp.name;
          input.remarks = resp.remarks;
          input.gongfen = resp.gongfen;
          input.projectMainId = this.prjId;
          input.ownerId = resp.ownerId;
          this.projectTaskDefectServiceProxy.createProjectTaskDefect(input)
          .subscribe(res=>{
          });
        }
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

  prjDefectSelected(){
    console.log('prjRQSelected');
    this.prjDefectComponent.initData();
  }

  prjTaskSelected(){
    this.prjTaskComponent.initData();
  }
}
