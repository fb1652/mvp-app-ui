import { element, browser, by, Key, protractor } from 'protractor';
import { BasePage } from './base.page';
import { LoginPage } from './login.page';

const basePage = new BasePage();
const loginPage = new LoginPage();

export class AppPage {

  login(email = 'batman@dc.com', password = 'P@ssword1') { // defaults
    return loginPage.getPage()
    .then(() => loginPage.enterEmail(email))
    .then(() => loginPage.enterPassword(password))
    .then(() => loginPage.submit())
    .then(() => basePage.wait());
  }

  logout() {
    return basePage.headerMenu()
    .then(() => basePage.headerlogout())
    .then(() => loginPage.wait());
  }
}
