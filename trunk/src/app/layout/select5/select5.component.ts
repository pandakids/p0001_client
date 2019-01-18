import { Component, OnInit ,Input,Output,EventEmitter } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { ProjectInvestMainServiceProxy,
  ListResultDtoOfProjectInvestMainListDto } from '@shared/service-proxies/service-proxies';
@Component({
  selector: 'ng-select5',
  templateUrl: './select5.component.html',
})
//投资主体 下拉框
export class NzSelect5Component {
  // get selectedOption():any{
  //   return this.innerValue;
  // }

  selectedOption : Number;

  @Input() innerValue:Number;
  @Output() projectInvestMainId: EventEmitter<any> = new EventEmitter();
  mains = [];
  constructor(private http: _HttpClient,private proxy: ProjectInvestMainServiceProxy) {

  }
  changeV(v){
    this.projectInvestMainId.emit(v);
  }
  ngOnInit() {
    this.proxy.getProjectInvestMains()
      .subscribe ((data:ListResultDtoOfProjectInvestMainListDto)=> {
      this.mains = data.items;
    });
    this.selectedOption = this.innerValue;
  }
}
