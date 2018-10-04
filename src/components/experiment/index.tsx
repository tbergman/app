import * as React from 'react';
import { AsyncStorage } from 'react-native';
import { Container, ActionMap } from 'constate';
import { Mount } from 'react-lifecycle-components';
import getClosest from 'get-closest';

import { SegmentTracker } from 'src/features/analytics/SegmentTracker';

interface ExperimentProps {
  name: string;
  groups: string[];
  children: (selectedExperiment: string) => React.ReactNode;
}

export const getGroup = async (name: string, groups: string[]) => {
  const persistedGroup = await AsyncStorage.getItem(`experiment-${name}`);

  if (persistedGroup) {
    return persistedGroup;
  } else {
    return await pickGroup(name, groups);
  }
};

const pickGroup = async (name: string, groups: string[]) => {
  const randomNumber = Math.random() * (groups.length - 1);
  const indexes = groups.map((_, index) => index);
  const closestIndex = getClosest.number(randomNumber, indexes);
  const group = groups[closestIndex];
  await AsyncStorage.setItem(`experiment-${name}`, group);

  SegmentTracker.track('SelectedExperiment', {
    name,
    group,
  });

  return group;
};

interface State {
  group: string;
}

interface Actions {
  setGroup: (group: string) => void;
}

const actions: ActionMap<State, Actions> = {
  setGroup: (group) => () => ({
    group,
  }),
};

export const Experiment: React.SFC<ExperimentProps> = ({
  name,
  groups,
  children,
}) => (
  <Container actions={actions}>
    {({ group, setGroup }) =>
      group ? (
        children(group) || null
      ) : (
        <Mount on={async () => setGroup(await getGroup(name, groups))}>
          {null}
        </Mount>
      )
    }
  </Container>
);
