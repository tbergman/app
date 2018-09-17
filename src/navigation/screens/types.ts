import * as React from 'react';

type ComponentCreator = () => React.ComponentType;
export type ComponentRegistrator = (
  name: string,
  componentCreator: ComponentCreator,
) => void;
