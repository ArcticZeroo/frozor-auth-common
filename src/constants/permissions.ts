import { serviceName } from './services';

export const permissions = {
    [serviceName.admin]: {
        viewKeys:   1 << 0,
        createKeys: 1 << 1
    },
    [serviceName.files]: {
        uploadFiles: 1 << 0,
    }
} as const;