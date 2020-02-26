class Task {
    static Run<Tp, Tr>(f: (p: Tp) => Tr, param: Tp) : Promise<Tr> {
        return new Promise((resolve, reject) => {
            const workerCode = `var f=${f.toString()};onmessage=function(e){postMessage(f(e.data));};`;

            const codeBytes = new Blob([workerCode], { type: "text/plain" });
            const url = URL.createObjectURL(codeBytes);
            const w = new Worker(url);

            w.onmessage = (e) => resolve(e.data);
            w.onerror = (e) => reject(e);
            w.postMessage(param);
            URL.revokeObjectURL(url);
        });
    }
}

export default Task;