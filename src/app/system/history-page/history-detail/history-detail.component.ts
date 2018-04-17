import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { CategoriesService } from '../../shared/services/categories.service';
import { EventsService } from '../../shared/services/events.service';
import { APPEvent } from '../../shared/models/event.model';
import { Category } from '../../shared/models/category.model';

@Component({
  selector: 'app-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.scss']
})
export class HistoryDetailComponent implements OnInit, OnDestroy {

  event: APPEvent;
  category: Category;
  sub1: Subscription;
  isLoaded = false;

  constructor(private route: ActivatedRoute,
    private categoriesService: CategoriesService,
    private eventsService: EventsService) { }

  

  ngOnInit() {
    this.sub1 = this.route.params
    .mergeMap((params: Params) => this.eventsService.getEventById(params['id']))
    .mergeMap((event: APPEvent) => {
      this.event = event;
      return this.categoriesService.getCategoryById(event.category);
      
    })
      .subscribe((category: Category) => {
        this.category = category;
        this.isLoaded = true;
      })
  }

  ngOnDestroy(){
    if(this.sub1){
      this.sub1.unsubscribe();
    }
  }

}
