import FloatingActionButton from '../../features/dashboard/containers/fab';

export const FAB_COMPONENT = {
  name: 'FABComponent',
};

export const register = (registerComponent) =>
  registerComponent(FAB_COMPONENT.name, () => FloatingActionButton);
