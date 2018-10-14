import * as React from 'react';
import RNVideo from 'react-native-video';
import styled from '@sampettersson/primitives';

interface VideoProps {
  uri: string;
}

const VideoContainer = styled(RNVideo)({
  height: 300,
  width: 250,
  backgroundColor: 'red',
});

export const Video: React.SFC<VideoProps> = ({ uri }) => (
  <VideoContainer source={{ uri }} muted />
);
