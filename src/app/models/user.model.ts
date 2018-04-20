export class User {

  Id: string;
  Email: string;
  First: string;
  Last: string;
  Company: string;
  Created: string;
  Role: string;
  Offerings: string[];
  Category: string;
  Offering: string;

  constructor(user: any = {}) {
    this.assign(user);
  }

  assign(user: any): User {
    this.Id = user.id || this.Id;
    this.Email = user.email || this.Email;
    this.First = user.first || this.First;
    this.Last = user.last || this.Last;
    this.Company = user.company || this.Company;
    this.Created = user.created || this.Created;
    this.Role = user.role || this.Role;
    this.Offerings = user.offerings || this.Offerings;
    return this;
  }

  raw(): any {
    return {
      id: this.Id,
      email: this.Email,
      first: this.First,
      last: this.Last,
      company: this.Company,
      created: this.Created,
      role: this.Role,
      offerings: this.Offerings
    };
  }

}
