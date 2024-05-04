import React, { useState, useEffect } from 'react';
import { View, Alert, TouchableOpacity,Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SwipeButton from 'rn-swipe-button';
import { wp } from '../../Component/ui/Responsive';
import { colors } from '../../Constant/Colors';
const MySwipeButton = () => {
  const [swipeLeft, setSwipeLeft] = useState("Not Available For calls");
  const [swipedRight, setSwipedRight] = useState(false);
  const handleSwipe = (direction) => {
    if (direction === 'right') {
      setSwipeLeft("Not Available For calls");
      setSwipedRight(false);
      Alert.alert('Not Available For calls!');
    } else {
      setSwipeLeft("Available For calls");
      setSwipedRight(true); 
      Alert.alert('Available For calls!');
    }

    // if (direction === 'left') {
    //   setSwipedRight("Not Available For calls");
    //   setSwipeLeft(true);
    //   Alert.alert('Not Available For calls!');
    // } else {
    //   setSwipedRight("Available For calls");
    //   setSwipeLeft(false); // Reset flag on left swipe or no swipe
    //   Alert.alert('Available For calls!');
    // }
  };
  return (
    <View style={{
      flex: 1,
        // justifyContent: 'center',
        // backgroundColor: 'rgba(0, 0, 0, 0.5)',
    }}>
      <View style={{  alignItems: 'center', borderRadius: wp(20), }}>
            <LinearGradient
              colors={['#A561D8', '#FFB515']}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={{
                borderRadius: 50,
                width: wp(75),
                height: wp(12),
              }}>
              <SwipeButton
                disabled={false}
                swipeSuccessThreshold={1}
                height={38.6}
                width={300}
                title={swipeLeft || (swipedRight ? "Available For calls" : "Not Available For calls")}
                onSwipeSuccess={(direction) => handleSwipe(direction)}
                railFillBackgroundColor="transparent"
                railFillBorderColor="transparent"
                thumbIconBackgroundColor="#ffffff"
                thumbIconBorderColor="#ffffff"
                railBorderColor="transparent"
                railBackgroundColor="transparent"
                titleStyles={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: 'white',
                  textAlign: 'center',
                }}
              />
           </LinearGradient>
          </View>
    </View>
  );
};
export default MySwipeButton;