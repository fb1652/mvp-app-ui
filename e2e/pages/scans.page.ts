import { element, browser, by, Key, protractor } from 'protractor';
import * as path from 'path';

export class ScansPage {

  upload(filepath, index = 0) {
    return element(by.xpath('//p-fileupload/div/div/span/input')).sendKeys(path.resolve(__dirname, filepath))
    .then(() => browser.driver.wait(protractor.ExpectedConditions.presenceOf(element(by.id(`delete-scan-${index}`)))));
  }
}
