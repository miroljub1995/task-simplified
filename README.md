# task-simplified

![CI Pipeline](https://github.com/miroljub1995/task-simplified/workflows/CI/badge.svg?branch=master)

This is simple Task based wrapper to web worker.
Usage example:
```html
<html>
<head>
    <meta charset="UTF-8">
</head>
<body>
    <script src="https:/unpkg.com/task-simplified/dist/index.js"></script>
    <script>
        (async () => {
            console.log("Running task examples...");

            //************first
            let val1 = await Task.Run(p => p * p, 15);
            console.log("Val: ", val1);

            //************second
            try {
                let val2 = await Task.Run(p => { throw new Error("Simulate error in task"); });
            } catch(e) {
                e.preventDefault();
                console.error(e.message);
            }
        })();
    </script>
</body>
</html>
```
