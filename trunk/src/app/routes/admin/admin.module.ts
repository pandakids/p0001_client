import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutModule } from '../../layout/layout.module';
import { AdminRoutingModule } from './admin-routing.module';
import { ProjectrolesComponent } from './projectroles/projectroles.component';
import { ProjectdashboardComponent } from './projectdashboard/projectdashboard.component';
import { ProjectreqComponent } from './projectreq/projectreq.component';
import { ProjectmodulesComponent } from './projectmodules/projectmodules.component';
import { ProjectlistComponent } from './projectlist/projectlist.component';
import { ProjectEditComponent } from './projectlist/edit/edit.component';
import { SharedModule } from '@shared/shared.module';
import { RoleEditComponent } from './projectroles/edit/roleedit.component';
import { CustomizingComponent } from './customizing/customizing.component';
import { PrjTaskStatusComponent } from './customizing/prj-task-status/prj-task-status.component';
import { EditPrjTaskStatusComponent } from './customizing/prj-task-status/edit-prj-task-status.component';
import { PrjStageComponent } from './project-stage/project-stage.component';
import { EditPrjStageComponent } from './project-stage/edit-project-stage.component';
import { PrjInvestComponent } from './project-invest/project-invest.component';
import { EditPrjInvestComponent } from './project-invest/edit-project-invest.component';
import { EditPrjInvestPCTComponent } from './project-invest/edit-project-invest-pct.component';
import { ProjectLogoComponent } from './projectlist/logo/project-logo.component';
import { FileUploadModule } from 'ng2-file-upload';

const COMPONENTS_NOROUNT = [
ProjectEditComponent,
RoleEditComponent,
PrjTaskStatusComponent,
EditPrjTaskStatusComponent,
EditPrjStageComponent,
EditPrjInvestComponent,
EditPrjInvestPCTComponent,
ProjectLogoComponent
]


@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    LayoutModule,
FileUploadModule
    
  ],
  declarations: [ProjectrolesComponent, ProjectdashboardComponent, ProjectreqComponent,
    ProjectmodulesComponent, ProjectlistComponent, ProjectEditComponent, RoleEditComponent,
    CustomizingComponent,
    PrjTaskStatusComponent,
    EditPrjTaskStatusComponent,
    PrjStageComponent,
    EditPrjStageComponent,
    PrjInvestComponent,
    EditPrjInvestComponent,
    EditPrjInvestPCTComponent,
    ProjectLogoComponent
    ],
  entryComponents: COMPONENTS_NOROUNT,
})
export class AdminModule { }
