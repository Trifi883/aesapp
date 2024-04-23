import React,{useEffect, useState} from 'react';
import {View, StyleSheet, Text, TextInput, Button, TouchableOpacity, Image, ToastAndroid, Alert, ActivityIndicator,KeyboardAvoidingView,ScrollView} from 'react-native';
import {app} from '../../firebaseConfig';
import { getDocs, getFirestore,collection, addDoc} from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL,uploadBytes  } from "firebase/storage";
import { Formik } from 'formik';
import { hairlineWidth } from 'nativewind';
import moment from 'moment';
import {Picker} from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { useUser } from '@clerk/clerk-expo'; //import { useUser } from '@clerk/clerk-react'
export default function AddPostScreen(){

const [image, setImage] = useState(null);
const {user} =useUser();

//Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const storage = getStorage();
const [loading,setLoading]=useState(false)

const [categoryList,setCategoryList]=useState([]);
const [FournisseurList,setFournisseurList]=useState([]);


const [teamList,setTeamList]=useState([]);
var dateAndTime= moment().format("DD/MM/YYYY HH:mm:ss")
//it will execut in every instance the minimum it runs once []
useEffect(()=>{
getCategoryList();

},[])

useEffect(()=>{
  getTeamList();
  getFournisseurList();
  },[])
  
/**
 * Used to get Category List 
 */
const getCategoryList = async () => {
       setCategoryList([]);
      const querySnapshot = await getDocs(collection(db, "Category"));
      querySnapshot.forEach((doc) => {
          console.log("Docs : ===>", doc.data());
        
          setCategoryList(categoryList => [...categoryList, doc.data()]);
      });

}

/**
 * Used to get Team List 
 */
const getTeamList = async () => {
  setTeamList([]);
 const querySnapshot = await getDocs(collection(db, "team"));
 querySnapshot.forEach((doc) => {
     console.log("Docs : ===>", doc.data());
   
     setTeamList(teamList => [...teamList, doc.data()]);
 });

}



const getFournisseurList = async () => {
  setFournisseurList([]);
 const querySnapshot = await getDocs(collection(db, "Fournisseur"));
 querySnapshot.forEach((doc) => {
     console.log("Docs fournisseur: ===>", doc.data());
   
     setFournisseurList(FournisseurList => [...FournisseurList, doc.data()]);
 });

}
//Pick Image Function
const pickImage = async () => {
  // No permissions request is necessary for launching the image library
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  console.log(result);

  if (!result.canceled) {
    setImage(result.assets[0].uri);
  }
};


const onSubmitMethod=async(value)=>{
  setLoading(true);
  value.image=image; 
  value.user=user.firstName ; 
  value.status = 'available';
  //console.log(value)
  //Convert Url to blob FiLe 
  const resp=await fetch(image);
  const blob=await resp.blob();
  const storageRef = ref(storage, 'communitypost/'+Date.now()+".jpg");

  uploadBytes(storageRef, blob).then((snapshot) => {
    console.log('Uploaded a blob or file!');
  }).then((resp)=>{

    getDownloadURL(storageRef).then(async(downloadURL) => {

    console.log(downloadURL);
    value.image=downloadURL;
    value.userName=user.fullName,
    value.userEmail=user.primaryEmailAddress.emailAddress;
    value.userImage=user.imageUrl

   // Here we adde Documents 
   const docRef=await  addDoc(collection(db,"UserPost"),value)
   if(docRef.id)
   {
    setLoading(false);
    Alert.alert('Success! ✔️', 'Post added successfully');
    console.log("document Added successfully !! ");
   }
    })
  });

}

   
    return(

      
        <ScrollView className="bg-white flex-1">
          <View className="p-10"> 
            <KeyboardAvoidingView> 
          <Image source={require('./../../assets/images/logo.png')} 
                className="w-[125px] h-[26px] mt-[-5px] left-20 object-cover"
                />
          <Text className="text-[27px] font-bold"> Add New Hardware</Text>
          <Text className="text-[16px] text-gray-500 mb-4" >Save your hardware and let's start </Text>
          

            <Formik  initialValues={{title:'',description_Material:'',Model:'',category:'',team:'',Matricule:'',SN:'',Fournisseur:'',receptionDate:'',image:'',userName:'',userEmail:'',userImage:'',createdAt: Date.now(),status: 'available'}}
              onSubmit={value=>onSubmitMethod(value)}
              validate={(values)=> {
                const errors ={}
                if(!values.title){

                  console.log("title is not present");
                  ToastAndroid.show('Title must be there',ToastAndroid.SHORT);


                  errors.name="title must be there"
                }
                return errors 

              }}
              >

               {({handleChange,handleBlur,handleSubmit,values,setFieldValue,errors})=>(
                <View>
                   <TouchableOpacity onPress={pickImage}> 

                   {image?
                    <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />
                   :
                  <Image source={require('./../../assets/images/placeholder.jpg')}
                  style={{width:100,height:100,borderRadius:15}}/>
                    }
                  </TouchableOpacity>
                  <TextInput
                  style={styles.input}
                  placeholder='Title'
                  value={values?.title}
                  onChangeText={handleChange('title')}
                  />
                   <TextInput
                  style={styles.input}
                  placeholder='Description Material'
                  value={values?.description_Material}
                  onChangeText={handleChange('description_Material')}
                  numberOfLines={1}
                  />
                      <TextInput
                  style={styles.input}
                  placeholder='Model'
                  value={values?.Model}
                  onChangeText={handleChange('Model')}
                 
                  />
                  <View style={{borderWidth:1,borderRadius:10,marginTop:15}}> 
                   
                  <Picker 
                  selectedValue={values?.category} 
                  className="border-2"           
                  onValueChange={itemValue=>setFieldValue('category',itemValue)}
                  > 

                

                {categoryList&&categoryList.map((item,index)=>(
                
                item&&<Picker.Item key={index}  label={item?.name} value={item?.name} />
               ))}

                  </Picker>
                  </View>
                  <View style={{borderWidth:1,borderRadius:10,marginTop:15}}> 
                   
                   <Picker 
                   selectedValue={values?.Fournisseur} 
                   className="border-2"           
                   onValueChange={itemValue=>setFieldValue('Fournisseur',itemValue)}
                   > 
 
                 
 
                 {FournisseurList&&FournisseurList.map((item,index)=>(
                 
                 item&&<Picker.Item key={index}  label={item?.name} value={item?.name} />
                ))}
 
                   </Picker>
                   </View>




                  <View style={{borderWidth:1,borderRadius:10,marginTop:15}}> 
                  <Picker 
                  selectedValue={values?.team} 
                  className="border-2"           
                  onValueChange={itemValue=>setFieldValue('team',itemValue)}
                  > 

                

                {teamList&&teamList.map((item,index)=>(
                
                item&&<Picker.Item key={index}  label={item?.team} value={item?.team} />
               ))}

                  </Picker>

              
                  </View>

                  
                   <TextInput
                  style={styles.input}
                  placeholder='Serial Number'
                  value={values?.SN}
                  onChangeText={handleChange('SN')}
                  keyboardType='number-pad'
                  />
                  
                  <View> 
                    <TextInput
                      style={styles.input}
                      placeholder='Date de réception'
                      value={values?.receptionDate}
                      onChangeText={handleChange('receptionDate')}
                      type="date"
                    />
                  </View>

                  
                   <TextInput
                  style={styles.input}
                  placeholder='Matricule'
                  value={values?.Matricule}
                  onChangeText={handleChange('Matricule')}
                  keyboardType='number-pad'
                  />
                  
                  <View> 


                  <TouchableOpacity  onPress={handleSubmit} 
                  
                  style ={{
                    backgroundColor: loading?'#3883c7':'#007BFF'
                  }}
                  disabled ={loading}
                  className="p-4 bg-blue-500 rounded-full mt-5"> 

                  {loading? 
                  <ActivityIndicator  color='#fff' />
                  :
                  <Text className="text-white text-center text-[16px]"> Submit </Text> 
                   }
                   
                  </TouchableOpacity>
                  </View>

                 { /*<Button onPress={handleSubmit} className="mt-7" title="submit"/>*/ } 
                </View>

                
               )}  

            </Formik>
            </KeyboardAvoidingView>
            </View>
            </ScrollView>
        
    );
}
const styles = StyleSheet.create({
  input:{

    borderWidth:1,
    borderRadius:10,
    padding:9,
    paddingHorizontal:15,
    fontSize:16,
    marginTop:10, marginBottom:5,
    textAlignVertical:'top'
  }
    
})


