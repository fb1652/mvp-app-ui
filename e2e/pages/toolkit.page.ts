import { element, browser, by, Key, protractor } from 'protractor';

export class ToolkitPage {

  getPage() {
    return browser.get('/Toolkit');
  }

  getTitle() {
    return element(by.id('toolkit-title')).getText();
  }
}
