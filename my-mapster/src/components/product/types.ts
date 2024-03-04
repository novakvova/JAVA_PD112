export interface IProductCreate {
    name: string;
    price: number;
    description: string;
    category_id: number;
    files: File[];
}

export interface IProductItem {
    id: number;
    name: string;
    price: number;
    description: string;
    category_id: number;
    files: string[];
}

export interface IGetProducts {
    list: IProductItem[],
    totalCount: number
}

export interface ICategoryName {
    id: number,
    name: string,
}

export interface IProductSearch{
    name?: string,
    description?: string,
    categoryId?: number,
    page: number,
    size: number
}