export class Report {

  Id: string;
  Date: string;
  Type: string;
  DatacenterId: string;
  Datacenter: string;
  Description: string;
  User: string;
  Status: string;
  Step: string;
  Progress: number;
  Data: any;
  Error: string;

  constructor(offering: any = {}) {
    this.assign(offering);
  }

  assign(offering: any = {}) {
    if (offering.id) { this.Id = offering.id; } // id
    if (offering.createdAt) { this.Date = new Date(offering.createdAt).toLocaleString(); } // date
    if (offering.createdBy) { this.User = offering.createdBy; } // set user
    if (offering.status) {
      this.Status = offering.status.state; // set status
      this.Step = offering.status.stepName; // set step
      const step = offering.status.step;
      const total = offering.status.total;
      this.Progress = step && total > 0 ? (step / total) * 100 : 0; // set progress
      if (offering.status.error) { this.Error = offering.status.error.message; }
    }
    if (offering.data) {
      if (offering.data.offering) { this.Type = offering.data.offering; } // set offering type info
      if (offering.data.datacenter) {
        if (offering.data.datacenter.id) { this.DatacenterId = offering.data.datacenter.id; } // datacenter id
        if (offering.data.datacenter.name) { this.Datacenter = offering.data.datacenter.name; } // datacenter name
        if (offering.data.datacenter.description) { this.Description = offering.data.datacenter.description; } // datacenter description
      }
    }
    return this;
  }

}
