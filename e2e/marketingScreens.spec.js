describe('MarketingScreen', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have an continue button', async () => {
    const continueButton = element(by.id('continueButton'));
    await expect(continueButton).toBeVisible();
    await continueButton.tap();
    await continueButton.tap();
    await continueButton.tap();
    await continueButton.tap();
    await expect(continueButton).toNotExist();
  });
});
