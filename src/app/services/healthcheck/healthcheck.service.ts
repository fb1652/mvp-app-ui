import {EventEmitter, Injectable, Output} from '@angular/core';
import {HealthcheckException} from '../../support';

declare const window: any;

@Injectable()
export class HealthcheckService {

  exception: HealthcheckException = undefined;
  @Output() healthcheckRow: EventEmitter<HealthcheckException> = new EventEmitter();

  constructor() {}

  getHealthcheckException() {
    return this.exception;
  }

  setHealthcheckException(exception) {
    this.exception = exception;
    this.healthcheckRow.emit(exception);
  }

  getSelectedChangeEmitter() {
    return this.healthcheckRow;
  }
}
