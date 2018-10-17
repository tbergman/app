import * as React from 'react';
import { View, Text } from 'react-native';
import { colors } from '@hedviginsurance/brand';
import ProgressImage from 'react-native-image-progress';
import * as Progress from 'react-native-progress';

import { Giphy } from 'src/components/icons/Giphy';
import { Spacing } from 'src/components/Spacing';

interface GiphyMessageProps {
  url: string;
}

export const GiphyMessage: React.SFC<GiphyMessageProps> = ({ url }) => (
  <View
    style={{
      borderRadius: 20,
      overflow: 'hidden',
      marginBottom: 10,
    }}
  >
    <Image
      source={{
        uri: url,
      }}
      indicator={Progress.CircleSnail}
      indicatorProps={{
        size: 40,
        thickness: 5,
        color: colors.PINK,
      }}
      style={{ width: 280, height: 200 }}
    />
    <View
      style={{
        borderWidth: 1,
        borderTopWidth: 0,
        borderColor: colors.LIGHT_GRAY,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        paddingLeft: 15,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
      }}
    >
      <Giphy width={20} height={20} />
      <Spacing width={10} />
      <Text
        style={{
          marginTop: 1,
          fontSize: 12,
          fontFamily: 'Helvetica Neue',
          fontWeight: '500',
          color: colors.DARK_GRAY,
        }}
      >
        GIPHY
      </Text>
    </View>
  </View>
);
