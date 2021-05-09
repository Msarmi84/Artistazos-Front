export class UserSearch {
  user_name?: string;
  last_name?: string;
  location?: string;
  discipline_id?: number;
  tags?: string[];

  constructor(item?: any) {
    this.user_name = item.last_name;
    this.last_name = item.last_name;
    this.location = item.location;
    this.discipline_id = item.discipline_id || 0;
    this.tags = item.tags || [];
  }

  getQuery(): string {
    let query = '';
    if (this.user_name !== undefined) {
      query += `user_name=${this.user_name}`;
    }
    if (this.last_name !== undefined) {
        query += `last_name=${this.last_name}`;
    }
    if (this.location !== undefined) {
        query += `location=${this.location}`;
    }
    if (this.discipline_id !== undefined) {
        query += `discipline_id=${this.discipline_id}`;
    }
    if (this.tags !== undefined && this.tags.length > 0) {
        query += `tags=${this.tags.join(',')}`;
    }
    return query;
  }
}
