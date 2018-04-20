
export class Data {
  Id: string;
  Data: {
    filename: string,
    type: string,
    reports: any;
  };
  CreatedAt: Date;
  CreatedBy: string;
  UpdatedAt: Date;
  UpdatedBy: string;

  constructor(data: any = {}) {
    this.assign(data);
  }

  assign(data: any = {}) {
    this.Id = data.id || this.Id;
    this.Data = data.data || data.Data;
    this.CreatedAt = data.createdAt ? new Date(data.createdAt) : this.CreatedAt;
    this.CreatedBy = data.createdBy || this.CreatedBy;
    this.UpdatedAt = data.updatedAt ? new Date(data.updatedAt) : this.UpdatedAt;
    this.UpdatedBy = data.updatedBy || this.UpdatedBy;
  }
}
