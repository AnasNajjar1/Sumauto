import axios, { AxiosError, AxiosInstance } from 'axios';

export abstract class BaseApi {
    protected baseUrl: string | undefined;

    protected bearerToken: string | undefined;

    protected responseType: string;

    protected headersAccept: string;

    private axiosInstance: AxiosInstance | any = null;

    constructor() {
        this.baseUrl = process.env.REACT_APP_AUTOBIZ_API_URL;
        this.bearerToken = process.env.REACT_APP_AUTOBIZ_API_TOKEN;
        this.responseType = 'json';
        this.headersAccept = 'application/json';
        this.axiosInstance = axios.create({});
        this.enableInterceptors();
    }

    private enableInterceptors(): void {
        this.axiosInstance.interceptors.response.use(
            this.getSuccessResponseHandler(),
            (err: AxiosError) => this.getErrorResponseHandler(err),
        );
    }

    private getSuccessResponseHandler() {
        return (response: AxiosError) => response;
    }

    private getErrorResponseHandler(err: AxiosError) {
        if (err.response?.status === 404) {
            throw new Error(`${err.config.url} not found`);
        }
        throw err;
    }

    public setResponseType(responseType: string): void {
        this.responseType = responseType;
    }

    public setHeadersAccept(headersAccept: string): void {
        this.headersAccept = headersAccept;
    }

    protected async get(url: string, params?: any): Promise<any> {
        return this.axiosInstance({
            method: 'GET',
            baseURL: this.baseUrl,
            url,
            params: params || null,
            responseType: this.responseType,
            headers: {
                Accept: this.headersAccept,
                Authorization: this.bearerToken ? `Bearer ${this.bearerToken}` : '',
            },
        });
    }

    protected async post(url: string, data?: any, params?: any): Promise<any> {
        return this.axiosInstance({
            method: 'POST',
            baseURL: this.baseUrl,
            url,
            data: data || null,
            params: params || null,
            headers: {
                Accept: this.headersAccept,
                Authorization: this.bearerToken ? `Bearer ${this.bearerToken}` : '',
            },
        });
    }

    protected async put(url: string, data?: any, params?: any): Promise<any> {
        return this.axiosInstance({
            method: 'PUT',
            baseURL: this.baseUrl,
            url,
            data: data || null,
            params: params || null,
            headers: {
                Accept: this.headersAccept,
                Authorization: this.bearerToken ? `Bearer ${this.bearerToken}` : '',
            },
        });
    }

    protected async delete(url: string, data?: any): Promise<any> {
        return this.axiosInstance({
            method: 'DELETE',
            baseURL: this.baseUrl,
            url,
            data: data || null,
            headers: {
                Accept: this.headersAccept,
                Authorization: this.bearerToken ? `Bearer ${this.bearerToken}` : '',
            },
        });
    }
}
