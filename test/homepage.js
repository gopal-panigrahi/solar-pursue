const { Application } = require('spectron');
const assert = require('assert');
const electronPath = require('electron'); // Require Electron from the binaries included in node_modules.
const path = require('path');


describe('Application launch', function () {
    this.timeout(10000);

    const app = new Application({ path: electronPath, args: [path.join(__dirname, '..')] });
    beforeEach(() => app.start());

    afterEach(() => {
        if (app && app.isRunning()) {
            return app.stop()
        }
    });

    it('shows an initial window', async (done) => {
        const count = app.client.getWindowCount();
        assert.strictEqual(count, 1);
        done();
    });
});
