const Chalk = require('chalk');
const crypto = require('crypto');
const { Buffer } = require('buffer');
const assert = require('assert/strict');
const chalk = new Chalk.Instance({ level: 3 });

class Index {
    static Dict = class {
        constructor(_, __) {
            this.dict = new Map();
        }
        add(key, value) {
            this.dict.set(key, value);
            return this;
        }
        get(key) {
            return this.dict.get(key);
        }
        has(key) {
            return this.dict.has(key);
        }
        remove(key) {
            this.dict.delete(key);
            return this;
        }
        clear() {
            this.dict.clear();
            return this;
        }
        addMany(...values) {
            (new Array(values.length)).forEach(([k, v]) => this.add(k, v));
            return this;
        }
        getMany(...keys) {
            return keys.map(this.get);
        }
        hasMany(...keys) {
            return keys.every(this.has);
        }
        removeMany(...keys) {
            keys.forEach(this.remove);
            return this;
        }
    };
    static Headers = (req, res, next) => {
        res
            .setHeader('X-OS', process.platform)
            .setHeader('X-Frame-Options', 'SAMEORIGIN')
            .setHeader('Referrer-Policy', 'same-origin')
            .setHeader('X-Content-Type-Options', 'nosniff')
            .setHeader('NEL', '{"report_to":"default","max_age":31536000,"include_subdomains":true}')
            .setHeader('Document-Policy', 'unsized-media=?0, document-write=?0, max-image-bpp=2.0, frame-loading=lazy, report-to=doc-ep');
        return next();
    };
    static Logger = (mreq, mres, next) => require('response-time')((req, res, time) => {
        class CC {
            static colors = new Index.Dict('', chalk)
                .addMany(
                    ['dr', chalk.rgb(120, 0, 0)],
                    ['lr', chalk.rgb(250, 120, 120)],
                    ['o', chalk.rgb(255, 120, 0)],
                    ['y', chalk.yellow],
                    ['dg', chalk.rgb(0, 150, 0)],
                    ['lg', chalk.rgb(0, 190, 0)],
                    ['bg', chalk.rgb(100, 255, 0)],
                    ['db', chalk.rgb(0, 0, 139)],
                    ['lb', chalk.rgb(65, 105, 225)],
                    ['bb', chalk.rgb(0, 191, 255)],
                    ['p', chalk.rgb(255, 0, 255)],
                    ['pi', chalk.rgb(255, 105, 180)],
                    ['w', chalk.rgb(255, 255, 255)],
                    ['g', chalk.rgb(120, 120, 120)],
                    ['b', chalk.rgb(0, 0, 0)]
                )
            static CPrep = (color) => this.colors.get(color).bold.underline;
            static fDict = new Index.Dict('', new Index.Dict('', chalk))
                .addMany(
                    ['status', new Index.Dict('', chalk).addMany(...Array.of(['dr', 'lr', 'y', 'lr', 'p', 'w'].map((v, i) => [String(i == 5 ? 'default' : i + 1), this.CPrep(v)])))],
                    ['method', new Index.Dict('', chalk)
                        .addMany(
                            ...Array.of(
                                ['GET', 'dg'],
                                ['POST', 'db'],
                                ['PUT', 'y'],
                                ['DELETE', 'dr'],
                                ['PATCH', 'p'],
                                ['HEAD', 'lb'],
                                ['OPTIONS', 'o'],
                                ['TRACE', 'bb'],
                                ['CONNECT', 'bg']
                            ).map(([k, v]) => [k, this.CPrep(v)])
                        )
                    ],
                    ['resTime', new Index.Dict('', chalk).addMany(...Array.of('lg', 'dg', 'y', 'dr', 'dr', 'p', 'bb', 'db', 'lb', 'w', 'g').map((v, i) => [String(i), this.CPrep(v)]))],
                    ['bytes', new Index.Dict('', chalk).addMany(...Array.of('g', 'lg', 'dg', 'y', 'lr', 'dr', 'w').map((v, i) => [String(i == 6 ? '-1' : i), this.CPrep(v)]))]
                )
            static status = (code) => (this.fDict.get('status').get(String(code).at(0)))(code);
            static path = this.colors.get('db')
            static method = (method) => (this.fDict.get('method').get(method))(method);
            static resTime = (t) => (this.fDict.get('resTime').get(String(Math.min(Math.floor(t / 100), 10))))(`${t}ms`)
            static bytes = (bytes) => (this.fDict.get('bytes').get(String([0, 1, 5, 10, 50, 100].findIndex((v) => ((Math.ceil(Number(bytes) / (10 ** 5))) <= v)))))(`${new Intl.NumberFormat('en-US').format(bytes)} bytes`);
        }
        const ntf = (l, v) => new Intl.DateTimeFormat(l, v)
        const data = {
            ip: ['::1', '127.0.0.1'].includes(mreq.ip.replace('::ffff:', '')) ? 'localhost' : (mreq.ip || 'unknown').replace('::ffff:', ''),
            method: req.method,
            url: new URL(mreq.originalUrl, `${mreq.protocol}://${mreq.hostname}`).pathname,
            status: res.statusCode,
            time: time.toFixed(2),
            bytes: String(res.getHeader('Content-Length') || 0),
        }
        const { ip, method: m, url: u, status: s, time: t, bytes: b } = data;
        console.log(`${(CC.colors.get('lg'))(ip)} [${CC.chalk.bold(ntf('en-us', { ...Object.fromEntries(Array.of(['month', 'weekday'], ['year', 'day', 'hour', 'minute', 'second']).map((v, i) => [v, i ? 'numeric' : 'short'])), timeZone: "America/Detroit", timeZoneName: undefined }).format())}] ${Array.of(['method', m], ['path', u], ['status', s], ['resTime', t]).map(([m, v]) => CC[m](v)).join(' ')} (${CC.bytes(b)})`);
    })(mreq, mres, next);
    static Trace = (req, res, next) => (req.method == 'TRACE')
        ? res.set('Content-Type', 'message/http').send([`HTTP/${req.httpVersion} 200 OK`, ...req.rawHeaders.map((h, i, a) => (i % 2) ? '' : `${h}: ${a[i + 1]}`).filter(Boolean), '', req.body].join('\r\n'))
        : next();
    static Crypt = class {
        static cd = {
            ha: 'RSA-RIPEMD160',
            crypt: crypto.getCipherInfo("chacha20-poly1305"),
            e: 'base64url',
        };
        static CryptographyData = class {
            constructor() {
                this.iv = ''
                this.key = ''
                this.prehash = ''
                this.posthash = ''
                this.data = ''
            }
        }
        static Auto = class {
            static encrypt(inputData) {
                const data = new Index.Crypt.CryptographyData();
                data.prehash = crypto.createHash(Index.Crypt.cd.ha).update(Buffer.from(inputData)).digest(Index.Crypt.cd.e)
                data.iv = crypto.randomBytes(Index.Crypt.cd.crypt.ivLength).toString(Index.Crypt.cd.e)
                data.key = crypto.randomBytes(Index.Crypt.cd.crypt.keyLength).toString(Index.Crypt.cd.e)
                const encdata = crypto.createCipheriv(Index.Crypt.cd.crypt.name, Buffer.from(data.key, Index.Crypt.cd.e), Buffer.from(data.iv, Index.Crypt.cd.e)).update(Buffer.from(inputData))
                data.posthash = crypto.createHash(Index.Crypt.cd.ha).update(encdata).digest(Index.Crypt.cd.e)
                data.data = encdata.toString(Index.Crypt.cd.e)
                return Buffer.from(JSON.stringify(data), 'utf8').toString(Index.Crypt.cd.e)
            }
            static verify(inputData) {
                const data = JSON.parse(Buffer.from(inputData, Index.Crypt.cd.e).toString('utf-8'))
                Object.keys(new Index.Crypt.CryptographyData()).forEach(key => assert(Object.hasOwn(data, key), `Missing ${key} value`))
                const obj = new Index.Crypt.CryptographyData()
                for (const key of Object.keys(obj)) {
                    assert(Object.hasOwn(data, key), `Missing ${key} value`)
                    Object.assign(obj[key], data[key])
                }
                try {
                    Array.of([obj.posthash, crypto.createHash(Index.Crypt.cd.ha).update(Buffer.from(obj.data, Index.Crypt.cd.e)).digest(Index.Crypt.cd.e)], [data.prehash, crypto.createHash(Index.Crypt.cd.ha).update(crypto.createDecipheriv(Index.Crypt.cd.crypt.name, Buffer.from(obj.key, Index.Crypt.cd.e), Buffer.from(obj.iv, Index.Crypt.cd.e)).update(Buffer.from(obj.data, Index.Crypt.cd.e))).digest(Index.Crypt.cd.e)]).forEach(v => assert.equal(...v))
                } catch (e) {
                    return false;
                }
                return true;
            }
            static decrypt(inputData) {
                const data = JSON.parse(Buffer.from(inputData, Index.Crypt.cd.e).toString('utf-8'))
                Object.keys(new Index.Crypt.CryptographyData()).forEach(key => assert(Object.hasOwn(data, key), `Missing ${key} value`))
                const obj = new Index.Crypt.CryptographyData()
                for (const key of Object.keys(obj)) {
                    assert(Object.hasOwn(data, key), `Missing ${key} value`)
                    Object.assign(obj[key], data[key])
                }
                const outData = crypto.createDecipheriv(Index.Crypt.cd.crypt.name, Buffer.from(obj.key, Index.Crypt.cd.e), Buffer.from(obj.iv, Index.Crypt.cd.e)).update(Buffer.from(obj.data, Index.Crypt.cd.e));
                return outData.toString('utf-8')
            }
        }
        static Manual = class {
            static encrypt = (id, key, iv) => {
                const { ha, e } = Index.Crypt.cd
                const ed = crypto.createCipheriv(Index.Crypt.cd.crypt.name, key, iv).update(id)
                return `${ed.toString(e)}.${crypto.createHash(ha).update(ed).digest(e)}`
            }
            static verify = (token, key, iv) => {
                const [d, h] = token.split('.')
                const { ha, e } = Index.Crypt.cd
                try {
                    assert.equal(h, crypto.createHash(ha).update(Buffer.from(d, e)).digest(e))
                    crypto.createDecipheriv(Index.Crypt.cd.crypt.name, key, iv).update(Buffer.from(d, e)).toString('utf-8')
                } catch (e) {
                    return false
                }
                return true
            }
            static decrypt = (token, key, iv) => {
                const st = token.split('.')
                const { ha, e } = Index.Crypt.cd
                const fd = Buffer.from(st[0], e)
                const vh = crypto.createHash(ha).update(fd).digest(e)
                assert.equal(st[1], vh instanceof Buffer ? vh.toString(e) : vh)
                return crypto.createDecipheriv(Index.Crypt.cd.crypt.name, key, iv).update(fd).toString('utf-8')
            }
        }
        static completeHash = (d, fa = 'id-rsassa-pkcs1-v1_5-with-sha3-512') => {
            const hash = crypto.createHash(fa).update(crypto.getHashes().reduce((x, y) => crypto.createHash(y).update(x).digest(), d)).digest(Index.Crypt.cd.e)
            return hash instanceof Buffer ? hash.toString(Index.Crypt.cd.e) : hash
        }
    };
}

module.exports = Index;