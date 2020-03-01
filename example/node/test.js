const { NodeTask } = require('../../lib')
console.log(NodeTask);

(async () => {
    const res = await NodeTask.Run((p) => {
        const path = require('path')
        console.log(path.join(__dirname, __filename))
        return p * p;
    }, 25);

    console.log("Result: ", res);
    process.exit();
})();