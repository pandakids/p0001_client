import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { PreregisterComponent } from './user/preregister/preregister.component';
import { DashboardComponent } from './project/dashboard/dashboard.component';
import { ProjectlistComponent } from './project/projectlist/projectlist.component';
import { SharedModule } from '@shared/shared.module';
import { ProjectdetailComponent } from './project/projectdetail/projectdetail.component';
import { TasklistComponent } from './project/tasklist/tasklist.component';
import { LayoutModule } from '../../layout/layout.module';
import { StepregisterComponent } from './user/stepregister/stepregister.component';
import { Regstep1Component } from './user/stepregister/regstep1/regstep1.component';
import { Regstep2Component } from './user/stepregister/regstep2/regstep2.component';
import { Regstep3Component } from './user/stepregister/regstep3/regstep3.component';
import { Regstep4Component } from './user/stepregister/regstep4/regstep4.component';
import { JoinprojectComponent } from './project/common/joinproject.component';
import { addTaskComponent } from './project/common/addTask.component';
import { taskModuleComponent } from './project/common/taskModule.component';
import { ReqLookupComponent } from './project/common/reqLookup.component';
import { PrjAssetStrategyComponent } from './project/projectdetail/project-asset-strategy/prj-asset-strategy.component';
import { PrjCostComponent } from './project/projectdetail/project-cost/project-cost.component';
import { PrjParticipantComponent } from './project/projectdetail/project-participant/project-participant.component';
import { PrjDailyReportComponent } from './project/projectdetail/project-daily-report/project-daily-report.component';
import { PrjIncomeComponent } from './project/projectdetail/project-income/project-income.component';
import { PrjModuleComponent } from './project/projectdetail/project-module/project-module.component';
import { PrjServiceAddressComponent } from './project/projectdetail/project-service-address/project-service-address.component';
import { PrjVersionComponent } from './project/projectdetail/project-version/project-version';
import { CreateDailyReportComponent } from './project/projectdetail/project-daily-report/create-daily-report.component';
import { CreateServiceAddressComponent } from './project/projectdetail/project-service-address/create-service-address.component';
import { CreatePrjVersionComponent } from './project/projectdetail/project-version/create-prj-version.component';
import { CreateProjectIncomeComponent } from './project/projectdetail/project-income/create-project-income.component';
import { CreateProjectCostComponent } from './project/projectdetail/project-cost/create-project-cost.component';
import { CreateProjecetModuleComponent } from './project/projectdetail/project-module/create-project-module.component';
// 异步校验指令
import { AsyncValidateDirective } from './user/stepregister/directives/asyncvalidate.directive';
import { EditProjectTaskComponent } from './project/tasklist/edit-project-task.component';
import { DefectListComponent } from './project/tasklist/defect/defect-list.component';
import { EditTaskDefectComponent } from './project/tasklist/defect/edit-task-defect.component';
@NgModule({
  imports: [
    CommonModule,
    TaskRoutingModule,
    SharedModule,
    LayoutModule,
  ],
  declarations: [
    PreregisterComponent,
    DashboardComponent,
    ProjectlistComponent,
    ProjectdetailComponent,
    TasklistComponent,
    StepregisterComponent,
    Regstep1Component,
    Regstep2Component,
    Regstep3Component,
    Regstep4Component,
    AsyncValidateDirective,
    JoinprojectComponent,
    addTaskComponent,
    taskModuleComponent,
    ReqLookupComponent,
    PrjAssetStrategyComponent,
    PrjParticipantComponent,
    PrjCostComponent,
    PrjDailyReportComponent,
    PrjIncomeComponent,
    PrjModuleComponent,
    PrjServiceAddressComponent,
    PrjVersionComponent,
    CreateDailyReportComponent,
    CreateServiceAddressComponent,
    CreatePrjVersionComponent,
    CreateProjectIncomeComponent,
    CreateProjectCostComponent,
    CreateProjecetModuleComponent,
    EditProjectTaskComponent,
    DefectListComponent,
    EditTaskDefectComponent
  ],
  entryComponents:[JoinprojectComponent,
  addTaskComponent,
  taskModuleComponent,
  ReqLookupComponent,
  CreateDailyReportComponent,
  CreateServiceAddressComponent,
  CreatePrjVersionComponent,
  CreateProjectIncomeComponent,
  CreateProjectCostComponent,
  CreateProjecetModuleComponent,
  EditProjectTaskComponent,
  DefectListComponent,
  EditTaskDefectComponent]
})
export class TaskModule { }
