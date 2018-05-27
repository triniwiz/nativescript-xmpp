var Xmpp = require("nativescript-xmpp").Xmpp;
var xmpp = new Xmpp();

describe("greet function", function() {
    it("exists", function() {
        expect(xmpp.greet).toBeDefined();
    });

    it("returns a string", function() {
        expect(xmpp.greet()).toEqual("Hello, NS");
    });
});