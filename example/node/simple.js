const { Task } = require('../../dist');

(async () => {
    const res = await Task.Run((p) => {
        const path = require('path')
        console.log(path.join(__dirname, __filename))
        return p * p;
    }, 25);

    console.log("Result: ", res);
})();