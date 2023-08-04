import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, View } from 'react-native';
import TeleopLayout from './components/layouts/TeleopLayout';

function App() {
  return (
    <View style={styles.container}>
      <TeleopLayout/>
    </View>
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