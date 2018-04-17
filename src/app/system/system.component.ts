import { Component, HostBinding } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { fadeStateTrigger } from '../shared/animations/fade.animation';

@Component({
    selector: 'app-system',
    templateUrl: './system.component.html',
    animations: [fadeStateTrigger]
})
export class SystemComponent{
    @HostBinding('@fade') a = true;

    constructor(private title: Title){
        title.setTitle('Домашняя бухгалтерия')
    }
}