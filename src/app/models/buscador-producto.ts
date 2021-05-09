import { ProductCategory } from './enums/product-category.enum';

export interface BuscadorProducto{
    name: string;
    category: ProductCategory;
    artist: string;
    minPrice: number;
    maxPrice: number;
}
