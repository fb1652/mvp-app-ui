import { element, browser, by, Key, protractor } from 'protractor';

export class HealthcheckPage {

  getTitle() {
    return element(by.id('healthcheck-title')).getText();
  }
}
