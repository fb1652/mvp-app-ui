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

import { element, browser, by, Key, protractor } from 'protractor';

export class OverviewPage {
  
  name: string;
  
  getPage(name: string) {
    name = name.replace(' ', '%20'); // encode
    this.name = name;
    
    return browser.get('/Catalog/' + name + '/Overview');
  }

  getPageTitle(offeringName: string) {
    const title_id = offeringName + '-title-id';
    return browser.driver.wait(protractor.ExpectedConditions.presenceOf(element(by.id(title_id))))
    .then(() => element(by.id(title_id)).getText());
  }

  getScanButton() {
    return element(by.id('start-scan-button'));
  }

  scanEnabled() {
    return element(by.id('start-scan-button')).isEnabled();
  }
  
  clickPage()
  {
     return browser.driver.sleep(1000)
      .then(() => element(by.id('offering_sidenav-container')).click());
  }
  
  
  startScan() {
     return browser.driver.sleep(1000)
    .then(() => element(by.id('start-scan-button')).click());
  }
  
  getGuidenceLink(text)
  {
    text = 'a[href*="https://docops.ca.com/display/CMRI10/' + text + '"]';
    return browser.driver.wait(protractor.ExpectedConditions.presenceOf(element(by.css(text))))
      .then(() => element(by.css(text)).isDisplayed());
  }
  
  goToGuidance()
  {
    return browser.driver.sleep(500)
      .then(() => element(by.id('help-guidance')).click());
  }
  

}
