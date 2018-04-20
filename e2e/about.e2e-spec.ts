import { by, browser, element } from 'protractor';
import { AboutPage, AppPage, BasePage } from './pages';

describe('MRI', () => {

  const aboutPage = new AboutPage();
  const appPage = new AppPage();
  const basePage = new BasePage();

  describe('about', () => {

    beforeAll(() => {
      return appPage.login()
      .then(() => basePage.toAbout());
    });

    it('should have the correct title', () => {
      return aboutPage.getTitle()
      .then((title: string) => {
        expect(title).toEqual('Features');
      });
    });

    it('should logout', () => {
      return appPage.logout();
    });
  });
});
