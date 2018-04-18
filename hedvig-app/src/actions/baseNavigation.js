export function showChatAction() {
  return {
    type: 'Navigation/NAVIGATE',
    routeName: 'Conversation',
    action: {
      type: 'Navigation/NAVIGATE',
      routeName: 'Conversation',
    },
  };
}

export function showDashboardAction() {
  return {
    type: 'Navigation/NAVIGATE',
    routeName: 'Account',
    action: {
      type: 'Navigation/NAVIGATE',
      routeName: 'Account',
    },
  };
}
