import { ProductCategory } from './enums/product-category.enum';

export class Product {
    product_id: number;
    user_id: number;
    product_name: string;
    category: ProductCategory;
    description: string;
    product_photo: string;
    price: number;
    tag:string[];

    constructor(item?: any) {
        this.product_id = item?.product_id || null;
        this.user_id = item?.user_id || null;
        this.product_name = item?.product_name || ''; ;
        this.category = item?.category || null;
        this.description = item?.description || 0;
        this.product_photo = item?.product_photo || 'proyecto1.jpeg';
        this.price = item?.price || 0;
        this.tag = item?.tag || [''];
    }
}
