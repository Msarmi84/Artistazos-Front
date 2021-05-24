export class Advertisement {

  location: string; 
  link: string;
  photo: string;
  name: string;

  constructor(item?: any) {
      this.link = item?.link || '';
      this.photo = item?.photo || '';
      this.name = item?.name || '';
      this.location = item?.location || '';
  }
}