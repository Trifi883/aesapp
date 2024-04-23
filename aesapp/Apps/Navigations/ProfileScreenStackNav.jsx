import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import ProfileScreen from '../Screens/ProfileScreen';
import MyProducts from '../Screens/MyProducts';
import ProductDetail from '../Screens/ProductDetail';

const Stack = createStackNavigator();
const ProfileScreenStackNav = () => {
    return (
   <Stack.Navigator> 

          <Stack.Screen name='profile-tab' component={ProfileScreen}
          
           options={{
             
              headerShown: false,
 
           }}  

          
          />
          <Stack.Screen name='my-product' component={MyProducts}
          
          options={{
               headerStyle:{
                backgroundColor: '#3b82f6',
               },
               headerTintColor: '#fff',
               headerTitle:'My Products'

          }}
          
          
          />
           <Stack.Screen name='product-detail' component={ProductDetail}
          
          options={{
               headerStyle:{
                backgroundColor: '#3b82f6',
               },
               headerTintColor: '#fff',
               headerTitle:'Detail'

          }}
          
          
          />
    </Stack.Navigator>
    );
}

const styles = StyleSheet.create({})

export default ProfileScreenStackNav;
