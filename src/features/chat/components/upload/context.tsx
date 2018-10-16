import * as React from 'react';
import { Container, ActionMap } from 'constate';
import { schedule } from '../pickers/layout-animation';

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
            schedule(() => {
              setIsOpen(value);
            });
          },
        }}
      >
        {children}
      </Context.Provider>
    )}
  </Container>
);

export const Consumer = Context.Consumer;
