import React from 'react';
import {View, StyleSheet, Text, FlatList, Image} from 'react-native';

export default function Slider({sliderList}){
    return (
        <View className="mt-4">
          <FlatList 
            data={sliderList} 
            horizontal={true} 
            renderItem={({item,index}) =>(

                <View>                     
                 <Image source={{uri:item?.image}} className="h-[155px] w-[225px] mr-3 rounded-lg object-contain"/>
                </View>

            )}
          />
        </View>
    );
}



