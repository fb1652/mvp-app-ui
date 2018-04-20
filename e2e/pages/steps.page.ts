import { element, browser, by, Key, protractor } from 'protractor';

export class StepsPage {

  canNext() {
    return element(by.id('next-step')).isEnabled();
  }

  canPrevious() {
    return element(by.id('previous-step')).isEnabled();
  }

  getPage(offering: string) {
    offering = offering.replace(' ', '%20'); // encode
    return browser.get(`/Catalog/${offering}/Steps`);
  }

  getStep(step: number) {
    return element(by.id(`step-${step}-title`)).getText();
  }

  next() {
    return element(by.id('next-step')).click();
  }

  previous() {
    return element(by.id('previous-step')).click();
  }

  toReports() {
    return browser.driver.sleep(1000)
    .then(() => element(by.id('reports')).click());
  }

  wait(step: number) {
    return browser.driver.wait(protractor.ExpectedConditions.presenceOf(element(by.id(`step-${step}-title`))));
  }
  getStep1Title() {
    return element(by.id('step-1-title')).getText();
  }
}
