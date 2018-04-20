import { element, browser, by, Key, protractor } from 'protractor';

export class CatalogPage {

  toHardware() {
    return element(by.id('Hardware')).click();
  }

  toSoftware() {
    return element(by.id('Software')).click();
  }

  toHealthChecks() {
    return element(by.id('Health Checks')).click();
  }

  toCapacityOptimization() {
    return element(by.id('Capacity Optimization')).click();
  }

  toSpecialtyEngines() {
    return element(by.id('Specialty Engines')).click();
  }
}
