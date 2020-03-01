import { runInThisContext } from 'vm'
import { parentPort, workerData } from 'worker_threads'
import * as m from 'module'

declare global {
    namespace NodeJS {
        interface Global {
            port: {},
            f: {}
        }
    }
}

global.port = parentPort;
global.f = workerData.f;
const getPort = () => global.port;

// const f1 = (p: any) => { global = undefined; return f(p); }

const funDef = `const f=${global.f.toString()};`;
const work = `(${getPort.toString()})().on('message',m=>(${getPort.toString()})().postMessage(f(m)));`;
const code = funDef + work;
runInThisContext(m.wrap(code))(exports, require, module, __filename, __dirname);