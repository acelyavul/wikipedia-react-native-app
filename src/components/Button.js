import React from 'react';
import { Text, Pressable } from 'react-native';
import PropTypes from 'prop-types';

import Colors from '../constants/Color';

const Button = props => {
  return (
    <Pressable
      android_ripple={{ color: Colors.lightBlue }}
      disabled={props.disabled}
      onPress={props.onPress}
      style={props.buttonStyle}>
      {props.children}
      <Text testID="label" style={props.labelStyle}>
        {props.label ?? ''}
      </Text>
    </Pressable>
  );
};

Button.propTypes = {
  buttonStyle: PropTypes.object,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  labelStyle: PropTypes.object,
  onPress: PropTypes.func,
};

export default Button;
