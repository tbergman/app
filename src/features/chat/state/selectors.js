export const shouldShowReturnToOfferScreenButton = (state) =>
  state.chat.showOfferScreen;
export const isSendingChatMessage = (state) => state.chat.isSending;
export const isOnboardingDone = (state) => state.chat.onboardingDone;
export const getInputValue = (state) => state.chat.inputValue;
export const getMultiSelectChoices = (state) => state.chat.multiSelectChoices;
