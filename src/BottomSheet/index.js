// import {View, Alert, Modal, StyleSheet, ActivityIndicator} from 'react-native';
// import React, {useEffect, useState} from 'react';
// import Button from '../Common/Button';
// import {wp} from '../ui/Responsive';
// import {colors} from '../../Constant/Colors';
// import TextRegular from '../ui/TextRegular';
// import TextBold from '../ui/TextBold';
// const BottomSheet = ({
//   modalVisible = false,
//   setModalVisible = () => {},
//   popupModal = false,
//   setPopupModal,
//   msg = '',
//   title = '',
// }) => {
//   return (
//     <Modal
//       animationType="slide"
//       transparent={true}
//       visible={popupModal}
//       onRequestClose={() => {
//         setPopupModal(false);
//         setModalVisible(false);
//       }}>
//       <View style={styles.centeredView}>
//         <View style={styles.modalView}>
//           <TextBold style={{color: colors.primary}}>{title}</TextBold>
//           <TextRegular numberOfLines={2} style={styles.msg}>
//             {msg}
//           </TextRegular>
//           {/* <View style={styles.btn}> */}
//           <Button
//             onPress={() => {
//               setModalVisible(false);
//               setPopupModal(false);
//             }}
//             btnTxt={'OK'}
//             btnTxtColor="#fff"
//             bgc={colors.primary}
//             style={{
//               width: wp(35),
//               alignSelf: 'center',
//             }}
//           />
//           {/* <Button
//               onPress={() => {}}
//               loading={loading}
//               btnTxt={'Resend OTP'}
//               btnTxtColor="#fff"
//               bgc={colors.primaryDark}
//               style={{
//                 width: wp(35),
//               }}/> */}
//           {/* </View> */}
//         </View>
//       </View>
//     </Modal>
//   );
// };
// export default BottomSheet;
// const styles = StyleSheet.create({
//   centeredView: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//    backgroundColor: 'pink',
//     marginTop: 22,
//     // backgroundColor: 'rgba(0,0,0.5,0.32)',
//   },
//   modalView: {
//     // margin: 20,
//     backgroundColor: 'white',
//     borderRadius: 20,
//     padding: 15,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//     width: wp(90),
//     height: 'auto',
//   },
//   btn: {
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     width: wp(80),
//     flexDirection: 'row',
//   },
//   msg: {
//     alignSelf: 'center',
//     textAlign: 'center',
//     color: '#000',
//     fontSize: wp(4),
//     fontWeight: '700',
//     marginVertical: 6,
//   },
// });
// BottomSheet.js


import { Dimensions, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useEffect, useImperativeHandle } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 50;

const BottomSheet = React.forwardRef(({ children }, ref) => {
  const translateY = useSharedValue(0);
  const active = useSharedValue(false);

  const scrollTo = useCallback((destination) => {
    'worklet';
    active.value = destination !== 0;

    translateY.value = withSpring(destination, { damping: 50 });
  }, []);

  const isActive = useCallback(() => {
    return active.value;
  }, []);

  useImperativeHandle(ref, () => ({ scrollTo, isActive }), [
    scrollTo,
    isActive,
  ]);

  const context = useSharedValue({ y: 0 });
  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value };
    })
    .onUpdate((event) => {
      translateY.value = event.translationY + context.value.y;
      translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
    })
    .onEnd(() => {
      if (translateY.value > -SCREEN_HEIGHT / 3) {
        scrollTo(0);
      } else if (translateY.value < -SCREEN_HEIGHT / 1.5) {
        scrollTo(MAX_TRANSLATE_Y);
      }
    });

  const rBottomSheetStyle = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      translateY.value,
      [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
      [25, 5],
      Extrapolate.CLAMP
    );

    return {
      borderRadius,
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.bottomSheetContainer, rBottomSheetStyle]}>
        <View style={styles.line} />
        {children}
      </Animated.View>
    </GestureDetector>
  );
});

const styles = StyleSheet.create({
  bottomSheetContainer: {
    height: SCREEN_HEIGHT,
    width: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    top: SCREEN_HEIGHT,
    borderRadius: 25,
  },
  line: {
    width: 75,
    height: 4,
    backgroundColor: 'grey',
    alignSelf: 'center',
    marginVertical: 15,
    borderRadius: 2,
  },
});

export default BottomSheet;
