import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'instrument',
  templateUrl: './instrument.component.html',
  styleUrls: ['./instrument.component.scss'],
})

export class InstrumentComponent implements OnInit {
  @Input() num;

  constructor() {
  }

  ngOnInit() {
  }
}
