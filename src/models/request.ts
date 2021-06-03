export interface IPrivilegedKeyRequest {
    adminKey: string;
}

export interface ICreateKeyRequest extends IPrivilegedKeyRequest {
    service: string;
    permissions?: number;
}

export interface IFindKeyRequest extends IPrivilegedKeyRequest {
    key: string;
    service?: string;
}