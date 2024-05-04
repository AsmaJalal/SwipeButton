import React from 'react';
import {FlatList, StyleSheet, View, Text} from 'react-native';
import AnimatedSwitchButton from '../components/AnimatedSwitchButton';

const data = [
  {
    id: 0,
    title: 'How to Create Swipe Buttons',
    status: false,
  },
  {
    id: 1,
    title: 'New Methods to try',
    status: true,
  },
  {
    id: 3,
    title: 'How to use coding ',
    status: true,
  },
  {
    id: 4,
    title: 'What is coding about',
    status: false,
  },
  {
    id: 5,
    title: 'How to create animations',
    status: true,
  },
  {
    id: 6,
    title: 'Possible to create layout animations?',
    status: false,
  },
  {
    id: 7,
    title: 'How to Create Swipe Buttons',
    status: true,
  },
];

const SwitchListItems = () => (
  <FlatList
    data={data}
    keyExtractor={item => item.id.toString()}
    renderItem={({item}) => (
      <ListItem title={item.title} status={item.status} />
    )}
    contentContainerStyle={{paddingHorizontal: 24}}
  />
);

const ListItem = ({title, status}) => {
  return (
    <View style={styles.listItem}>
      <Text>{title}</Text>
      <AnimatedSwitchButton value={status} height={24} width={50} />
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 24,
  },
});

export default SwitchListItems;
