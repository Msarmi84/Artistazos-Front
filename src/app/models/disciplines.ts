export class Disciplines {
    id: number;
    name: string;
   

    constructor(item?: any) {
        this.id = item?.id || null;
        this.name = item?.name || '';
        
    }
}
