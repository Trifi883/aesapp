import {View, StyleSheet,Text} from 'react-native';
import React,{useEffect, useState} from 'react';
import { useRoute } from '@react-navigation/native';
import { getDocs, getFirestore,collection,where,query} from "firebase/firestore";
import { app } from '../../firebaseConfig';
import LatestItemList from '../Components/HomeScreen/LatestItemList';

export default function ItemList(){

    const {params}=useRoute();
    const db=getFirestore(app); 
    const [itemList, setItemList] = useState([]);

 useEffect(() => 
    {   console.log( "this is params data ",params.category);
        params&&getItemListByCategory();
    },[params]);

  const getItemListByCategory=async() => {
         setItemList([]);
         const q=query(collection(db,'UserPost'),where('category','==',params.category)) ;
         const snapshot=await getDocs(q);
         snapshot.forEach(doc => {
         console.log("this is doc data" ,doc.data());
         setItemList(itemList=>[...itemList,doc.data()]);
                                })
  }

    return (
    <View className="p-3">
           {itemList?.length>0?  <LatestItemList latestItemList={itemList}
        
            heading={'Your Selection is ready'}
            />:<Text className="p-5 text-[20px] text-gray-400 justify-center mt-24 text-center ">No Post Found</Text>}
    </View>
    );
}
