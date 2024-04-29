import * as Express from 'express';
/**
 * 
 */
declare module '@therealbenpai/webutils' {
    namespace Crypt {
        interface CDataInterface {
            /** The initialization vector used to encrypt the data */
            iv: string;
            /** The key used to encrypt the data */
            key: string;
            /** The data that is encrypted */
            data: string;
            /** The data that is hashed before being encrypted */
            prehash: string;
            /** The data that is hashed after being encrypted */
            posthash: string;
        }
        /** A Utility class used to handle the {@link Auto Crypt.Auto Class} */
        class CryptographyData implements CDataInterface {
            iv: string;
            key: string;
            data: string;
            prehash: string;
            posthash: string;
            constructor();
        }
        interface AutoInterface {
            /** The function used to encrypt the data */
            static encrypt(data: string): string;
            /** The function used to verify the data */
            static verify(data: string): boolean;
            /** The function used to decrypt the data */
            static decrypt(data: string): string;
        }
        class Auto implements AutoInterface {
            static encrypt(data: string): string;
            static verify(data: string): boolean;
            static decrypt(data: string): string;
        }
        interface ManualInterface {
            /** The function used to encrypt the data */
            static encrypt(data: string): string;
            /** The function used to verify the data */
            static verify(data: string): boolean;
            /** The function used to decrypt the data */
            static decrypt(data: string): string;
        }
        class Manual implements ManualInterface {
            static encrypt(data: string): string;
            static verify(data: string): boolean;
            static decrypt(data: string): string;
        }
        interface CryptoInterface {
            static Auto: Auto;
            static Manual: Manual;
            static completeHash(data: string): string;
        }
        class Crypto implements CryptoInterface {
            static Auto: Auto;
            static Manual: Manual;
            static completeHash(data: string): string;
        }
    }
    interface DictInterface<K, V> {
        add(key: K, value: V): this;
        get(key: K): V;
        has(key: K): boolean;
        remove(key: K): this;
        clear(): this;
        addMany(...values: [K, V][]): this;
        getMany(...keys: K[]): V[];
        hasMany(...keys: K[]): boolean;
        removeMany(...keys: K[]): this;
    }

    class Dict<K, V> implements DictInterface<K, V> {
        constructor(k: K, v: V);
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
    function Headers(): Express.RequestHandler;
    function Logger(): Express.RequestHandler;
    function Trace(): Express.RequestHandler;
}