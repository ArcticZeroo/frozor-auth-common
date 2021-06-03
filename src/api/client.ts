import { isDuckType } from '@arcticzeroo/typeguard';
import fetch from 'node-fetch';
import { baseUrl } from '../constants/web';
import { IApiKey, keyFromDto } from '../models/key';
import { ICreateKeyRequest, IFindKeyRequest } from '../models/request';
import { ICreateKeyResponse, IFindKeyResponse } from '../models/response';
import { withQueryParams } from '../util/url';

export abstract class AuthClient {
    private static _getUrl(path: string = '') {
        return `${baseUrl}/${path}`;
    }

    public static async createKeyAsync({ adminKey, service, permissions }: ICreateKeyRequest): Promise<string> {
        const requestUrl = withQueryParams(this._getUrl(), {
            adminKey,
            service,
            permissions: permissions.toString()
        });

        const response = await fetch(requestUrl, {
            method: 'POST',
        });

        if (!response.ok) {
            throw new Error('Could not create API key');
        }

        const json = await response.json();

        if (!isDuckType<ICreateKeyResponse>(json, {
            key: 'string',
        })) {
            throw new Error('Response is not a create key response');
        }

        return json.key;
    }

    public static async findKeyAsync({ adminKey, key, service }: IFindKeyRequest): Promise<IApiKey> {
        const requestUrl = withQueryParams(this._getUrl(), {
            adminKey,
            key,
            service
        });

        const response = await fetch(requestUrl);

        if (!response.ok) {
            throw new Error('Could not fetch API key.');
        }

        const json = await response.json();

        if (!isDuckType<IFindKeyResponse>(json, {
            key:         'string',
            service:     'string',
            createdAt:   'string',
            permissions: 'number'
        })) {
            throw new Error('Response is not an API key');
        }

        return keyFromDto(json);
    }
}