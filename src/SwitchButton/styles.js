import { StyleSheet } from 'react-native';
import { colors } from '../../Constant/Colors';
import { hp, wp } from '../ui/Responsive';
export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#fff',
  },
  switchContainer: {
    width: wp(16),
    height: wp(6),
    borderRadius: wp(10),
    justifyContent: 'center',
    paddingHorizontal: wp(4),
    marginVertical: wp(4),
    marginLeft: wp(2),
  },
  track: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 13,
  },
  thumb: {
    width: wp(5),
    height: wp(5),
    backgroundColor: colors.bgc1,
    borderRadius: wp(10),
    zIndex: (1),
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: wp(60),
    height: wp(8),
  },
  trackingtext: {
    marginRight: wp(4),
  },
});