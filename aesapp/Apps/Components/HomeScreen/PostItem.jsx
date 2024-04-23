import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PostItem = ({ item, onPress }) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => navigation.push('product-detail', { product: item })}
        >
            <View style={styles.row}>
                <Text style={styles.title}>{item.title}</Text>
            </View>
            <View>
                <Text style={styles.SN}>SN: {item.SN}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.category}>{item.category}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 2,
        padding: 10,
        borderWidth: 1,
        borderColor: '#D1D5DB', // Slate color
        borderRadius: 5,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    SN: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#3B82F6', // Blue color
    },
    category: {
        backgroundColor: '#93C5FD', // Blue background
        color: '#3B82F6', // Blue color
        padding: 3,
        borderRadius: 20,
        fontSize: 10,
        textAlign: 'center',
        width: 70,
    },
});

export default PostItem;
