import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import * as moment from 'moment';
import { Subscription } from 'rxjs/Subscription';

import { Category } from '../../shared/models/category.model';
import { APPEvent } from '../../shared/models/event.model';
import { EventsService } from '../../shared/services/events.service';
import { BillService } from '../../shared/services/bill.service';
import { Bill } from '../../shared/models/bill.model';
import { Message } from '../../../shared/models/message.model';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit, OnDestroy {

  constructor(private eventsService: EventsService,
    private billService: BillService) { }

  @Input() categories: Category[];

  sub1: Subscription;
  sub2: Subscription;

  types = [
    { type: 'income', label: 'Доход' },
    { type: 'outcome', label: 'Pacход' }
  ]

  message: Message;

  ngOnInit() {
    this.message = new Message('danger', '');
  }

  private showMessage(text) {
    this.message.text = text;
    window.setTimeout(() => this.message.text = '', 5000);
  }

  onSubmit(form) {
    let { amount, description, category, type } = form.value;
    if (amount < 0) amount *= -1;

    const event = new APPEvent(type, amount, +category, moment().format('DD.MM.YYYY HH:mm:ss'), description);

    this.sub1 = this.billService.getBill()
      .subscribe((bill: Bill) => {
        let value = 0;
        if (type === 'outcome') {
          if (amount > bill.value) {
            this.showMessage(`На счету не достаточно средств. Вам не хватает ${amount - bill.value}`);
            return;
          } else {
            value = bill.value - amount;
          }
        } else {
          value = bill.value + amount;
        }

        this.sub2 = this.billService.updateBill({ value: value, currency: bill.currency })
          .mergeMap(() => this.eventsService.addEvent(event))
          .subscribe(() => {
            form.setValue({
              amount: 1,
              description: ' ',
              category: 1,
              type: 'outcome'
            })
          })
      })
  }

  ngOnDestroy() {
    if (this.sub1) this.sub1.unsubscribe();
    if (this.sub2) this.sub2.unsubscribe();
  }

}
