import { Component, OnInit } from '@angular/core';
import { RegService } from './reg.service';

@Component({
  selector: 'stepregister',
  templateUrl: './stepregister.component.html',
  styleUrls: ['./stepregister.component.less'],
  providers: [RegService]
})
export class StepregisterComponent implements OnInit {

  constructor(public item: RegService) { }

  ngOnInit() {
  }

}
