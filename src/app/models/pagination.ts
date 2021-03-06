export interface PaginationPropertySort {
    direction: string;
    property: string;
}

export interface PaginationPage<T> {
    content?: Array<T>;
    last?: boolean;
    first?: boolean;
    number: number;
    size: number;
    totalPages?: number;
    numberOfElements?: number;
    totalElements?: number;
    itemsPerPage?: number;
    sort?: Array<PaginationPropertySort>;
}
