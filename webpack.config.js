const path = require('path');

const defaultConfig = {
    entry: './src/entry.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts'],
    },
};

module.exports = (env, argv) => {
    const result = { ...defaultConfig, mode: argv.mode };
    if(argv.mode == 'production') {
        result.output.filename = 'main.min.js'
    }

    return result;
}