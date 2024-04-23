import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, Modal, StyleSheet, ScrollView, TextInput } from 'react-native';
import { getDocs, collection, getFirestore, query, where } from 'firebase/firestore';
import { app } from '../../firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '@clerk/clerk-expo';
import { Table, Row, Rows } from 'react-native-table-component';

const MyProducts = () => {
    const db = getFirestore(app);
    const { user } = useUser();
    const [originalProductList, setOriginalProductList] = useState([]);
    const [productList, setProductList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [filterText, setFilterText] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        user && getUserPost();
        fetchCategories();
    }, [user]);

    useEffect(() => {
        const unsubscribeFocus = navigation.addListener('focus', () => {
            getUserPost();
        });

        return unsubscribeFocus;
    }, [navigation]);

    const getUserPost = async () => {
        try {
            const q = query(collection(db, 'UserPost'), where('userEmail', '==', user?.primaryEmailAddress?.emailAddress));
            const snapshot = await getDocs(q);
            const newData = [];
            snapshot.forEach(doc => {
                newData.push(doc.data());
            });
            setOriginalProductList(newData);
            setProductList(newData);
        } catch (error) {
            console.error('Error fetching user posts:', error);
        }
    };
    
    const fetchCategories = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'Category'));
            const categoriesData = [];
            querySnapshot.forEach(doc => {
                categoriesData.push(doc.data().name);
            });
            setCategories(categoriesData);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleCategoryChange = category => {
        setSelectedCategory(category);
        setModalVisible(false);
        const filteredList = originalProductList.filter(item => item.category === category);
        setProductList(filteredList);
    };

const handleFilterChange = text => {
    setFilterText(text);
    const filteredList = originalProductList.filter(item =>
        Object.values(item).some(field =>
            typeof field === 'string' && field.toLowerCase().includes(text.toLowerCase())
        )
    );
    setProductList(filteredList);
};

    return (
        <View style={styles.container}>
       {/** 
        * <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.button}>
            <Text style={styles.buttonText}>Select Category</Text>
        </TouchableOpacity>
        * 
        */} 
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <ScrollView>
                        {categories.map((category, index) => (
                            <TouchableOpacity key={index} onPress={() => handleCategoryChange(category)} style={styles.categoryItem}>
                                <Text style={styles.categoryText}>{category}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                    <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
        <TextInput
            style={styles.input}
            placeholder="Filter by words ..."
            value={filterText}
            onChangeText={handleFilterChange}
        />
        <ScrollView horizontal={true} contentContainerStyle={{ flexGrow: 1 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <Table borderStyle={{ borderWidth: 1, borderColor: '#ccc' }}>
                    <Row data={['Title', 'Description', 'Model', 'Category', 'SN', 'Fournisseur', 'Reception Date', 'Status', 'team', 'Matricule']} style={styles.tableHeader} textStyle={styles.columnHeader} widthArr={[100, 150, 100, 100, 100, 80, 120, 120, 100]} />
                    <Rows
                        data={productList.map(item => [
                            item.title || ' ',
                            item.description_Material || ' ',
                            item.Model || ' ',
                            item.category || ' ',
                            item.SN || ' ',
                            item.Fournisseur || ' ',
                            item.receptionDate || ' ',
                            item.status || ' ',
                            item.team || ' ',
                            item.Matricule || ' '
                        ])}
                        textStyle={styles.cell}
                        widthArr={[100, 150, 100, 100, 100, 80, 120, 120, 100]}
                    />
                </Table>
            </ScrollView>
        </ScrollView>
    </View>
    
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: 'rgba(255, 111, 97, 0.5)', // Transparent color with 50% opacity
        padding: 15,
        borderRadius: 8,
        marginBottom: 20,
        width: '80%', // Adjust width as needed
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        width: '80%',        maxHeight: '70%',
    },
    categoryItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    categoryText: {
        fontSize: 18,
    },
    closeButton: {
        marginTop: 20,
        alignSelf: 'flex-end',
    },
    closeButtonText: {
        fontSize: 16,
        color: 'blue',
    },
    tableHeader: {
        height: 40,
        backgroundColor: '#f1f8ff'
    },
    columnHeader: {
        textAlign: 'center',
        fontWeight: 'bold'
    },
    cell: {
        textAlign: 'center'
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        top:4,
        width: '80%',
    }
});

export default MyProducts;

