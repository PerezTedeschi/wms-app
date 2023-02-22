export interface warehouseModel {
    id: number,
    code: string,
    name: string,
    address: string,
    state: string,
    latitude: string,
    longitude: string,
    country: string,
    zip: string
}

export interface warehouseCreateModel {        
    code: string,
    name: string,
    address: string,
    state: string,
    country: string,
    zip: string,
    file?: Blob
}