import { element, browser, by, Key, protractor } from 'protractor';

export class LoginPage {

  canSubmit() {
    return element(by.id('login-submit')).isEnabled();
  }

  enterEmail(email: string) {
    return element(by.id('login-email')).sendKeys(email)
    .then(() => browser.driver.sleep(100));
  }

  enterPassword(password: string) {
    return element(by.id('login-password')).sendKeys(password)
    .then(() => browser.driver.sleep(100));
  }

  getCreateAccount() {
    return element(by.id('login-create-account')).getText();
  }

  getEmail() {
    return element(by.id('login-email')).getAttribute('value');
  }

  getEmailLabel() {
    return element(by.css('label[for="login-email"]')).getText();
  }

  getForgotPassword() {
    return element(by.id('login-forgot-password')).getText();
  }

  getPage() {
    return browser.get('/login');
  }

  getPageTitle() {
    return element(by.id('login-title')).getText();
  }

  getPassword() {
    return element(by.id('login-password')).getAttribute('value');
  }

  getPasswordLabel() {
    return element(by.css('label[for="login-password"]')).getText();
  }

  getTitle() {
    return browser.getTitle();
  }

  submit() {
    return element(by.id('login-submit')).click();
  }

  toCreateAccount() {
    return element(by.id('login-create-account')).click();
  }

  toForgotPassword() {
    return element(by.id('login-forgot-password')).click();
  }

  wait() {
    return browser.driver.wait(protractor.ExpectedConditions.presenceOf(element(by.id('login-email'))));
  }
}
