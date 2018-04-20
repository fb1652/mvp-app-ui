import { element, browser, by, Key, protractor } from 'protractor';

export class CreateAccountPage {

  enterEmail(email: string) {
    return element(by.id('create-account-email')).clear()
    .then(() => element(by.id('create-account-email')).sendKeys(email))
    .then(() => browser.driver.sleep(100));
  }

  enterFirst(first: string) {
    return element(by.id('create-account-first')).clear()
    .then(() => element(by.id('create-account-first')).sendKeys(first))
    .then(() => browser.driver.sleep(100));
  }

  enterLast(last: string) {
    return element(by.id('create-account-last')).clear()
    .then(() => element(by.id('create-account-last')).sendKeys(last))
    .then(() => browser.driver.sleep(100));
  }

  enterPassword(password: string) {
    return element(by.id('create-account-password')).clear()
    .then(() => element(by.id('create-account-password')).sendKeys(password))
    .then(() => browser.driver.sleep(100));
  }

  enterConfirmation(confirmation: string) {
    return element(by.id('create-account-confirm')).clear()
    .then(() => element(by.id('create-account-confirm')).sendKeys(confirmation))
    .then(() => browser.driver.sleep(100));
  }

  getPage() {
    return browser.get('/createAccount');
  }

  submit() {
    return element(by.id('create-account-submit')).click();
  }

  submitWait() {
    return browser.driver.wait(protractor.ExpectedConditions.presenceOf(element(by.id('create-account-login'))), 1000);
  }

  toLogin() {
    return element(by.id('create-account-login')).click();
  }

  wait() {
    return browser.driver.wait(protractor.ExpectedConditions.presenceOf(element(by.id('create-account-email'))));
  }
}
