import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { EditProjectTaskComponent } from './edit-project-task.component';
import {  ModalHelper } from '@delon/theme';
import { ProjectTaskServiceProxy, ProjectMainServiceProxy } from '@shared/service-proxies/service-proxies';
import { DefectListComponent } from './defect/defect-list.component';

@Component({
  selector: 'tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})
export class TasklistComponent implements OnInit {

  listLoading: boolean = false;
  query: any = {
    name: undefined,
    projectTaskStatusId: undefined,
    projectMainId: undefined,
    maxResultCount: 15,
    skipCount: 0,
  };
  taskData: any;
  totalCount: number = 0;

  allTodoTaskCount: number = 0;
  allTaskCount: number = 0;
  allTaskMoney: number = 0;
  allTaskGongfen: number = 0;
  allMoney: number = 0;

  constructor(
    private http: _HttpClient,
    public msg: NzMessageService,
    private modal: ModalHelper,
    private taskProxy: ProjectTaskServiceProxy,
    private projectMainServiceProxy: ProjectMainServiceProxy) {}


  ngOnInit() {
    this.getTaskData();
  }

  editTask(taskId: number): void{
    this.taskProxy.getProjectTaskById(taskId)
      .subscribe(resp => {
        this.modal
          .static(EditProjectTaskComponent, {inputPara: resp})
          .subscribe((resp) => {
            if(resp){
              this.getTaskData();
            }
          });
      });
  }

  showDefects(task): void{
    this.modal
          .static(DefectListComponent, {inputPara: task})
          .subscribe((resp) => {
            if(resp){
              //this.getTaskData();
            }
          });
  }

  /** 切换页码 */
  onChangePage(page: number): void{
    if(page > 1){
      this.query.skipCount = (page - 1) * 15;
    }
    this.getTaskData();
  }

  /** 获取我的任务数据 */
  getTaskData(): void{
    this.listLoading = true;
    this.taskProxy.getProjectTasksWithPaging(this.query.name, this.query.projectTaskStatusId, this.query.projectMainId, this.query.maxResultCount, this.query.skipCount)
      .subscribe(resp => {
        this.taskData = resp;
        this.totalCount = resp.totalCount;
        this.allTodoTaskCount = resp.allTodoTaskCount;
        this.allTaskCount = resp.allTaskCount;
        this.allTaskMoney = resp.allTaskMoney;
        this.allTaskGongfen = resp.allTaskGongfen;
        this.allMoney = resp.allMoney;
        this.listLoading = false;

        for (let i = 0; i < resp.items.length; ++i) {
          let element:any = resp.items[i];

          this.projectMainServiceProxy.getProjectLogo(element.projectMainId).subscribe(result => {
            if (result && result.profilePicture) {
                element.logo = 'data:image/jpeg;base64,' + result.profilePicture;
                if (i==resp.items.length-1){
                  //that.st.load();
                }
            }
          });
        }
      });
  }

  /** 筛选任务 */
  onSearchTask(event: any, statusType: string): void{
    if(statusType == 'status'){
      this.query.name = '';
    }
    this.query.skipCount = 0;
    this.getTaskData();
  }

  onSearchTask1(): void{
    this.query.skipCount = 0;
    this.getTaskData();
  }
}
