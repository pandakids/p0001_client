import { Component, OnInit ,Input,Output,EventEmitter } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { ProjectStageServiceProxy,
  ListResultDtoOfProjectStageListDto } from '@shared/service-proxies/service-proxies';
@Component({
  selector: 'ng-select4',
  templateUrl: './select4.component.html',
})
//项目阶段 下拉框
export class NzSelect4Component {
  // get selectedOption():any{
  //   return this.innerValue;
  // }

  selectedOption : Number;

  @Input() innerValue:Number;
  @Output() projectStageId: EventEmitter<any> = new EventEmitter();
  stages = [];
  constructor(private http: _HttpClient,private proxy: ProjectStageServiceProxy) {

  }
  changeV(v){
    this.projectStageId.emit(v);
  }
  ngOnInit() {
    this.proxy.getProjectStages()
      .subscribe ((data:ListResultDtoOfProjectStageListDto)=> {
      this.stages.push({id: '', name: '不限'}, ...data.items);
    });
    this.selectedOption = this.innerValue;
  }
}
