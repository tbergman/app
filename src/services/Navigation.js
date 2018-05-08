import { NavigationActions } from 'react-navigation';

export function navigateTo(dispatch, path, params = {}) {
  const navigateAction = NavigationActions.navigate({
    routeName: path,
    params,
    action: NavigationActions.navigate({ routeName: path }),
  });
  dispatch(navigateAction);
}
