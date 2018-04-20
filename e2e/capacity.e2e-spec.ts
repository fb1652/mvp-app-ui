import { by, browser, element } from 'protractor';
import { AppPage, BasePage, CatalogPage, DatacentersPage,
  LoginPage, OverviewPage, ReportsPage, ScansPage, StepsPage } from './pages';

describe('MRI', () => {

  const appPage = new AppPage();
  const basePage = new BasePage();
  // const capacityOptimizationPage = new CapacityOptimizationPage();
  const catalogPage = new CatalogPage();
  const datacentersPage = new DatacentersPage();
  const overviewPage = new OverviewPage();
  const reportsPage = new ReportsPage();
  const scansPage = new ScansPage();
  const stepsPage = new StepsPage();
  const datacenterName = `E2ENAME_CAPACITY_${new Date().getTime()}`;

  describe('capacity', () => {

    beforeAll(() => {
      return appPage.login()
      .then(() => catalogPage.toCapacityOptimization());
    });

    it('should have the correct overview title', () => {
      return overviewPage.getPageTitle('Capacity Optimization')
      .then((title: string) => {
        expect(title).toEqual('Capacity Optimization MRI');
      });
    });

    it('should have the start scan button', () => {
      return overviewPage.getScanButton().getText()
      .then((title: string) => {
        expect(title).toEqual('Start a Scan');
      });
    });

    it('should have start a scan enabled', () => {
      return overviewPage.scanEnabled()
      .then((can: boolean) => {
        expect(can).toEqual(true);
      });
    });

    it('should navigate to steps', () => {
      return overviewPage.startScan();
    });

    it('should have the correct step 1 title', () => {
      return stepsPage.getStep(1)
      .then((title: string) => {
        expect(title).toEqual('1. Choose a Datacenter');
      });
    });

    it('should disable previous', () => {
      return stepsPage.canPrevious()
      .then((can: boolean) => {
        expect(can).toEqual(false);
      });
    });

    it('should disable next', () => {
      return stepsPage.canNext()
      .then((can: boolean) => {
        expect(can).toEqual(false);
      });
    });

    it('should add a datacenter', () => {
      return datacentersPage.add(datacenterName, 'E2E TESTING');
    });

    it('should select the new datacenter', () => {
      return datacentersPage.choose(0);
    });

    it('should enable next', () => {
      return stepsPage.canNext()
      .then((can: boolean) => {
        expect(can).toEqual(true);
      });
    });

    it('should advance next', () => {
      return stepsPage.next()
      .then(() => stepsPage.wait(2)); // wait for the step to display
    });

    it('should have the correct step 2 title', () => {
      return stepsPage.getStep(2)
      .then((title: string) => {
        expect(title).toEqual('2. Run JCL on your Mainframe');
      });
    });

    it('should enable previous', () => {
      return stepsPage.canPrevious()
      .then((can: boolean) => {
        expect(can).toEqual(true);
      });
    });

    it('should enable next', () => {
      return stepsPage.canNext()
      .then((can: boolean) => {
        expect(can).toEqual(true);
      });
    });

    it('should advance next', () => {
      return stepsPage.next()
      .then(() => stepsPage.wait(3)); // wait for the step to display
    });

    it('should have the correct step 3 title', () => {
      return stepsPage.getStep(3)
      .then((title: string) => {
        expect(title).toEqual('3. Upload Data');
      });
    });

    it('should enable previous', () => {
      return stepsPage.canPrevious()
      .then((can: boolean) => {
        expect(can).toEqual(true);
      });
    });

    it('should disable next', () => {
      return stepsPage.canNext()
      .then((can: boolean) => {
        expect(can).toEqual(false);
      });
    });

    it('should upload a capacity scan', () => {
      return scansPage.upload('../data/CA.PLEXC1.Z14.Toolkit-12')
      .then(() => scansPage.upload('../data/CAPACITY', 1));
    });

    it('should enable next', () => {
      return stepsPage.canNext()
      .then((can: boolean) => {
        expect(can).toEqual(true);
      });
    });

    it('should advance next', () => {
      return stepsPage.next()
      .then(() => stepsPage.wait(3)); // wait for the step to display
    });

    it('should view the generated report', () => {
      return stepsPage.toReports();
      // .then(() => reportsPage.viewReport(0))
      // .then(() => capacityOptimizationPage.getTitle())
      // .then((title: string) => {
      //   expect(title).toEqual('Hardware');
      // });
    });

    it('should remove the datacenter', () => {
      return basePage.toDatacenters()
      .then(() => datacentersPage.delete(datacenterName));
    });

    it('should logout', () => {
      return appPage.logout();
    });
  });
});
