import * as Express from 'express';
/**
 * 
 */
declare module '@therealbenpai/webutils' {
    declare module 'Crypt' {
        declare class CryptographyData {
            iv: string;
            key: string;
            data: string;
            prehash: string;
            posthash: string;
            constructor();
        }
        declare class Auto {
            static encrypt(data: string): string;
            static verify(data: string): boolean;
            static decrypt(data: string): string;
        }
        declare class Manual {
            static encrypt(data: string): string;
            static verify(data: string): boolean;
            static decrypt(data: string): string;
        }
        declare class Crypto {
            static Auto: Auto;
            static Manual: Manual;
            static completeHash(data: string): string;
        }
    }
    declare module 'Dict' {
        declare class Dict<K,V> {
            constructor(k:K,v:V);
            add(key: K, value: V): this;
            get(key: K): V;
            has(key: K): boolean;
            remove(key: K): this
            clear(): this;
            addMany(...values: [K, V][]): this;
            getMany(...keys: K[]): V[]
            hasMany(...keys: K[]): boolean
            removeMany(...keys: K[]): this
        }
    }
    declare function Headers(): Express.RequestHandler;
    declare function Logger(): Express.RequestHandler;
    declare function Trace(): Express.RequestHandler;
}