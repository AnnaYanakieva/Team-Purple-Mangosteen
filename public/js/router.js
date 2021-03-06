var app = app || {};

(function() {
    var selector = "#main-section";

    app.router = Sammy(function() {
        this.get("#/", function() {
            $(selector).html("Home page!");
        })

        this.get("#/Catalog", function() {
            $(selector).html("Catalog");
        })

        this.get("#/LogInReg", function() {
            $(selector).html("Log in form! Or Reg!");
        })
    })
    app.router.run("#/");
}());