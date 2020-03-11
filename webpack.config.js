const path = require('path');

module.exports = (env, argv) => {
    outDir = path.resolve(__dirname, 'dist')
    if (argv.mode == 'development') {
        outDir = path.resolve(__dirname, 'debug')
    }

    tsRule = {
        test: /\.ts$/,
        use: [
            {
                loader: 'ts-loader',
                options: {
                    compilerOptions: {
                        declaration: true,
                        outDir: outDir
                    },
                },
            },
        ],
        exclude: /node_modules/,
    }



    return {
        entry: {
            'index': './src/index.ts',
            'node_worker': './src/node_worker.ts'
        },
        output: {
            libraryTarget: 'umd',
            filename: '[name].js',
            path: outDir,
            globalObject: 'this',
        },
        mode: argv.mode,
        module: {
            rules: [
                tsRule,
            ],
        },
        resolve: {
            extensions: ['.ts'],
        },
        node: {
            __filename: false,
            __dirname: false,
        }
    };
}