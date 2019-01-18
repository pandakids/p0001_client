import { Component, OnInit } from '@angular/core';
import { RegService } from '../reg.service';

@Component({
  selector: 'regstep4',
  templateUrl: './regstep4.component.html',
  styleUrls: ['./regstep4.component.css']
})
export class Regstep4Component implements OnInit {

  person_info;
  
  constructor( public item: RegService) { }

  ngOnInit() {
  }

}
