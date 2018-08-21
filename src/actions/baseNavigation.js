const ACTION_NAVIGATE = 'Navigation/NAVIGATE';

export const showChatAction = () => ({
  type: ACTION_NAVIGATE,
  routeName: 'Conversation',
  action: {
    type: 'Navigation/NAVIGATE',
    routeName: 'Conversation',
  },
});

export const showDashboardAction = () => ({
  type: ACTION_NAVIGATE,
  routeName: 'Account',
  action: {
    type: 'Navigation/NAVIGATE',
    routeName: 'Account',
  },
});
