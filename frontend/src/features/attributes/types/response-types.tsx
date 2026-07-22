export interface AttributeResponse {
    code: number;
    value: string;
    type: number;
    description: string;
    count: number;
}

export interface Attribute {
    id: number;
    type: number;
    value: string;
    description: string;
}