export interface IProductCreate {
    name: string;
    price: number;
    discountPrice: number,
    description: string;
    categoryId: number,
    imagesId: number[],
    priority: number,
    status: boolean
}
export interface ICategoryItem {
    "id": number,
    "name": string,
    "priority": number,
    "image": string,
    "description": string,
    "parentId": number|null|undefined,
    "status":boolean
}
export interface IUploadImage {
    image: File|null;
}
//інформація про фото, яке завантажили на сервер
export interface IUploadImageResult {
    id: number;
    path: string;
}

interface ICategoryParentSelectProps {
    images: IUploadImageResult[];
    setImages: (images: IUploadImageResult[]) => void;
}