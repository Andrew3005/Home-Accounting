import { Component, OnInit, Input } from '@angular/core';
import { Bill } from '../../shared/models/bill.model';


@Component({
  selector: 'app-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.scss']
})
export class BillCardComponent implements OnInit {

  @Input() bill: Bill;
  @Input() currency: any;

  dollar: number;
  euro: number;

  constructor() { }

  ngOnInit() {
    const { rates } = this.currency;
    this.euro = rates['EUR'] / rates['RUB'] * this.bill.value;
    this.dollar = this.euro * rates['USD'];
  }

}
