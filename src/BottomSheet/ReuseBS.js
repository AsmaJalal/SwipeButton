// import React, { useCallback, useRef } from 'react';
// import { StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import BottomSheet from './src/Component/BottomSheet';
// import {wp, hp} from './src/Component/ui/Responsive';

// export default function App() {
//   const ref = useRef(null);

//   const onPress = useCallback(() => {
//     const isActive = ref?.current?.isActive();
//     if (isActive) {
//       ref?.current?.scrollTo(0);
//     } else {
//       ref?.current?.scrollTo(-700);
//     }
//   }, []);

//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <View style={styles.container}>
//         {/* <StatusBar style="light" /> */}
//         <TouchableOpacity style={styles.button} onPress={onPress} />
//         <BottomSheet ref={ref}>
//           <View style={{ flex: 1, backgroundColor: 'lightgreen', height: wp(70) }} />
//         </BottomSheet>
//       </View>
//     </GestureHandlerRootView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#111',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   button: {
//     height: 50,
//     borderRadius: 25,
//     aspectRatio: 1,
//     backgroundColor: 'white',
//     opacity: 0.6,
//   },
// });
