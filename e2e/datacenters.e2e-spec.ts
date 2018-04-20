/*
 * *****************************************************************************
 * Copyright (c) 2018 CA. All rights reserved.
 *   <p/>
 *   This software and all information contained therein is confidential and proprietary and shall not be duplicated,
 *   used, disclosed or disseminated in any way except as authorized by the applicable license agreement, without the
 * express written permission of CA. All authorized reproductions must be marked with this language.
 *   <p/>
 *   EXCEPT AS SET FORTH IN THE APPLICABLE LICENSE AGREEMENT, TO THE EXTENT PERMITTED BY APPLICABLE LAW, CA PROVIDES THIS
 *   SOFTWARE WITHOUT WARRANTY OF ANY KIND, INCLUDING WITHOUT LIMITATION, ANY IMPLIED WARRANTIES OF MERCHANTABILITY OR
 *   FITNESS FOR A PARTICULAR PURPOSE. IN NO EVENT WILL CA BE LIABLE TO THE END USER OR ANY THIRD PARTY FOR ANY LOSS OR
 * DAMAGE, DIRECT OR INDIRECT, FROM THE USE OF THIS SOFTWARE, INCLUDING WITHOUT LIMITATION, LOST PROFITS, BUSINESS
 *   INTERRUPTION, GOODWILL, OR LOST DATA, EVEN IF CA IS EXPRESSLY ADVISED OF SUCH LOSS OR DAMAGE.
 * ****************************************************************************
 */

import {by, browser, element, protractor} from 'protractor';
import { AppPage, BasePage, CatalogPage, DatacentersPage,
  LoginPage, OverviewPage, ReportsPage, ScansPage, SoftwarePage, StepsPage } from './pages';

describe('MRI', () => {

  const appPage = new AppPage();
  const datacentersPage = new DatacentersPage();
  
  const datacenterName = `NEWNAME${new Date().getTime()}`;
 

  describe('datacenters', () => {

    beforeAll(() => {
      return appPage.login()
      .then(() => datacentersPage.getPage());
    });

    it('should have the correct title', () => {
      return datacentersPage.getPageTitle()
      .then((title: string) => {
        expect(title).toEqual('My Datacenters');
      });
    });
    
    it('should open create datacenter dialog title', () => {
      return datacentersPage.define().then(() => datacentersPage.inDefineDialog('action-datacenter')
        .then((title: string) => {
          expect(title).toEqual('Define a Datacenter');
        }));
    });
   
    it('should have datacenter name', () => {
      return datacentersPage.getLabelFor('datacenter-name')
        .then((text: string) => {
          expect(text).toEqual('Name');
        });
    });
    
    it('should have datacenter description', () => {
      return datacentersPage.getLabelFor('datacenter-description')
        .then((text: string) => {
          expect(text).toEqual('Description');
        });
    });
    
    it('should have error message if no datacenter name', () => {
      return datacentersPage.getErrorMessageForName()
        .then((text: string) => {
          expect(text).toEqual('You must enter a Name.');
        });
    });
    
    it('should have define button disabled if no datacenter name', () => {
      return datacentersPage.submitState()
        .then((state: boolean) => {
          expect(state).toEqual(false);
        });
    });
    
    it('should not have error message if datacenter name', () => {
      return datacentersPage.enterName(datacenterName).then(()=>datacentersPage.errorMessageForName())
        .then((present: boolean) => {
          expect(present).toEqual(false);
        });
    });
    
    it('should have define button enable if  datacenter name', () => {
      return datacentersPage.submitState()
        .then((state: boolean) => {
          expect(state).toEqual(true);
        });
    });
    
    it('should go back to main page after opening the create datacenter dialog', () => {
      return datacentersPage.escapeCreateDialog();
    });
    
    it('should have right cells in datacenter table', () => {
      var cells = datacentersPage.getTableRowCells(0);
      expect(cells.get(0).getText()).toContain("_");
      expect(cells.get(1).getText()).toContain("E2E TEST");
      return expect(cells.get(2).getText()).toEqual("VIEW DATACENTER");
    });
    
    
    it('should navigate to datacenter page for the first row', () => {
      var cells = datacentersPage.getTableRowCells(0);
      var name=cells.get(0).getText();
      var newPageTitle = datacentersPage.clickViewDataCenter();
      return expect(name).toEqual(newPageTitle);
    });
    it('should logout', () => {
      return appPage.logout();
    });
    
  });
});
