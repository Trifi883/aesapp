import { useUser } from '@clerk/clerk-expo';
import React from 'react';
import {View, StyleSheet,Text, Image, FlatList, Touchable, TouchableOpacity} from 'react-native';
import logoImage from './../../assets/images/logo.png';
import logout from './../../assets/images/Logout.png';
import qrcode from './../../assets/images/qrcode.png';
import notes from './../../assets/images/notes.png';
import { useNavigation } from '@react-navigation/native';
import { ClerkProvider, SignedIn, SignedOut,useAuth } from "@clerk/clerk-expo";
const ProfileScreen = () => {

const navigation = useNavigation();

const onMenuPress = (item) =>{

    if(item.name=='Logout')
    {
        signOut();
        return ; 
    }
    
    item?.path?navigation.navigate(item.path):null  
    
        }
        
    const {user}=useUser();  
    const { isLoaded,signOut } = useAuth();

    const menuList=[
                {
                id:1, 
                name:'My Products',
                icon:notes,
                path:'my-product'
                },
                {
                id:2, 
                name:'QR',
                icon:qrcode,
                path:'explore'
                },  {
                    id:3, 
                    name:'Logout',
                    icon:logout
                    },          

    ]



    return (
        <View className="p-2 bg-white flex-1">
            <View className="items-center mt-14" > 
            <Image source={{uri:user?.imageUrl}} 
             className="w-[80px] h-[80px] rounded-full"
           />
           <Text className="font-bold text-[25px] mt-2">{user?.fullName} </Text>
           <Text className=" text-[18px] mt-2 text-gray-500">{user?.primaryEmailAddress.emailAddress} </Text>
            </View>

            <FlatList
            
            data={menuList}
            numColumns={3}
            style={{margin:15}}
            renderItem={({item,index})=>(

            <TouchableOpacity 
            onPress={()=>onMenuPress(item)}
            className="flex-1 p-2 border-[1px] items-center m-5 rounded-lg border-blue-400 bg-blue-50 mx-2 mt-4"> 
             {item.icon&&<Image source={item.icon} className="w-[50px] h-[50px]"/>}
            <Text className="text-[12px] mt-2 text-blue-700">{item.name}</Text>
            </TouchableOpacity>

            )}
            
            />
          
        </View>
    );
}

export default ProfileScreen;
