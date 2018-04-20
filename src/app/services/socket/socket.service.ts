import { Injectable, NgZone } from '@angular/core';
import * as io from 'socket.io-client';

import { Constants } from '../../support';

declare var window: any;

@Injectable()
export class SocketService {

  socket;

  constructor(private ngZone: NgZone) {
    this.ngZone.runOutsideAngular(() => {
      this.socket = io(`${window.location.protocol}//${window.location.hostname}`, { path: Constants.SOCKET_PATH });
    });
  }

  on(message: string, callback: (data) => any): void {
    this.socket.on(message, (event) => {
      this.ngZone.run(() => {
        callback(event);
      });
    });
  }

  emit(message: string, data: any): void {
    this.socket.emit(message, data);
  }

}
