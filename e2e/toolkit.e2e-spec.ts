import { by, browser, element } from 'protractor';
import { AppPage, BasePage, ToolkitPage } from './pages';

describe('MRI', () => {

  const appPage = new AppPage();
  const basePage = new BasePage();
  const toolkitPage = new ToolkitPage();

  describe('toolkit', () => {

    beforeAll(() => {
      return appPage.login()
      .then(() => basePage.toToolkit());
    });

    it('should have the correct title', () => {
      return toolkitPage.getTitle()
      .then((title: string) => {
        expect(title).toEqual('Download and Install the MRI Toolkit');
      });
    });

    it('should logout', () => {
      return appPage.logout();
    });
  });
});
