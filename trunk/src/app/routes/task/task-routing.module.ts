import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './project/dashboard/dashboard.component';
import { ProjectlistComponent } from './project/projectlist/projectlist.component';
import { PreregisterComponent } from './user/preregister/preregister.component';
import { ProjectdetailComponent } from './project/projectdetail/projectdetail.component';
import { TasklistComponent } from './project/tasklist/tasklist.component';
import { StepregisterComponent } from './user/stepregister/stepregister.component';

const routes: Routes = [
  {
    path: 'project',
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'projectlist', component: ProjectlistComponent },
      { path: 'projectdetail/:id', component: ProjectdetailComponent },
      { path: 'tasklist', component: TasklistComponent },
    ],
  },
  {
    path: 'user',
    children: [
      { path: 'preregister', component: PreregisterComponent },
      { path: 'stepregister', component: StepregisterComponent },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
