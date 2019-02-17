import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectdashboardComponent } from './projectdashboard/projectdashboard.component';
import { ProjectlistComponent } from './projectlist/projectlist.component';
import { ProjectmodulesComponent } from './projectmodules/projectmodules.component';
import { ProjectrolesComponent } from './projectroles/projectroles.component';
import { CustomizingComponent } from './customizing/customizing.component';
import { PrjStageComponent } from './project-stage/project-stage.component';
import { PrjInvestComponent } from './project-invest/project-invest.component';

const routes: Routes = [
  { path: 'projectdashboard', component: ProjectdashboardComponent },
  { path: 'projectlist', component: ProjectlistComponent },
  { path: 'projectmodules', component: ProjectmodulesComponent },
  { path: 'projectroles', component: ProjectrolesComponent },
  { path: 'project-stage',  component: PrjStageComponent  },
  { path: 'project-invest',  component: PrjInvestComponent  },
  { path: 'customizing',  component: CustomizingComponent  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
