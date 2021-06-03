interface IApiKeyBase {
    key: string;
    service: string;
    permissions: number;
}

export interface IApiKey extends IApiKeyBase{
    createdAt: Date;
}

export interface IApiKeyDto extends IApiKeyBase {
    createdAt: string;
}

export interface IFindApiKeyParams {
    key: string;
    service?: string;
}

export type ICreateApiKeyParams = Omit<IApiKey, 'createdAt'>;

export const keyFromDto = (dto: IApiKeyDto): IApiKey => ({
    ...dto,
    createdAt: new Date(dto.createdAt)
});

export const dtoFromKey = (key: IApiKey): IApiKeyDto => ({
    ...key,
    createdAt: key.createdAt.toISOString()
});