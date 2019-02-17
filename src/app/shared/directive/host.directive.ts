import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[com-host]',
})
export class HostDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}