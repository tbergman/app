/* global require */
import React from 'react';
import { DisabledAnimationButton } from './Button';

// Note that json files cannot be precached. Dont even try it
export const UploadingAnimation = () => (
  <DisabledAnimationButton
    animationModule={require('../../assets/animations/hedvig_uploading_animation.json')}
  />
);
