import React, { useEffect, useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import Header from '../Components/HomeScreen/Header';
import Slider from '../Components/HomeScreen/Slider';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from '../../firebaseConfig';
import Categories from '../Components/HomeScreen/Categories';
import LatestItemList from '../Components/HomeScreen/LatestItemList';

const HomeScreen = () => {
    const db = getFirestore(app);
    const [sliderList, setSliderList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [latestItemList, setItemList] = useState([]);

    useEffect(() => {
        getSliders();
        getCategoryList();
        getLatestItemList();
    }, []);

    const getSliders = async () => {
        try {
            setSliderList([]);
            const querySnapshot = await getDocs(collection(db, 'Sliders'));
            const sliders = [];
            querySnapshot.forEach((doc) => {
                sliders.push(doc.data());
            });
            setSliderList(prevSliders => [...prevSliders, ...sliders]);
        } catch (error) {
            console.error('Error getting sliders:', error);
        }
    };

    const getCategoryList = async () => {
        try {
            setCategoryList([]);
            const querySnapshot = await getDocs(collection(db, 'Category'));
            const categories = [];
            querySnapshot.forEach((doc) => {
                categories.push(doc.data());
            });
            setCategoryList(prevCategories => [...prevCategories, ...categories]);
        } catch (error) {
            console.error('Error getting category list:', error);
        }
    };

    const getLatestItemList = async () => {
        try {
            const querySnapShot = await getDocs(collection(db, 'UserPost'));
            const latestItems = [];
            querySnapShot.forEach((doc) => {
                latestItems.push(doc.data());
            });
            setItemList(latestItems);
        } catch (error) {
            console.error('Error getting latest item list:', error);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View className="py-9 px-6 bg-white flex-1">
                <Header />
                <Slider sliderList={sliderList} />
                <Categories categoryList={categoryList} />
                <LatestItemList latestItemList={latestItemList} heading={'Latest Items'} categories={categoryList} />
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;
