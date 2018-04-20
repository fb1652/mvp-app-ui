import { element, browser, by, Key, protractor } from 'protractor';

export class ReportsPage {

  getPage() {
    return browser.get('/Reports');
  }

  viewReport(row: number) {
    return browser.driver.wait(protractor.ExpectedConditions.presenceOf(element(by.id(`view-report-${row}`))))
    .then(() => element(by.id(`view-report-${row}`)).click())
    .then(() => browser.driver.sleep(1000));
  }
}
