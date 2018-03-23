export function showChatAction() {
  return {
    type: 'Navigation/NAVIGATE',
    routeName: 'ChatBase',
    action: {
      type: 'Navigation/NAVIGATE',
      routeName: 'ChatBase',
    },
  };
}

export function showDashboardAction() {
  return {
    type: 'Navigation/NAVIGATE',
    routeName: 'HomeBase',
    action: {
      type: 'Navigation/NAVIGATE',
      routeName: 'HomeBase',
    },
  };
}
