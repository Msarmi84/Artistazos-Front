export class Tags {
    tag_id: number;
    tag_name: string;
   

    constructor(item?: any) {
        this.tag_id = item?.tag_id || null;
        this.tag_name = item?.tag_name || '';
        
    }
}
