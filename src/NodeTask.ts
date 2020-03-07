const node_require: NodeRequire = eval('require');

export default class NodeTask {
    static Run<Tp, Tr>(f: (p: Tp) => Tr, param: Tp): Promise<Tr> {
        return new Promise((resolve, rejects) => {
            const { join } = node_require('path') as typeof import('path');
            const { Worker } = node_require('worker_threads') as typeof import('worker_threads');
            const worker = new Worker(join(__dirname, './node_worker.js'), {
                workerData: { f: f.toString() }
            });
            worker.on('message', resolve);
            worker.on('error', rejects);
            worker.on('exit', (code: number) => {
                if (code !== 0)
                    rejects(`Worker stopped with exit code ${code}`);
            });

            worker.postMessage(param);
        });
    }
}