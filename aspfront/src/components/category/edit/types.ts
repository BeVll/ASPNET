export interface ICategoryEdit {
    name: string,
    image: File,
    status: boolean,
    description: string,
    imgChange: boolean,
    parentId:number,
    priority:number
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