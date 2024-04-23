import { expo } from 'expo-constants'; // Import for environment variables
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import LoginScreen from './Apps/Screens/LoginScreen';
import { ClerkProvider,SignedIn,SignedOut } from '@clerk/clerk-expo';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './Apps/Navigations/TabNavigation';
import * as Updates from 'expo-updates';

import { useEffect } from 'react';

export default function App() {

/** cmnt */
  async function onFetchUpdateAsync() {
    try {
      const update = await Updates.checkForUpdateAsync();

      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    } catch (error) {
      // You can also add an alert() to see the error message in case of an error when fetching updates.
      alert(`Error fetching latest Expo update: ${error}`);
    }}


 useEffect(()=>{

  onFetchUpdateAsync()

 },[]);

// pk_live_Y2xlcmsuZG5zLWR5bmFtaWMubmV0JA      pk_test_cHJpbWFyeS1ib3hlci0yLmNsZXJrLmFjY291bnRzLmRldiQ    pk_test_bWFnaWNhbC1tYXN0b2Rvbi0zNS5jbGVyay5hY2NvdW50cy5kZXYk

  return (
    <ClerkProvider publishableKey={"pk_live_Y2xlcmsuZG5zLWR5bmFtaWMubmV0JA"}> 
    <View className="flex-1  bg-white">
    
      <StatusBar style="auto" />
      <SignedIn>
      <NavigationContainer> 
      <TabNavigation/>
      </NavigationContainer>
      </SignedIn>
      <SignedOut>
        <LoginScreen/>
        </SignedOut>

    </View>
    </ClerkProvider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
