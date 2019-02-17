import { Component, OnInit ,Input,Output,EventEmitter } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { ProjectTypeServiceProxy,
  ListResultDtoOfProjectTypeListDto } from '@shared/service-proxies/service-proxies';
@Component({
  selector: 'ng-select3',
  templateUrl: './select3.component.html',
})
//项目类型 下拉组件
export class NzSelect3Component {
  // get selectedOption():any{
  //   return this.innerValue;
  // }

  selectedOption : Number;

  @Input() innerValue:Number;
  @Output() projectTypeId: EventEmitter<any> = new EventEmitter();
  types = [];
  constructor(private http: _HttpClient,private proxy: ProjectTypeServiceProxy) {

  }
  changeV(v){
    this.projectTypeId.emit(v);
  }
  ngOnInit() {
    this.proxy.getProjectTypes()
      .subscribe ((data:ListResultDtoOfProjectTypeListDto)=> {
      console.log(data);
      this.types = data.items;
    });
    this.selectedOption = this.innerValue;
  }
}
