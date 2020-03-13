const { runInThisContext } = eval('require')('vm') as typeof import('vm')
const { parentPort, workerData } = eval('require')('worker_threads') as typeof import('worker_threads')
const { wrap } = eval('require')('module') as typeof import('module')


const functionF = runInThisContext(wrap(`return ${workerData.f.toString()};`))(exports, eval('require'), module, __filename, __dirname);
parentPort.on('message', param => {
    parentPort.postMessage(functionF(param));
    parentPort.close();
});
