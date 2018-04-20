import {EventEmitter, Injectable, Output} from '@angular/core';

declare const window: any;

@Injectable()
export class SortTableService {

  @Output() data: EventEmitter<any> = new EventEmitter();

  constructor() {}

  emit(value) {
    this.data.emit(value);
  }

  getService() {
    return this.data;
  }
}
