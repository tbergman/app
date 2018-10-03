import { getNewOfferingScreensLayout } from 'src/navigation/mock/new-offering-screens';

export const getMockLayout = (url: string) => {
  if (url.includes('mock/new-offering-screens')) {
    return getNewOfferingScreensLayout();
  }

  throw new Error(`Tried to open faulty mock screen: ${url}`);
};
