import { Either } from 'fp-ts/Either';

export type ApiErrorMessage = string;

export type ApiResponse<T> = Either<ApiErrorMessage, T>;
