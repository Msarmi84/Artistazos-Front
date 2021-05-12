import { ProductCategory } from './enums/product-category.enum';

export class Product {
    id: number;
    product_name: string;
    category: ProductCategory;
    description: string;
    photo: string;
    price: number;
    tag:string[];

    constructor(item?: any) {
        this.id = item?.id || null;
        this.product_name = item?.product_name || '';
        this.category = item?.category || null;
        this.description = item?.description || 0;
        this.photo = item?.photo || '';
        this.price = item?.price || 0;
        this.tag = item?.tag || [''];
    }
}
