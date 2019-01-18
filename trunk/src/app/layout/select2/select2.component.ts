import { Component, OnInit ,Input,Output,EventEmitter } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { ProjectStatusServiceProxy,
  ListResultDtoOfProjectStatusListDto } from '@shared/service-proxies/service-proxies';
@Component({
  selector: 'ng-select2',
  templateUrl: './select2.component.html',
})
//项目状态 下拉框
export class NzSelect2Component {
  // get selectedOption():any{
  //   return this.innerValue;
  // }
  selectedOption : Number;

  @Input() innerValue:Number;
  @Output() projectStatusId: EventEmitter<any> = new EventEmitter();
  status = [];
  constructor(private http: _HttpClient,private proxy: ProjectStatusServiceProxy) {

  }
  changeV(v){
    this.projectStatusId.emit(v);
  }
  ngOnInit() {
    this.proxy.getProjectStatuss()
      .subscribe ((data:ListResultDtoOfProjectStatusListDto)=> {
      this.status = data.items;
    });
    this.selectedOption = this.innerValue;
  }
}
