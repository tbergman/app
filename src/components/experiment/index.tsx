import * as React from 'react';
import { AsyncStorage } from 'react-native';
import { Container, ActionMap } from 'constate';
import { Mount } from 'react-lifecycle-components';
import getClosest from 'get-closest';

import { SegmentTracker } from 'src/features/analytics/SegmentTracker';

export const getGroup = async <T extends {}>(
  name: string,
  groups: Array<keyof T>,
) => {
  const persistedGroup = (await AsyncStorage.getItem(
    `experiment-${name}`,
  )) as keyof T;

  if (persistedGroup) {
    return persistedGroup;
  } else {
    return await pickGroup<T>(name, groups);
  }
};

const pickGroup = async <T extends {}>(
  name: string,
  groups: Array<keyof T>,
) => {
  const randomNumber = Math.random() * (groups.length - 1);
  const indexes = groups.map((_, index) => index);
  const closestIndex = getClosest.number(randomNumber, indexes);
  const group = groups[closestIndex];
  await AsyncStorage.setItem(`experiment-${name}`, String(group));

  SegmentTracker.track('SelectedExperiment', {
    name,
    group,
  });

  return group;
};

interface State {
  group: string | number | symbol;
}

interface Actions {
  setGroup: (group: string | number | symbol) => void;
}

const actions: ActionMap<State, Actions> = {
  setGroup: (group) => () => ({
    group,
  }),
};

interface ExperimentProps<T extends {}> {
  name: string;
  groups: Array<keyof T>;
  children: (selectedExperiment: string | number | symbol) => React.ReactNode;
}

export const Experiment = <T extends {}>({
  name,
  groups,
  children,
}: ExperimentProps<T>) => (
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
