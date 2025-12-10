// types/common.d.ts

export type Nullable<T> = T | null;

export type Maybe<T> = T | null | undefined;

export interface WithTimestamp {
    createdAt: string;
    updatedAt: string;
}

export type ID = string | number;
