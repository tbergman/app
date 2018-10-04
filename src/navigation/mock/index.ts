import { Navigation } from 'react-native-navigation';
import { getNewOfferingScreensLayout } from 'src/navigation/mock/new-offering-screens';

export const openMockLayout = async (url: string) => {
  if (url.includes('mock/new-offering-screens')) {
    Navigation.setRoot(await getNewOfferingScreensLayout());
    return;
  }

  throw new Error(`Tried to open faulty mock screen: ${url}`);
};
