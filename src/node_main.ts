import { Worker } from 'worker_threads'
import { join } from 'path'

export default class NodeTask {
    static Run<Tp, Tr>(f: (p: Tp) => Tr, param: Tp): Promise<Tr> {
        return new Promise((resolve, rejects) => {
            const worker = new Worker(join(__dirname, './node_worker.js'), {
                workerData: { f: f.toString() }
            });
            worker.on('message', resolve);
            worker.on('error', rejects);
            worker.on('exit', (code) => {
                if (code !== 0)
                rejects(`Worker stopped with exit code ${code}`);
            });

            worker.postMessage(param)
        });
    }
}