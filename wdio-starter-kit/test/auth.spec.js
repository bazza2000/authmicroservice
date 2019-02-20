var assert = require('chai').assert
const ButtonPress = require('./auth.page.js');

const buttonPress = new ButtonPress();

describe('Auth Page', function () {

  beforeEach(function () {
    browser.url('http://ace5476ba262e11e9b1bd0608c1e0b35-450633413.eu-west-1.elb.amazonaws.com:8091/HelloWorld.html');
  });

  it('should have the correct heading', function () {
    assert.equal(buttonPress.h1.getText(), 'Hello, World Cooperative Bank!!!', 'It Matches');
  })

  it('should change button text onclick', function () {
    buttonPress.pressMeButton.click();
    browser.pause(3000);
    assert.equal(buttonPress.pressMeButton.getText(), 'Please Do Not Press This Button Again!', 'It Matches');
  });

  it('should error on missing button', function () {
    
    var results = browser.checkDocument();

    results.forEach(function (result) {
      expect(result.isWithinMisMatchTolerance).to.equal(true, 'screenshot failure');
    });
  });

  it('should link to the VIO Systems', function () {
    buttonPress.linkToVioSystems.click();

    expect(browser.getUrl()).to.contain('http://www.viosystems.com/');
  });
});
