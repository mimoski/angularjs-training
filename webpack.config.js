var path = require("path");
var glob = require("glob");

module.exports = {
    entry: {
        "scripts/app/bundle": glob.sync("./src/**/*.js"),
        "scripts/angular/angular": ["./node_modules/angular/angular.js", "./node_modules/angular-route/angular-route.js", "./node_modules/angular-sanitize/angular-sanitize.js"]
    },
    output:{
        filename: "[name].js",
        path: path.resolve(__dirname, "dist")
    },
    devServer:{
        contentBase: "./dist"       
    },
    module:{
        rules: [
            {
                test: /\.html$/,
                use:{
                    loader: "html-loader",
                    options: {
                        minimize: true                       
                    }
                }
            }
        ]
    }
};