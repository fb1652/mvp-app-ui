import { element, browser, by, Key, protractor } from 'protractor';

export class AboutPage {

  getPage() {
    return browser.get('/About');
  }

  getTitle() {
    return element(by.id('about-title')).getText();
  }
}
