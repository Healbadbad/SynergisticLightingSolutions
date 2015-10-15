// You can include npm dependencies for support files in tests/cucumber/package.json
var _ = require('underscore');

module.exports = function () {

    // You can use normal require here, cucumber is NOT run in a Meteor context (by design)
    var url = require('url');

    this.Given(/^I am a new user$/, function () {
        server.call('reset'); // server is a connection to the mirror
    });

    this.When(/^I navigate to "([^"]*)"$/, function (relativePath) {
        // process.env.ROOT_URL always points to the mirror
        client.url(url.resolve(process.env.ROOT_URL, relativePath));
    });

    this.When(/^fill out "([^"]*)"$/, function (table) {
        for (var row in table) {
            this.client.setValue(row[0], row[1]);
        }
    });

    this.Then(/^I should see the selector "([^"]*)"$/, function (selector) {
        // no callbacks, no promises, just simple synchronous code!
        expect(client.waitForExist(selector)).toBe(true);
    });

    this.Then(/^click on "([^"]*)"$/, function (selector) {
        this.client.click(selector);
    });

    this.Then(/^a new user is created with the attributes"$/, function (table) {
        //TODO get user from database
        for (var row in table) {
            this.client.setValue(row[0], row[1]);
        }
    });

};
