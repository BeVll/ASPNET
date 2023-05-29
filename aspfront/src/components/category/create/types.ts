export interface ICategoryCreate {
    name: string,
    image: File,
    description: string,
    status:boolean,
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