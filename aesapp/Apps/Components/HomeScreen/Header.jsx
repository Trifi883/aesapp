import { useUser } from '@clerk/clerk-expo';
import React from 'react';
import {View, StyleSheet, Text,Image, TextInput} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Header = () => {
    const {user} = useUser();
    return (

    <View> 


      

        {/*user Info Section */}
        <View className="flex flex-row items-center gap-2">
            <Image source={{uri:user?.imageUrl}} 
            className="rounded-full w-12 h-12"
            />

            <View> 
             <Text className="text-[16px]"> Welcome</Text>
             <Text className="text-[20px] font-bold"> {user?.fullName}</Text>
            </View>
            
        </View>
         {/* Search Bar */}
        
        <View className="p-2 px-5 flex flex-row 
        items-center mt-4 rounded-full border-[1px] border-blue-300 bg-blue-50"> 
        <Ionicons name="search" size={20} color="gray" />
            <TextInput placeholder='search' className="ml-2 text-[18px]"
            onChangeText={(value)=>console.log(value)}
            />
        </View>
    </View>
    );
}

export default Header;
