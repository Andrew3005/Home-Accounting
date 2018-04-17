import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-currency-card',
  templateUrl: './currency-card.component.html',
  styleUrls: ['./currency-card.component.scss']
})
export class CurrencyCardComponent implements OnInit {

  @Input() currency: any;

  euro: number;
  dollar: number;
  currencies: Array<{}> = [];


  
  constructor() { }

  ngOnInit() {
    const { rates } = this.currency;
    this.euro = rates['EUR'] / rates['RUB'];
    this.dollar = this.euro * rates['USD'];
    this.currencies = [
      {name: 'EUR', value: this.euro},
      {name: 'USD', value: this.dollar}
    ];
  }


}
