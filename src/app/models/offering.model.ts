export class Offering {
  Id: string;
  Name: string;
  Description: string;
  Free: boolean;
  Category: string;
  Access: string;
  Url: string;
  Required: string[];
  Optional: string[];
  Selected: boolean;
  ImageUrl: string;
  Overview: string;
  Provides: string;
  Prereq: string;
  
  Overview2Title: string=" MRI View Provides:";

  constructor(offering: any = {}) {
    this.assign(offering);
  }

  assign(offering: any = {}) {
    this.Id = offering.id || this.Id;
    this.Name = offering.name || this.Name;
    this.Overview2Title = this.Name + this.Overview2Title;
    this.Description = offering.description || this.Description;
    this.Free = offering.free || this.Free;
    this.Category = offering.category || this.Category;
    this.Access = offering.access || this.Access;
    this.Url = offering.Url || this.Url;
    this.Required = offering.required || this.Required || [];
    this.Optional = offering.optional || this.Optional || [];
    this.Selected = false;
    this.Overview = offering.Overview;
    this.Provides = offering.Provides;
    this.Prereq = offering.Prereq;
    if (offering.Overview2Title) {
    
      this.Overview2Title = offering.Overview2Title;
    }
  }

  raw(): any {
    return {
      id: this.Id,
      name: this.Name,
      description: this.Description,
      free: this.Free,
      category: this.Category,
      access: this.Access,
      url: this.Url
    };
  }

}
