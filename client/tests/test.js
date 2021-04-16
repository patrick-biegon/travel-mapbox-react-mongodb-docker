
var assert = require("assert").strict;
var webdriver = require("selenium-webdriver/chrome");
//require("geckodriver");

const {Builder, By, Key, until} = require('selenium-webdriver');

const screen = {
  width: 640,
  height: 480
};

const serverUri = "http://localhost:3000";
const appTitle = "React App";

var browser = new Builder()
    .usingServer()
    .withCapabilities({ browserName: "chrome" })
    .setChromeOptions(new webdriver.Options().headless().windowSize(screen))
    .build();

function logTitle() {
    return new Promise((resolve, reject) => {
        browser.getTitle().then(function (title) {
            resolve(title);
        });
    });
}

function delay(interval) {
    return it('should delay', done => {
        setTimeout(() => done(), interval)

    }).timeout(interval + 100) // The extra 100ms should guarantee the test will not fail due to exceeded timeout
}


delay(10000);

describe("Home Page", function () {

    it("Should load the home page and get title", function () {
        return new Promise((resolve, reject) => {
            browser
                .get(serverUri)
                .then(logTitle)
                .then(title => {
                    assert.strictEqual(title, appTitle);
                    resolve();
                })
                .catch(err => reject(err));
        });
    });

    it("Should check whether the LoginForm element is loaded", function () {
        return new Promise((resolve, reject) => {
            browser
                .findElement({ className: "LogInForm" })
                .then(elem => resolve())
                .catch(err => reject(err));
        });
    });

    it("Should check whether the LogIn button element is loaded", function () {
        return new Promise((resolve, reject) => {
            browser
                .findElement({ className: "Button1Style" })
                .then(elem => resolve())
                .catch(err => reject(err));
        });
    });

    it("Should check whether the Create Account button is loaded", function () {
        return new Promise((resolve, reject) => {
            browser
                .findElement({ className: "Button2Style" })
                .then(elem => resolve())
                .catch(err => reject(err));
        });
    });

    it("Should check the Register Form is functional", function () {
        return new Promise((resolve, reject) => {
            browser
                .findElement({ className: "LogInForm" })
                .findElement({ className: "Button2Style" })
                .click()
                .then(elem => resolve())
                .catch(err => reject(err));
        });
    });


    it("Should check whether the Register Form is loaded or not", function () {
        return new Promise((resolve, reject) => {
            browser
                .findElement({ className: "RegisterForm" })
                .then(elem => resolve())
                .catch(err => reject(err));
        });
    });

    it("Should check whether the Register button element is loaded", function () {
        return new Promise((resolve, reject) => {
            browser
                .findElement({ className: "Button1Style" })
                .then(elem => resolve())
                .catch(err => reject(err));
        });
    });

    it("Should check whether the Log In instead button is loaded", function () {
        return new Promise((resolve, reject) => {
            browser
                .findElement({ className: "Button2Style" })
                .then(elem => resolve())
                .catch(err => reject(err));
        });
    });

    // it("Should check whether the navigation element is loaded", function () {
    //     return new Promise((resolve, reject) => {
    //         browser
    //             .findElement({ className: "nav" })
    //             .then(elem => resolve())
    //             .catch(err => reject(err));
    //     });
    // });

    // it("Should check whether the geolocation element is loaded", function () {
    //     return new Promise((resolve, reject) => {
    //         browser
    //             .findElement({ className: "geo" })
    //             .then(elem => resolve())
    //             .catch(err => reject(err));
    //     });
    // });

    // it("Should check whether the panel element is loaded", function () {
    //     return new Promise((resolve, reject) => {
    //         browser
    //             .findElement({ className: "panel" })
    //             .then(elem => resolve())
    //             .catch(err => reject(err));
    //     });
    // });

    // it("Should check whether the theme element is loaded", function () {
    //     return new Promise((resolve, reject) => {
    //         browser
    //             .findElement({ className: "themeToggle" })
    //             .then(elem => resolve())
    //             .catch(err => reject(err));
    //     });
    // });

    // it("Should check the panel inputs", function () {
    //     return new Promise((resolve, reject) => {
    //         browser
    //             .findElement({ className: "panel" })
    //             .findElement({ className: "input" })
    //             .click()
    //             .then(elem => resolve())
    //             .catch(err => reject(err));
    //     });
    // });

    // it("Should check the geolocation button enable", function () {
    //     return new Promise((resolve, reject) => {
    //         browser
    //             .findElement({ className: "geo" })
    //             .findElement({ className: "mapboxgl-ctrl-icon" })
    //             .click()
    //             .then(elem => resolve())
    //             .catch(err => reject(err));
    //     });
    // });

    // delay(1000);

    // it("Should check the geolocation button disable", function () {
    //     return new Promise((resolve, reject) => {
    //         browser
    //             .findElement({ className: "geo" })
    //             .findElement({ className: "mapboxgl-ctrl-icon" })
    //             .click()
    //             .then(elem => resolve())
    //             .catch(err => reject(err));
    //     });
    // });

    // delay(1000);

    // it("Should check the nav zoom in", function () {
    //     return new Promise((resolve, reject) => {
    //         browser
    //             .findElement({ className: "nav" })
    //             .findElement({ className: "mapboxgl-ctrl-zoom-in" })
    //             .click()
    //             .then(elem => resolve())
    //             .catch(err => reject(err));
    //     });
    // });

    // it("Should check the nav zoom out", function () {
    //     return new Promise((resolve, reject) => {
    //         browser
    //             .findElement({ className: "nav" })
    //             .findElement({ className: "mapboxgl-ctrl-zoom-out" })
    //             .click()
    //             .then(elem => resolve())
    //             .catch(err => reject(err));
    //     });
    // });

    // it("Should check the themeToggle 1", function () {
    //     return new Promise((resolve, reject) => {
    //         browser
    //             .findElement({ className: "themeToggle" })
    //             .findElement({ className: "themeButton" })
    //             .click()
    //             .then(elem => resolve())
    //             .catch(err => reject(err));
    //     });
    // });

    // delay(1000);

    // it("Should check the themeToggle 2", function () {

    //     return new Promise((resolve, reject) => {
    //         browser
    //             .findElement({ className: "themeToggle" })
    //             .findElement({ className: "themeButton" })
    //             .click()
    //             .then(elem => resolve())
    //             .catch(err => reject(err));
    //     });
    // });

    // delay(1000);




    after(function () {
        browser.quit();
    });
});