

export class Advertisement {
  advertisement_id: number;
  advertisement_name: string;
  location: string;
  link: string;
  photo: string;
  discipline_name: string;
  deleted: boolean;


  constructor(item?: any) {
    this.advertisement_id = item.advertisement_id || null;
    this.advertisement_name = item.advertisement_name || '';
    this.link = item.link || '';
    this.photo = item.photo || '';
    this.location = item.location || '';
    this.discipline_name = item.discipline_name || 0;
    this.deleted = item.deleted;
  }
}