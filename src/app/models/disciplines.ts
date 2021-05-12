export class Disciplines {
    discipline_id: number;
    discipline_name: string;
   

    constructor(item?: any) {
        this.discipline_id = item?.discipline_id || null;
        this.discipline_name = item?.discipline_name || '';
        
    }
}
