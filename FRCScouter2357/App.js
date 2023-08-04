import { Provider } from '@react-native-material/core';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, View } from 'react-native';
import TeleopLayout from './components/layouts/TeleopLayout';

function App() {
  return (
    <Provider style={styles.container}>
      <TeleopLayout/>
    </Provider>
  ); 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  });

export default App;