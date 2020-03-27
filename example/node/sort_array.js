const { Task } = require('../../dist');

(async () => {
    let nums = new Array(1000000).fill(null).map(v => Math.random());
    let start = new Date();
    nums = await Task.Run((nums) => {
        nums.sort();
        return nums;
    }, nums);
    let end = new Date();
    console.log(`Time: ${end - start} ms`);
})();