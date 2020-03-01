import { runInThisContext } from 'vm'
import { parentPort, workerData } from 'worker_threads'
import * as m from 'module'

const functionF = runInThisContext(m.wrap(`return ${workerData.f.toString()};`))(exports, require, module, __filename, __dirname);
parentPort.on('message', param => parentPort.postMessage(functionF(param)));