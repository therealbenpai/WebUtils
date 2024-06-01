import * as Express from 'express';

namespace Interfaces {
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
    interface AutoInterface {
        /** The function used to encrypt the data */
        static encrypt(data: string): string;
        /** The function used to verify the data */
        static verify(data: string): boolean;
        /** The function used to decrypt the data */
        static decrypt(data: string): string;
    }
    interface ManualInterface {
        /** The function used to encrypt the data */
        static encrypt(data: string, iv: string, key: string): string;
        /** The function used to verify the data */
        static verify(data: string, iv: string, key: string): boolean;
        /** The function used to decrypt the data */
        static decrypt(data: string, iv: string, key: string): string;
    }
    interface CryptoInterface {
        static Auto: Classes.Auto;
        static Manual: Classes.Manual;
        static completeHash(data: string): string;
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
}

namespace Classes {
    /** A Utility class used to handle the {@link Auto Crypt.Auto Class} */
    class CryptographyData implements Interfaces.CDataInterface {
        iv: string;
        key: string;
        data: string;
        prehash: string;
        posthash: string;
        constructor();
    }
    class Auto implements Interfaces.AutoInterface {
        static encrypt(data: string): string;
        static verify(data: string): boolean;
        static decrypt(data: string): string;
    }
    class Manual implements Interfaces.ManualInterface {
        static encrypt(data: string): string;
        static verify(data: string): boolean;
        static decrypt(data: string): string;
    }
    class Crypto implements Interfaces.CryptoInterface {
        static Auto: Auto;
        static Manual: Manual;
        static completeHash(data: string): string;
    }
    class Dict<K,V> implements DictInterface {
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
}

declare module '@therealbenpai/webutils' {
    const Crypt: Classes.Crypto;
    const Dict: Classes.Dict;
    function Headers(): Express.RequestHandler;
    function Logger(): Express.RequestHandler;
    function Trace(): Express.RequestHandler;
}