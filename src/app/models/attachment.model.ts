export class Attachment {

  Id: string;
  Filename: string;
  Description: string;
  Uploaded: string;
  Type: string;
  _original: any;

  constructor(attachment: any = {}) {
    this.assign(attachment);
  }

  assign(attachment: any = {}) {
    this._original = Object.assign({}, { // copy
      id: attachment.id,
      filename: attachment.filename,
      description: attachment.description
    });
    this.Id = attachment.id || this.Id;
    this.Filename = attachment.filename || this.Filename;
    this.Description = attachment.description || this.Description;
    this.Uploaded = new Date(attachment.createdAt).toLocaleString() || this.Uploaded;
    // alias
    // this.Type = attachment.types.includes('SCAN') ? 'SCAN' : attachment.types.contains('CONTRAST') ? 'CONTRAST' : '';
    if (attachment.types) {
      if (attachment.types.includes('HARDWARE/SOFTWARE')) { this.Type = 'ENV'; }
      if (attachment.types.includes('HEALTHCHECK')) { this.Type = 'HEALTHCHECK'; }
      if (attachment.types.includes('CAPACITY')) { this.Type = 'CAPACITY'; }
    }
    return this;
  }

  raw(): any {
    return {
      id: this.Id,
      filename: this.Filename,
      description: this.Description
    };
  }

  type() {
    return this.Type === 'ENV' ? 'HARDWARE/SOFTWARE' : this.Type;
  }
}
