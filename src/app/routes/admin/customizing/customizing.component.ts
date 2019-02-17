import { Component, OnInit, ViewChild, ComponentFactoryResolver} from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { SFSchema } from '@delon/form';
import { HostDirective } from '@shared/directive/host.directive';
import { CUSTOMIZING_CONFIG, CustomizingItem } from './customizing-config';
import { PrjTaskStatusComponent } from './prj-task-status/prj-task-status.component';
@Component({
  selector: 'task-customizing',
  templateUrl: './customizing.component.html',
  styleUrls  : [ './customizing.component.less']
})
export class CustomizingComponent implements OnInit {

  items = CUSTOMIZING_CONFIG;
  @ViewChild(HostDirective) comHost: HostDirective;
  activeIdex: number = 0;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    ) {
  }

  ngOnInit() {
    if (this.items.length >0)
    {
      this.loadComponent(this.items[0]);
    }
  }

  loadComponent(currentItem: CustomizingItem) {

    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(currentItem.component);

    let viewContainerRef = this.comHost.viewContainerRef;
    viewContainerRef.clear();

    let componentRef = viewContainerRef.createComponent(componentFactory);
    (<PrjTaskStatusComponent>componentRef.instance).inputData = currentItem.data;
  }

  itemClicked(ev: any){
    console.log(this.activeIdex==ev.data.index);
    this.loadComponent(ev);
  }

}
