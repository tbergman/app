const getContinueButton = () => element(by.id('continueButton'));

describe('Chat', () => {
  beforeAll(async () => {
    await device.reloadReactNative();
    const continueButton = getContinueButton();
    await expect(getContinueButton()).toBeVisible();
    await continueButton.tap();
    await continueButton.tap();
    await continueButton.tap();
    await continueButton.tap();
  });

  it('should click in chat', async () => {
    const soundsGoodButton = element(by.id('message.pre.forslagstart'));
    await waitFor(soundsGoodButton)
      .toBeVisible()
      .withTimeout(20000);
    await soundsGoodButton.tap();
  });

  it('should select apartment', async () => {
    const apartmentButton = element(by.id('message.lagenhet.pre'));
    await waitFor(apartmentButton)
      .toBeVisible()
      .withTimeout(20000);
    await apartmentButton.tap();
  });

  it('should select no bank id', async () => {
    const noBankIdButton = element(by.id('message.manuellnamn'));
    await waitFor(noBankIdButton)
      .toBeVisible()
      .withTimeout(20000);
    await noBankIdButton.tap();
  });

  it('should fill in name', async () => {
    const inputField = element(by.id('inputField'));
    await waitFor(inputField)
      .toBeVisible()
      .withTimeout(20000);
    await inputField.typeText('test');
    await element(by.id('sendButton')).tap();
  });
});
