import React,{useEffect, useState} from 'react';
import {View, StyleSheet, Text, TextInput, Button, TouchableOpacity, Image, ToastAndroid, Alert, ActivityIndicator,KeyboardAvoidingView,ScrollView, Linking} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { getDocs, getFirestore,collection, addDoc, query, where, deleteDoc} from "firebase/firestore";
import { useUser } from '@clerk/clerk-expo';
import { app } from '../../firebaseConfig';

const ProductDetail = () => {
   const db=getFirestore(app);
const nav=useNavigation();

    const {params}=useRoute();
    const [product,setProduct]=useState([]);
    const {user}=useUser();
    
    useEffect(()=>{
      setProduct([]);
 params&&setProduct(params.product);

      },[params,nav])



      const sendEmailMessage=()=>{
        const subject='Regarding  '+ product.category + " " +"[ "+product.title +" ]";
        const body ="Hi "+product.userName+"\n"+" You need to turn back this  "+product.category;;

        Linking.openURL('mailto:'+product.userEmail+"?subject="+subject+"&body="+body);
    



      }
      const deleteUserPost=()=>{
          Alert.alert('Do you want to Delete ?',"Are you want to delete this Post",[

                     {text:'Yes',
                     onPress:()=>deleteFromFirestore()
                     
                        },
                        {

                           text:'Cancel',
                           onPress:()=> console.log('Cancel Pressed'),
                           style:'cancel',
                        },
                              
                     
                       ]                              
                              )}

      


      const deleteFromFirestore=async()=> { 


  console.log('deleteFromFirestore');

   const q=query(collection(db,'UserPost'),where('title','==',product.title));
   const snapshot=await getDocs(q);
   snapshot.forEach(doc=>{

       deleteDoc(doc.ref).then(resp=>{

         console.log("Deleted the Doc ...");
         nav.goBack();
      
      
      
      })

   })

      }
    return (
        <ScrollView className="bg-slate-50">
            
           <Image source={{uri:product.image}} 
           
           className="h-[300px] w-full"
           />
             <View className="p-3"> 

                <Text className="text-[24px] font-bold"> {product?.title}</Text>
                <View className="items-baseline" > 
                <Text className=" bg-blue-200 p-1 px-2 rounded-full text-blue-500"> {product?.category}</Text>
                </View>
                <Text className="mt-3 text-[20px] font-bold"> Description </Text>
                <Text className="text-[17px] text-gray-500"> {product?.desc}</Text>

             </View>
             {/*user information */}
             <View className="p-3 m-3 ml-7 flex flex-row items-center gap-3 border-[1px] bg-blue-100 border-gray-400 w-full" > 
               <Image source={{uri:product.userImage}}
               
               className="w-12 h-12 rounded-full"
               
               />
               
               <View>
                <Text className="font-bold text-[18px]"> 
                        {product.userName} 
                   
                </Text> 
                <Text className="text-gray-500"> 
                       
                        {product.userEmail} 
                </Text> 
                </View>
             
              
             </View>
        {user?.primaryEmailAddress.emailAddress==product.userEmail? 
        
      
      
        <TouchableOpacity className="z-40 bg-red-500  rounded-full p-4 m-2"
             
        onPress={()=>deleteUserPost()}


        > 

           <Text className="text-center text-white">Delete</Text>
        </TouchableOpacity>
                   
      : 
      <TouchableOpacity className="z-40 bg-blue-500  rounded-full p-4 m-2"
      
      onPress={()=>sendEmailMessage()}
      > 

         <Text className="text-center text-white">Send Message </Text>
      </TouchableOpacity>
                 
      
      }
      
        </ScrollView>
    );
   };

const styles = StyleSheet.create({})

export default ProductDetail;
