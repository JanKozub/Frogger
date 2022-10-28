const path = require('path');
module.exports = {
    entry: {
        Game: './src/script/Main.ts'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'Main.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    watch: true
}