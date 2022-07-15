import Svg, { Path } from 'react-native-svg';
import React from 'react';
import { View } from 'react-native';
import Colors from '../constants/Color';

exports.ChevronLeft = function ({ style, testID, size, color }) {
  return (
    <View style={style} testID={testID}>
      <Svg
        width={size ?? 16}
        height={size ?? 16}
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.78 2.22a.75.75 0 0 0-1.06 0L4.468 7.472a.75.75 0 0 0 0 1.06l5.252 5.252a.75.75 0 1 0 1.06-1.06L6.06 8.001l4.72-4.721a.75.75 0 0 0 0-1.06Z"
          fill={color ?? Colors.black}
        />
      </Svg>
    </View>
  );
};

exports.Close = function ({ style, testID, size, color }) {
  return (
    <View style={style} testID={testID}>
      <Svg
        width={size ?? 16}
        height={size ?? 16}
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4.28 3.22a.75.75 0 0 0-1.06 1.06L6.94 8l-3.72 3.72a.75.75 0 1 0 1.06 1.06L8 9.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L9.06 8l3.72-3.72a.75.75 0 0 0-1.06-1.06L8 6.94 4.28 3.22Z"
          fill={color ?? Colors.black}
        />
      </Svg>
    </View>
  );
};
