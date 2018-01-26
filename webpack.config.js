var path = require("path");
var glob = require("glob");

module.exports = {
    entry: {
        "dist/app/bundle": glob.sync("./src/**/*.js"),
        "dist/angular/angular": ["./node_modules/angular/angular.js", "./node_modules/angular-sanitize/angular-sanitize.js"]
    },
    output:{
        filename: "[name].js",
        path: path.resolve(__dirname, "dist")
    },
    devServer:{
        contentBase: "./dist"       
    }
};