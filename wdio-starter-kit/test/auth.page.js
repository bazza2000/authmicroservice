class ButtonPress {
  // Replace these selectors
  get h1 () { return $('body > h1'); }
  get pressMeButton () { return $('#bobbins'); }
  get afterPressMeButton () { return $('.button button2:'); }
  get linkToVioSystems () { return $ ('*=http://www.viosystems.com'); }
}

module.exports = ButtonPress;
