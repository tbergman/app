export const shouldShowReturnToOfferScreenButton = (state) =>
  state.chat.showOfferScreen;
export const isSendingChatMessage = (state) => state.chat.isSending;
export const isOnboardingDone = (state) => state.chat.onboardingDone;
