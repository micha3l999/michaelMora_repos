import { IGlobalResponseError } from './IGlobalResponseError';

export const GlobalResponseError: (message: string) => IGlobalResponseError = (
    message: string,
): IGlobalResponseError => {
    return {
        message,
        success: false,
    };
};