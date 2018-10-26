import * as React from 'react';
import styled from '@sampettersson/primitives';
import { View, LayoutAnimation } from 'react-native';
import { Mount } from 'react-lifecycle-components';

import { OpenState } from 'src/components/OpenState';

const HeightConstraint = styled(View)(({ visible }: { visible: boolean }) => ({
  marginBottom: visible ? 15 : 0,
  maxHeight: visible ? Number.MAX_SAFE_INTEGER : 0,
  overflow: 'hidden',
}));

export const MessageHeightAnimation: React.SFC = ({ children }) => (
  <OpenState initialOpenState={false}>
    {({ isOpen, setIsOpen }) => (
      <>
        <Mount
          on={() => {
            setTimeout(() => {
              LayoutAnimation.configureNext({
                duration: 600,
                create: {
                  type: LayoutAnimation.Types.spring,
                  springDamping: 1,
                },
                update: {
                  type: LayoutAnimation.Types.spring,
                  springDamping: 1,
                },
                delete: {
                  type: LayoutAnimation.Types.spring,
                  springDamping: 1,
                },
              });
              setIsOpen(true);
            }, 50);
          }}
        >
          {null}
        </Mount>
        <HeightConstraint visible={isOpen}>{children}</HeightConstraint>
      </>
    )}
  </OpenState>
);
