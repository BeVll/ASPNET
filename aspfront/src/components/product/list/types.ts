
export interface IProductItem {
    id: number,
    name: string,
    price: number,
    discountPrice: number|null|undefined,
    images: IProductImageItem[],
    description: string,
    categoryId: number,
    categoryName: string,
    status:number
}

export interface IProductImageItem {
    id: number,
    path: string
}