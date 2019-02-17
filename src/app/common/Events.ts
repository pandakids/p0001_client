import { EventEmitter } from '@angular/core';

export enum EventType {
    ProfilePictureChanged = 1,
    Unknown,
}

export class Events {
    static common: EventEmitter<any> = new EventEmitter<any>();
}