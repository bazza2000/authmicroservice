var notifier = require('node-notifier');
const VisualRegressionCompare = require('wdio-visual-regression-service/compare');
const path = require('path');

function getScreenshotName (folder, context) {
  const type = context.type;
  const testParent = context.test.parent;
  const testName = context.test.title;
  const browserVersion = parseInt(context.browser.version, 10);
  const browserName = context.browser.name;
  const browserViewport = context.meta.viewport;
  const browserWidth = browserViewport.width;
  const browserHeight = browserViewport.height;

  return path.join(process.cwd(), 'screenshots', folder, `${testParent}_${testName}_${type}_${browserName}_v${browserVersion}_${browserWidth}x${browserHeight}.png`);
}

// require prod configuration
var prodConfig = require('./wdio.conf.js').config;

// clone prod config and add new properties/overrides
var localConfig = Object.assign(prodConfig, {
  baseUrl: 'http://ace5476ba262e11e9b1bd0608c1e0b35-450633413.eu-west-1.elb.amazonaws.com:8091/HelloWorld.html',

  capabilities: [{
    browserName: 'chrome'
  }],

  services: ['visual-regression', 'selenium-standalone'],

  visualRegression: {
    compare: new VisualRegressionCompare.LocalCompare({
      referenceName: getScreenshotName.bind(null, 'baseline'),
      screenshotName: getScreenshotName.bind(null, 'latest'),
      diffName: getScreenshotName.bind(null, 'diff')
    })
  },

  reporters: ['spec'],

  // Hooks to notify Growl-like programs
  onPrepare: function (config, capabilities) {
    notifier.notify({
      title: 'WebdriverIO',
      message: 'Test run started'
    });
  },
  afterTest: function (test) {
    if (!test.passed) {
      notifier.notify({
        title: 'Test failure!',
        message: test.parent + ' ' + test.title
      });
    }
  },
  onComplete: function (exitCode) {
    notifier.notify({
      title: 'WebdriverIO',
      message: 'Tests finished running.'
    });
  }
});

exports.config = localConfig;
