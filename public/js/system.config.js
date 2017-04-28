SystemJS.config({
    // tell SystemJS which transpiler to use
    transpiler: 'plugin-babel',
    // tell SystemJS where to look for the dependencies
    map: {
        //SystemJS files:
        'plugin-babel': '../../node_moules/systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build': '../../node_moules/systemjs-plugin-babel/systemjs-babel-browser.js',
        // app start script:
        'main': 'js/main.js',

        // libraries:
        'jquery': '../../node_modules/jquery/dist/jquery.min.js',
        'handlebars': '../../node_moules/handlebars/dist/handlebars.js',
    }
});

System.import("main");