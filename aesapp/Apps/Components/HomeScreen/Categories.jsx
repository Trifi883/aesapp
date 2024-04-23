import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {View, StyleSheet,Text, FlatList,Image, TouchableOpacity} from 'react-native';

export default function Categories({categoryList}){


    const navigation =useNavigation();

    return (

        <View className="mt-5">
            <Text className="font-bold text-[18px]"> Categories </Text>
            
            <FlatList
                
                data={categoryList}
                numColumns={4}
                renderItem={({item,index})=>(
                    <TouchableOpacity className="flex-1 items-center first-letter:
                    justify-center p-0 border-[1px] border-gray-300 m-1 h-[70px] rounded-lg bg-blue-50  
                    
                    "
                    onPress={()=>navigation.navigate('item-list',{category:item.name})}
                    > 
                        <Image source={{uri:item.icon}} 
                        className="w-[40px] h-[40px]"
                        />    
                        <Text className="text-[10px] mt-1 font-bold"> {item.name}</Text>                   
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}


