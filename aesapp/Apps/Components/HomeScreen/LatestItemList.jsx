import React, { useState } from 'react';
import { View, StyleSheet, Text, FlatList, Image, ScrollView, TouchableOpacity, Modal } from 'react-native';
import PostItem from './PostItem';

const LatestItemList = ({ latestItemList, heading, categories }) => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setModalVisible(false);
    };
    
    return (
        <View className="mt-3">
            <Text className="font-bold text-[20px]">{heading}</Text>

            <FlatList
                data={latestItemList}
                numColumns={2}
                renderItem={({ item, index }) => (
                    <PostItem item={item} categories={categories} onCategorySelect={handleCategorySelect} />
                )}
            />

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Select a category:</Text>
                        <FlatList
                            data={categories}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => handleCategorySelect(item)}>

                                    <Text style={styles.modalItem}>{item}</Text>
                                    
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        elevation: 5,
    },
    modalText: {
        fontSize: 18,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    modalItem: {
        fontSize: 16,
        marginBottom: 10,
    },
});

export default LatestItemList;
