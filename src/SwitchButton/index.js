import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import styles from './styles';
import TextRegular from '../ui/TextRegular'; 
  const SwitchButton = () => {
  const [isOn, setIsOn] = useState(false);
  const thumbPosition = useSharedValue(0);
  const toggleSwitch = () => {
    setIsOn(!isOn);
    thumbPosition.value = isOn ? 0 : 1;
  };
  const animatedThumbStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withSpring(thumbPosition.value * 26), 
        },
      ],
    };
  });
  const switchContainerStyle = {
    ...styles.switchContainer,
    backgroundColor: isOn ? '#34C759' : 'lightgrey', 
  };
  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <TextRegular style={styles.trackingtext}>
          {isOn ? 'Taking Calls is On' : 'Taking Calls is Off'}
        </TextRegular>
        <TouchableOpacity style={switchContainerStyle} onPress={toggleSwitch}>
          <View style={styles.track} />
          <Animated.View style={[styles.thumb, animatedThumbStyle]} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default SwitchButton;