const { Application } = require('spectron');
const electronPath = require('electron'); // Require Electron from the binaries included in node_modules.
const path = require('path');

const app = new Application({ path: electronPath, args: [path.join(__dirname, '..')] });

describe("App", () => {
    beforeAll(function () {
        return app.start()
    });

    afterEach(async () => {
        if (app && app.isRunning()) await app.stop();
    });

    test("should launch app", async () => {
        const isVisible = await app.browserWindow.isVisible();
        expect(isVisible).toBe(true);
    });

    // test("should display heading", async () => {
    //     const { getByRole } = setupBrowser(app.client);

    //     expect(
    //         await getByRole("heading", { name: /hello from react!/i })
    //     ).toBeDefined();
    // });

    // test("should add heading when button is clicked", async () => {
    //     const { getByRole } = setupBrowser(app.client);

    //     const button = await getByRole("button", { name: /click me/i });
    //     button.click();

    //     expect(
    //         await getByRole("heading", { name: /clicking happened!/i })
    //     ).toBeDefined();
    // });
});