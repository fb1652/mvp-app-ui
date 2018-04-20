export class Datacenter {
  Id: string;
  Name: string;
  Description: string;
  CreatedAt: Date;
  CreatedBy: string;
  UpdatedAt: Date;
  UpdatedBy: string;
  Role: string;
  Select: boolean;
  _original: any = {};

  constructor(datacenter: any = {}) {
    this.assign(datacenter);
  }

  assign(datacenter: any = {}) {
    this._original = Object.assign({}, { // copy
      id: datacenter.id,
      name: datacenter.name,
      description: datacenter.description,
      role: datacenter.role
    });
    this.Id = datacenter.id || this.Id;
    this.Name = datacenter.name || this.Name;
    this.Description = datacenter.description || this.Description;
    this.CreatedAt = datacenter.createdAt ? new Date(datacenter.createdAt) : this.CreatedAt;
    this.CreatedBy = datacenter.createdBy || this.CreatedBy;
    this.UpdatedAt = datacenter.updatedAt ? new Date(datacenter.updatedAt) : this.UpdatedAt;
    this.UpdatedBy = datacenter.updatedBy || this.UpdatedBy;
    this.Role = datacenter.role || this.Role;
    this.Select = datacenter.select || this.Select;
    return this;
  }

  raw(): any {
    return {
      id: this.Id,
      name: this.Name,
      description: this.Description,
      role: this.Role
    };
  }

}
