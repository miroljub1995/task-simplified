# task-simplified

[![GitHub Actions status | miroljub1995/task-simplified](https://github.com/miroljub1995/task-simplified/workflows/Build/badge.svg)](https://github.com/miroljub1995/task-simplified/actions?query=workflow%3ABuild)


This is simple Task based wrapper to web worker.
Usage example:
```html
<html>
<head>
    <meta charset="UTF-8">
</head>
<body>
    <script src="../dist/main.min.js"></script>
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
