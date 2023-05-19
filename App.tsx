import React from 'react';
import {Text, View} from 'react-native';

function App(): JSX.Element {
  console.log('flipper test');
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>test</Text>
    </View>
  );
}

export default App;
