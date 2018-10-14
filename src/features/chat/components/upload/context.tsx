import * as React from 'react';
import { LayoutAnimation } from 'react-native';
import { Container, ActionMap } from 'constate';

interface State {
  isOpen: boolean;
}

interface Actions {
  setIsOpen: (isOpen: boolean) => void;
}

const actions: ActionMap<State, Actions> = {
  setIsOpen: (isOpen) => () => ({
    isOpen,
  }),
};

const Context = React.createContext<State & Actions>({
  isOpen: false,
  setIsOpen: () => {},
});

export const Provider: React.SFC = ({ children }) => (
  <Container actions={actions} initialState={{ isOpen: false }}>
    {({ isOpen, setIsOpen }) => (
      <Context.Provider
        value={{
          isOpen,
          setIsOpen: (value) => {
            LayoutAnimation.configureNext({
              duration: 300,
              create: {
                type: LayoutAnimation.Types.easeInEaseOut,
                property: LayoutAnimation.Properties.opacity,
              },
              update: {
                type: LayoutAnimation.Types.easeInEaseOut,
              },
            });
            setIsOpen(value);
          },
        }}
      >
        {children}
      </Context.Provider>
    )}
  </Container>
);

export const Consumer = Context.Consumer;
