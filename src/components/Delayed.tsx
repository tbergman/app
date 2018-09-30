import * as React from 'react';
import { Update, Mount, Unmount } from 'react-lifecycle-components';
import { Container, ActionMap } from 'constate';

interface DelayedProps {
  mounted: boolean;
  mountAfter: number;
  unmountAfter: number;
}

interface State {
  shouldRenderChildren: boolean;
  timer: NodeJS.Timer;
}

interface Actions {
  setShouldRenderChildren: (shouldRenderChildren: boolean) => void;
  setTimer: (timer: NodeJS.Timer) => void;
}

const actions: ActionMap<State, Actions> = {
  setShouldRenderChildren: (shouldRenderChildren) => () => ({
    shouldRenderChildren,
  }),
  setTimer: (timer) => () => ({
    timer,
  }),
};

export const Delayed: React.SFC<DelayedProps> = ({
  mounted,
  mountAfter,
  unmountAfter,
  children,
}) => (
  <Container
    actions={actions}
    initialState={{ shouldRenderChildren: mounted && mountAfter === 0 }}
  >
    {({ shouldRenderChildren, setShouldRenderChildren, setTimer, timer }) => (
      <Update
        was={() => {
          if (mounted) {
            setTimer(
              setTimeout(() => setShouldRenderChildren(true), mountAfter),
            );
          } else {
            setTimer(
              setTimeout(() => setShouldRenderChildren(false), unmountAfter),
            );
          }
        }}
        watched={mounted}
      >
        <>
          <Mount
            on={() => {
              if (mounted && !shouldRenderChildren) {
                setTimer(
                  setTimeout(() => setShouldRenderChildren(true), mountAfter),
                );
              }
            }}
          >
            {null}
          </Mount>
          <Unmount on={() => clearTimeout(timer)}>{null}</Unmount>
          {shouldRenderChildren ? children : null}
        </>
      </Update>
    )}
  </Container>
);
