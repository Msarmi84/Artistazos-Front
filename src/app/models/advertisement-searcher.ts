

export class AdvertisementSearcher{
    advertisement_name: string;
    location: string;
    discipline_name:string;

    constructor(item?: any) {
        this.advertisement_name = item?.advertisement_name || '';
        this.location = item?.location || '';
        this.discipline_name = item?.discipline_name || '';
    }
}
