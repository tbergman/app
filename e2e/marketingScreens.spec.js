const getContinueButton = () => element(by.id('continueButton'));

describe('MarketingScreen', () => {
  it('should show first screen', async () => {
    await expect(getContinueButton()).toBeVisible();
    await getContinueButton().tap();
  });

  it('should show second screen', async () => {
    await getContinueButton().tap();
  });

  it('should show third screen', async () => {
    await getContinueButton().tap();
  });

  it('should show fourth screen', async () => {
    await getContinueButton().tap();
  });

  it('should hide marketing screens', async () => {
    await expect(getContinueButton()).toNotExist();
  });
});
