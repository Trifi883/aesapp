import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/HomeScreen';
import ExploreScreen from '../Screens/ExploreScreen';
import AddPostScreen from '../Screens/AddPostScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import { FontAwesome,Ionicons } from '@expo/vector-icons';
import HomeSreenStackNav from './HomeSreenStackNav';
import ProfileScreenStackNav from './ProfileScreenStackNav';
const Tab = createBottomTabNavigator();

const TabNavigation = () => {
    return (
       <Tab.Navigator screenOptions={{ 
        headerShown:false
       }}> 
        <Tab.Screen name='home-nav' component={HomeSreenStackNav}  
        options={{
            tabBarLabel:({color})=>(
                <Text style={{color:color,fontSize:12,marginBottom:3}}>Home</Text>
            ),
            tabBarIcon:({color,size})=>(
<FontAwesome name="home" size={size} color={color} />
            )
        }}
        />
        <Tab.Screen name='explore' component={ExploreScreen}
         options={{
            tabBarLabel:({color})=>(
                <Text style={{color:color,fontSize:12,marginBottom:3}}>Explore</Text>
            ),
            tabBarIcon:({color,size})=>(
<FontAwesome name="qrcode" size={size} color={color} />

            )
        }}
        
        />
        <Tab.Screen name='addpost' component={AddPostScreen}
         options={{
            tabBarLabel:({color})=>(
                <Text style={{color:color,fontSize:12,marginBottom:3}}>Add Post</Text>
            ),
            tabBarIcon:({color,size})=>(
<FontAwesome name="camera" size={size} color={color} />
            )
        }}
        />
        <Tab.Screen name='profile' component={ProfileScreenStackNav} 

        options={{
            tabBarLabel:({color})=>(
                <Text style={{color:color,fontSize:12,marginBottom:3}}>Profile</Text>
            ),
            tabBarIcon:({color,size})=>(
<Ionicons name="person-circle" size={size} color={color} />
            )
        }} 
        />
       </Tab.Navigator>
    );
}

//const styles = StyleSheet.create({})

export default TabNavigation;
