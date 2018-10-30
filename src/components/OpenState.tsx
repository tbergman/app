import * as React from 'react';
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

interface OpenStateProps {
  initialOpenState: boolean;
  children: (state: State & Actions) => React.ReactNode;
}

export const OpenState: React.SFC<OpenStateProps> = ({
  children,
  initialOpenState,
}) => (
  <Container actions={actions} initialState={{ isOpen: initialOpenState }}>
    {children}
  </Container>
);
