const R = require('ramda');
const dotProp = require('dot-prop-immutable');
import {
  LOADED_ONBOARDING,
  LOADED_MESSAGES,
  LOADING_MESSAGES_START,
  LOADING_MESSAGES_END,
  CHOICE_SELECTED,
  SET_RESPONSE_VALUE,
  LOADED_AVATARS,
  LOADED_AVATAR_DATA,
  SEND_CHAT_RESPONSE,
  EDIT_LAST_RESPONSE,
} from '../actions/types';
import { MOCK_LOADED_CLAIM_MESSAGES } from '../actions/mock/types';

const selectChoice = (state, { payload: { message, choice } }) => {
  let messages = state.messages;
  let messageIndex = messages.findIndex((m) => m.globalId === message.globalId);
  let choiceIndex = messages[messageIndex].body.choices.findIndex((l) =>
    R.equals(l, choice),
  );
  let currentSelection =
    messages[messageIndex].body.choices[choiceIndex].selected;
  let newState = dotProp.set(
    state,
    `messages.${messageIndex}.body.choices.${choiceIndex}.selected`,
    !currentSelection,
  );
  return newState;
};

const setResponseValue = (state, { payload: { message, value } }) => {
  let messages = state.messages;
  let messageIndex = messages.findIndex((m) => m.globalId === message.globalId);
  let newState = dotProp.set(
    state,
    `messages.${messageIndex}._inputValue`,
    value,
  );
  return newState;
};

const handleLoading = (state, { type }) => {
  if (type === LOADING_MESSAGES_START) {
    let stateWithLoading = Object.assign({}, state, { loadingMessages: true });
    return stateWithLoading;
  } else if (type === LOADING_MESSAGES_END) {
    return Object.assign({}, state, { loadingMessages: false });
  }
};

const handleLoadedAvatars = (state, action) => {
  let avatarsByName = R.indexBy(R.prop('name'), action.payload);
  return Object.assign({}, state, { avatars: avatarsByName });
};

const handleLoadedAvatarData = (state, action) => {
  return dotProp.set(
    state,
    `avatars.${action.payload.name}.data`,
    action.payload.data,
  );
};

const reducer = (
  state = { messages: [], loadingMessages: false, avatars: {} },
  action,
) => {
  switch (action.type) {
    case MOCK_LOADED_CLAIM_MESSAGES:
    case LOADED_MESSAGES:
    case LOADED_ONBOARDING:
      return {
        ...state,
        messages: action.payload.messages,
        ongoingClaim: action.payload.state.ongoingClaim,
        showOfferScreen: action.payload.state.showOfferScreen,
        onboardingDone: action.payload.state.onboardingDone,
        fabOptions: action.payload.fabOptions,
        isSending: false,
      };
    case CHOICE_SELECTED:
      return selectChoice(state, action);
    case SET_RESPONSE_VALUE:
      return setResponseValue(state, action);
    case LOADING_MESSAGES_START:
    case LOADING_MESSAGES_END:
      return handleLoading(state, action);
    case LOADED_AVATARS:
      return handleLoadedAvatars(state, action);
    case LOADED_AVATAR_DATA:
      return handleLoadedAvatarData(state, action);
    case SEND_CHAT_RESPONSE:
      return {
        ...state,
        isSending: true,
        inputValue: '',
        multiSelectChoices: [],
      };
    case 'CHAT/SET_INPUT_VALUE':
      return { ...state, inputValue: action.payload };
    case EDIT_LAST_RESPONSE: {
      return {
        ...state,
        inputValue:
          state.messages &&
          state.messages[action.payload.index] &&
          state.messages[action.payload.index].body.type === 'text'
            ? state.messages[action.payload.index].body.text
            : '',
      };
    }
    case 'CHAT/SELECT_MULTIPLE_SELECTION_OPTION': {
      const multiSelectChoices = state.multiSelectChoices
        ? [...state.multiSelectChoices]
        : [];
      if (multiSelectChoices.some((c) => c === action.payload.choice)) {
        return {
          ...state,
          multiSelectChoices: multiSelectChoices.filter(
            (c) => c !== action.payload.choice,
          ),
        };
      }
      multiSelectChoices.push(action.payload.choice);
      return { ...state, multiSelectChoices };
    }
    default:
      return state;
  }
};

export default reducer;
