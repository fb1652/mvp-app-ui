import {browser, by, element, protractor} from 'protractor';

export class DatacentersPage {
  private title_id: string = "datacenters-title";
  private define_id: string = "define-datacenter";
  private submit_id: string = "submit-datacenter";
  
  add(name: string, description: string) {
    return this.define()
      .then(() => this.enterName(name))
      .then(() => this.enterDescription(description))
      .then(() => this.submit());
  }
  
  choose(row: number) {
    // TODO use name
    return browser.driver.wait(protractor.ExpectedConditions.presenceOf(element(by.id('datacenter-0'))), 5000)
      .then(() => element(by.id('datacenter-0')).click());
  }
  
  define() {
    return element(by.id(this.define_id)).click();
  }
  
  
  delete(name: string) {
    // TODO use name
    return browser.driver.wait(protractor.ExpectedConditions.presenceOf(element(by.id('datacenter-0-delete'))), 5000)
      .then(() => element(by.id('datacenter-0-delete')).click())
      .then(() => element(by.cssContainingText('mat-option', 'DELETE')).click());
  }
  
  enterName(name: string) {
    return element(by.id('datacenter-name')).sendKeys(name)
      .then(() => browser.driver.sleep(100));
  }
  
  enterDescription(description: string) {
    return element(by.id('datacenter-description')).sendKeys(description)
      .then(() => browser.driver.sleep(100));
  }
  
  getPage() {
    return browser.get('/Datacenters');
  }
  
  submit() {
    return element(by.id(this.submit_id)).click();
  }
  
  getPageTitle() {
    return browser.driver.wait(protractor.ExpectedConditions.presenceOf(element(by.id(this.title_id))))
      .then(() => element(by.id(this.title_id)).getText());
  }
  
  escapeCreateDialog() {
    element(by.id('datacenter-name')).sendKeys(protractor.Key.ESCAPE);
  }
  
  inDefineDialog(text) {
    return element(by.id(text)).getText();
  }
  
  getLabelFor(id) {
    let labelCss = 'label[for="' + id + '"]';
    return element(by.css(labelCss)).getText();
  }
  
  getErrorMessageForName() {
    return element(by.css('mat-error')).getText();
  }
  
  errorMessageForName() {
    return element(by.css('mat-error')).isPresent();
  }
  
  submitState() {
    return element(by.id(this.submit_id)).isEnabled();
  }
  
  getTableRowCells(row)
  {
    var tabledata = element.all(by.id("datacenters-table"));
// get rows
    var rows = tabledata.all(by.css("mat-row")).get(row);
// get cell values
    var cells = rows.all(by.css("mat-cell"));
    return cells;
  }
  getFirstRow()
  {
    var tabledata = element.all(by.id("datacenters-table"));
// get rows
    var rows = tabledata.all(by.css("mat-row")).first();
// get cell values
    var cells = rows.all(by.css("mat-cell"));
    return cells;
  }
  
  clickViewDataCenter()
  {
    var cells = this.getFirstRow();
    cells.get(2).click();
  
    return browser.driver.wait(protractor.ExpectedConditions.presenceOf(element(by.id("datacenter-name"))))
      .then(() => element(by.id("datacenter-name")).getText());
  }
  
  getDatacenterTitle()
  {
    return element(by.id("datacenter-name")).getText();
  }
  
  
}
