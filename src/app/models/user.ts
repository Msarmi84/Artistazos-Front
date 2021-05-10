// import { ProductCategory } from './enums/product-category.enum';

export class User {
  user_id?: number;
  date_of_birth: string;
  last_name: string;
  user_name: string;
  artistic_name: string;
  biography: string;
  location: string;
  password: string;
  avatar: string; // Para subir el avatar
  artistic_cv: string; // Para subir el cv artistico
  type: string;
  mail: string;
  discipline_id: number;
  tags: string[];

  constructor(item?: any) {
    this.date_of_birth = item.date_of_birth || '';
    this.last_name = item.last_name || '';
    this.user_id = item?.user_id || null;
    this.user_name = item.user_name || '';
    this.artistic_name = item.artistic_name || '';
    this.biography = item.biography || '';
    this.location = item.location || '';
    this.password = item.password || '';
    this.type = item.type || '';
    this.mail = item.mail || '';
    this.discipline_id = item.discipline_id || 0;
    this.avatar = item.avatar || null;
  }
}
