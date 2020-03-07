const path = require('path');

const defaultConfig = {
    entry: './src/index.ts',
    output: {
        libraryTarget: 'umd',
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
        globalObject: 'this',
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                // use: 'ts-loader',
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            compilerOptions: {
                                declaration: false,
                            },
                        },
                    },
                ],
                exclude: /node_modules/,
            },
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

module.exports = (env, argv) => {
    const result = { ...defaultConfig, mode: argv.mode };
    if (argv.mode == 'production') {
        result.output.filename = 'index.min.js'
    }

    return result;
}