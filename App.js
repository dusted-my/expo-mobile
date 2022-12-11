import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider } from 'react-native-paper';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Badge } from 'react-native-paper';
import * as React from 'react';
import { List, MD3Colors } from 'react-native-paper';



export default function App() {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <Image style={{resizeMode : "contain",height: 100,width: 200}} source={require('./assets/dusted.png') }/>
        <StatusBar style="auto" />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
