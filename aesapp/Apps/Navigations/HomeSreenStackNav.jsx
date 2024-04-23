import React from 'react';
import {View, StyleSheet,Text} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import ItemList from '../Screens/itemList';
import HomeScreen from '../Screens/HomeScreen';
import ProductDetail from '../Screens/ProductDetail';


const Stack = createStackNavigator();
const HomeSreenStackNav = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} 
            
            options={{

                headerShown:false,
            }}
            
            />
            <Stack.Screen name="item-list" component={ItemList}  
            
            options={({ route }) => ({ title: route.params.category ,
            
            headerStyle: {

                backgroundColor: '#3b82f6'
            },
            headerTintColor:'#fff'

            })}
                     
            />
            <Stack.Screen name="product-detail" component={ProductDetail}  
             options={{
                    headerStyle: {
                    backgroundColor: '#3b82f6' },
                    headerTintColor:'#fff',
                    headerTitle:'Detail'
                   }}          
            />
           
      </Stack.Navigator>
    );
}

//const styles = StyleSheet.create({})

export default HomeSreenStackNav;
