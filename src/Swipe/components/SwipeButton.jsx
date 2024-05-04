import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  // useAnimatedGestureHandler,
  useAnimatedStyle,
  GestureDetector,
  useSharedValue,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import {useState} from 'react';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BUTTON_WIDTH = SCREEN_WIDTH - 48;
const BUTTON_HEIGHT = 100;
const BUTTON_PADDING = 10;
const SWIPEABLE_DIMENSIONS = BUTTON_HEIGHT - 2 * BUTTON_PADDING;

const H_WAVE_RANGE = SWIPEABLE_DIMENSIONS + 2 * BUTTON_PADDING;
const H_SWIPE_RANGE = BUTTON_WIDTH - 2 * BUTTON_PADDING - SWIPEABLE_DIMENSIONS;


/// context from reanimated created a object and stroes in the ui thread and it does not come back and forth
const SwipeButton = ({ onToggle }) => {
  const sharedValue = useSharedValue(0);
  const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
  const [toggled, setToggled] = useState(false);
  const handleComplete = (isToggled) => {
    if (isToggled !== toggled) {
      setToggled(isToggled);
      onToggle(isToggled);
    }
  };
  const animatedGestureHandler = GestureDetector({
    onStart: (_, ctx) => {
        ctx.completed = toggled;
      },
    onActive: (e, ctx) => {
        let newValue;
        if (ctx.completed) {
          newValue = H_SWIPE_RANGE + e.translationX;
        } else {
          newValue = e.translationX;
        }
  
        if (newValue >= 0 && newValue <= H_SWIPE_RANGE) {
          sharedValue.value = newValue;
        }
    },
    onEnd: () => {
      if (
        sharedValue.value <
        BUTTON_WIDTH / 2 - SWIPEABLE_DIMENSIONS / 2 - 2 * BUTTON_PADDING
      ) {
        sharedValue.value = withSpring(0);
        runOnJS(handleComplete)(false);
      } else {
        sharedValue.value = withSpring(H_SWIPE_RANGE);
        runOnJS(handleComplete)(true);
      }
    },
  });
  // colors is from the version one use interpolatecolors
  const animatedStylesSwipe = useAnimatedStyle(() => ({
    transform: [{translateX: sharedValue.value}],
    backgroundColor: interpolateColor(
        sharedValue.value,
        [0, H_SWIPE_RANGE],
        ['#1b9aaa', '#fff'],
      ),
  }));
  const InterpolateXInput = [0, H_SWIPE_RANGE];
  const animatedStylesText = useAnimatedStyle(() => ({
    opacity: interpolate(
      sharedValue.value,
      InterpolateXInput,
      [0.7, 0],
      Extrapolation.CLAMP,
    ),
    transform: [
      {
        translateX: interpolate(
          sharedValue.value,
          InterpolateXInput,
          [0, BUTTON_WIDTH / 2 - SWIPEABLE_DIMENSIONS],
          Extrapolation.CLAMP,
        ),
      },
    ],
  }));

  const colorWave = useAnimatedStyle(() => ({
    width: H_WAVE_RANGE + sharedValue.value,
    opacity: interpolate(sharedValue.value, InterpolateXInput, [0, 1]),
  }));
  return (
    <View style={styles.containerStyle}>
      <AnimatedLinearGradient
      colors={['#dd91f2', '#1b9aaa']}
      start={{x: 0.0, y: 0.5}}
      end={{x: 1, y: 0.5}}
       style={[styles.background, colorWave]}
       />
      <PanGestureHandler onGestureEvent={animatedGestureHandler}>
        <Animated.View
          style={[styles.swipeableCircle, animatedStylesSwipe]}></Animated.View>
      </PanGestureHandler>
      <Animated.Text style={[styles.swipeText, animatedStylesText]}>
        Swipe Me
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: 'white',
    height: BUTTON_HEIGHT,
    width: BUTTON_WIDTH,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  swipeableCircle: {
    height: SWIPEABLE_DIMENSIONS,
    width: SWIPEABLE_DIMENSIONS,
    backgroundColor: 'red',
    borderRadius: 100,
    position: 'absolute',
    zIndex: 3,
    left: BUTTON_PADDING,
  },
  swipeText: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    zIndex: 2,
    color: '#1b9aaa',
  },
  background: {
    height: BUTTON_HEIGHT,
    borderRadius: BUTTON_HEIGHT,
    position: 'absolute',
    left: 0,
    backgroundColor: 'red',
  },
});

export default SwipeButton;
