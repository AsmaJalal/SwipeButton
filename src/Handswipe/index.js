import React, { useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  Easing,
  withRepeat,
} from 'react-native-reanimated';
import { wp, hp } from '../../Component/ui/Responsive';
import { Images } from '../../Constant/Images';
const initialOffset = 100;
const duration = 1500;
const Handswipe = () => {
  const offset = useSharedValue(initialOffset);
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));
  useEffect(() => {
    offset.value = withRepeat(
      withSequence(
        withTiming(initialOffset, { duration, easing: Easing.cubic }),
        withTiming(-initialOffset, { duration, easing: Easing.cubic })
      ),
      -1,
      true
    );
  }, []);
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, animatedStyles]}>
        <Image
          source={Images.swipeto_right}
          style={{ width: '100%', height: '100%' }} 
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'transparent', 
    height: '100%',
  },
  box: {
    height: wp(12), 
    width: wp(12), 
    // backgroundColor: 'transparent',
  },
});
export default Handswipe;