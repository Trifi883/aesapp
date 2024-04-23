import React from 'react';
import {View, StyleSheet,Text,Image, TouchableOpacity} from 'react-native';
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from "../../hooks/useWarmUpBrowser";
import { useOAuth } from "@clerk/clerk-expo";

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {

  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow();
 
      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error ", err);
    }
  }, []);


    return (
        <View>
            <Image source={require('./../../assets/images/Login.jpg')}  
            className="w-[500px] h-[370px] object-cover"
             />
             <View className="p-8 items-center bg-white rounded-3xl mt-[-20px]  shadow-md"> 
                <Text className="text-[30px] font-bold mt-[-11px]">ACTIA Labstock PRO</Text>
                <Text className="text-[16px] text-slate-500 mt-6">Your Trusted Inventory Management Solution</Text>
                <TouchableOpacity onPress={onPress} className="p-4 bg-blue-400 rounded-full mt-20 w-auto"> 
                    <Text className="text-white text-center text-[19px]">          Get Started          </Text>
                </TouchableOpacity>
                <Image source={require('./../../assets/images/logo.png')} 
                className="w-[240px] h-[46px] object-cover mt-[75px] pr-15 "
                /> 
             </View>
    
        </View>
    );
}

//const styles = StyleSheet.create({})

export default LoginScreen;
