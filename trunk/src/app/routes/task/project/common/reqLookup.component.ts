import { ChangeDetectionStrategy, Component, forwardRef, OnInit, ViewEncapsulation,Input } from '@angular/core';
import { ProjectRequirementServiceProxy, ProjectReqTypeServiceProxy} from '@shared/service-proxies/service-proxies';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector     : 'project-requirement-lookup',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './reqLookup.component.html',
  providers:[ { 
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => ReqLookupComponent),
  }],
  styles: [`
  .certain-search-item-count {
    position: absolute;
    color: #999;
    right: 16px;
  }

  .more-link {
    float: right;
  }
  `]
})
export class ReqLookupComponent implements ControlValueAccessor, OnInit {
   @Input()  projectModuleId; 
  data: any[]=[];
  inputValue: any;
  constructor(private projectRequirementServiceProxy:ProjectRequirementServiceProxy,
    private projectReqTypeServiceProxy: ProjectReqTypeServiceProxy,
    ){

  }
  onChange(value: any): void {
    if (value) {
     this.propagateChange(value.id);
    }
  }

  ngOnInit(): void {
   //this.initData();
  }

  initData(){
    this.data=[];
    forkJoin(
        this.projectRequirementServiceProxy.getProjectRequirements(this.projectModuleId),
        this.projectReqTypeServiceProxy.getProjectReqTypes()
        )
      .subscribe(([res1, res2])=>{
        if (res2.items){
          res2.items.forEach(type=>{
            let reqType:any = {}
            reqType=type;
            if (res1.items){
              reqType.children=res1.items.filter(data=>data.projectReqTypeId==type.id);
            }
            if (reqType.children.length>0){
              this.data.push(reqType);
            }
            
          });
        }
      },
      error=>{console.log(error)},
      ()=>{ });
  }

    writeValue(value: any) {
      this.inputValue = value;
      this.propagateChange(value)

    }

    registerOnChange(fn: (_: any) => void): void {
        this.propagateChange = fn;
    }

    propagateChange = (_: any) => { 
    }

    registerOnTouched(fn: any) {
    }
     setDisabledState(isDisabled: boolean): void{
     }

}
