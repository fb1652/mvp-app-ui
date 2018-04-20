import { element, browser, by, Key, protractor } from 'protractor';

export class BasePage {

  getTitle() {
    return browser.getTitle();
  }

  headerMenu() {
    return browser.driver.sleep(200)
    .then(() => browser.wait(protractor.ExpectedConditions.elementToBeClickable(element(by.id('header-menu'))), 5000))
    .then(() => element(by.id('header-menu')).click());
  }

  headerlogout() {
    return browser.driver.sleep(200)
    .then(() => browser.wait(protractor.ExpectedConditions.elementToBeClickable(element(by.id('header-logout'))), 5000))
    .then(() => element(by.id('header-logout')).click());
  }

  toCatalog() {
    return element(by.id('catalog-link')).click();
  }

  toReports() {
    return element(by.id('reports-link')).click();
  }

  toDatacenters() {
    return element(by.id('datacenters-link')).click();
  }

  toToolkit() {
    element(by.id('toolkit-link')).click();
  }

  toAbout() {
    element(by.id('about-link')).click();
  }

  wait() {
    return browser.driver.wait(protractor.ExpectedConditions.presenceOf(element(by.id('header-title'))));
  }
}
