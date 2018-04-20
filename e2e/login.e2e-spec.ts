import { by, browser, element } from 'protractor';
import { AppPage, BasePage, CreateAccountPage, LoginPage } from './pages';
import { protractor } from 'protractor/built/ptor';

const users = [{
  email: 'batman@dc.com',
  first: 'Bruce',
  last: 'Wayne'
}, {
  email: 'superman@dc.com',
  first: 'Clark',
  last: 'Kent'
}];

describe('MRI', () => {

  const appPage = new AppPage();
  const basePage = new BasePage();
  const createAccountPage = new CreateAccountPage();
  const loginPage = new LoginPage();

  describe('login', () => {

    beforeAll(() => {
      return loginPage.getPage()
      .then(() => {
        if (browser.params.auth === 'LOCAL') { // LOCAL authentication
          return createAccountPage.getPage()
          .then(() => protractor.promise.all(users.map((user) => { // create each user
            return createAccountPage.enterLast(user.last)
            .then(() => createAccountPage.enterFirst(user.first))
            .then(() => createAccountPage.enterEmail(user.email))
            .then(() => createAccountPage.enterPassword('P@ssword1'))
            .then(() => createAccountPage.enterConfirmation('P@ssword1'))
            .then(() => createAccountPage.submit())
            .then(() => createAccountPage.submitWait()); // user might already exist
          })))
          .then(() => loginPage.getPage())
          .catch(() => loginPage.getPage());
        }
      });
    });

    it('should have the correct title', () => {
      return loginPage.getTitle()
      .then((title: string) => {
        expect(title).toEqual('MRI');
      });
    });

    it('should have the correct page title', () => {
      return loginPage.getPageTitle()
      .then((title: string) => {
        expect(title).toEqual('Mainframe Resource Intelligence');
      });
    });

    it('should have the correct email label', () => {
      return loginPage.getEmailLabel()
      .then((label: string) => {
        expect(label).toEqual('Email');
      });
    });

    it('should have the correct password label', () => {
      return loginPage.getPasswordLabel()
      .then((label: string) => {
        expect(label).toEqual('Password');
      });
    });

    if (browser.params.auth === 'LOCAL') { // LOCAL authentication
      it('should have a create account link', () => {
        return loginPage.getCreateAccount()
        .then((link: any) => {
          expect(link).toBe('Create Account');
        });
      });

      it('should have a forgot password link', () => {
        return loginPage.getForgotPassword()
        .then((link: any) => {
          expect(link).toBe('Forgot Password');
        });
      });
    } else {
      it('should not have a forgot password link', (done) => {
        return loginPage.getCreateAccount()
        .then((link: any) => fail('Create Account'))
        .catch((error) => done());
      });

      it('should not have a forgot password link', (done) => {
        return loginPage.getForgotPassword()
        .then((link: any) => fail('Forgot Password'))
        .catch((error) => done());
      });
    }

    it('should have a disabled login button', () => {
      return loginPage.canSubmit()
      .then((canSubmit: any) => {
        expect(canSubmit).toBe(false);
      });
    });

    it('should enter an email', () => {
      return loginPage.enterEmail('batman@dc.com')
      .then(() => loginPage.getEmail())
      .then((value: string) => {
        expect(value).toEqual('batman@dc.com');
      });
    });

    it('should enter a password', () => {
      return loginPage.enterPassword('P@ssword1')
      .then(() => loginPage.getPassword())
      .then((value: string) => {
        expect(value).toEqual('P@ssword1');
      });
    });

    it('should enabled the login button', () => {
      return loginPage.canSubmit()
      .then((canSubmit: any) => {
        expect(canSubmit).toBe(true);
      });
    });

    it('should login', () => {
      return loginPage.submit()
      .then(() => basePage.wait());
    });

    it('should logout', () => {
      return appPage.logout();
    });
  });
});
