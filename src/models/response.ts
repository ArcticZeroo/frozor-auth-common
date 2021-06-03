import { IApiKeyDto } from './key';

export interface IKeyResponse {
    key: string;
}

export interface ICreateKeyResponse extends IKeyResponse {

}

export interface IFindKeyResponse extends IApiKeyDto {
}