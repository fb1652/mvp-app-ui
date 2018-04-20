import { element, browser, by, Key, protractor } from 'protractor';

export class HardwarePage {

  getTitle() {
    return element(by.id('hardware-title')).getText();
  }
}
