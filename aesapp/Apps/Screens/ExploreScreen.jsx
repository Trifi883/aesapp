import React, { useState, useEffect, useRef } from "react";
import { Text, View, StyleSheet, ScrollView, Alert, ActivityIndicator, TouchableOpacity ,Animated,Easing,Image} from "react-native";
import { CameraView, Camera } from "expo-camera/next";
import { getFirestore, collection, getDocs, query, where, doc, updateDoc, Timestamp } from "firebase/firestore"; // import Timestamp from firestore
import { app } from '../../firebaseConfig';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import logoImage from './../../assets/images/logo.png';

export default function ExploreScreen() {
  const borderAnimation = useRef(new Animated.Value(0)).current;
  const [hasPermission, setHasPermission] = useState(null);
  const [scannedCode, setScannedCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [codeScanned, setCodeScanned] = useState(false);
  const [alerts, setAlerts] = useState([]); // State to hold alerts
  const cameraRef = useRef(null);
  const db = getFirestore(app);

  const animateBorder = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(borderAnimation, {
          toValue: 0.8,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(borderAnimation, {
          toValue: 0,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
      ])
    ).start();
  };

  useEffect(() => {
    animateBorder();
    getCameraPermissions();
    return () => {
      if (cameraRef.current) {
        // cameraRef.current.stopPreview(); // Stop camera preview on unmount
      }
    };
  }, []);

  const getCameraPermissions = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === "granted");
  };

  const handleBarCodeScanned = async ({ data }) => {
    if (!codeScanned) {
      setScannedCode(data);
      try {
        setLoading(true);
        const q = query(collection(db, 'UserPost'), where("SN", "==", data));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          showAlert('Not Found', `No item with SN: ${data} found in the database`);
        } else {
          const docSnapshot = querySnapshot.docs[0];
          const itemData = docSnapshot.data();
          
          if(itemData.instrumentationDate && itemData.returnDate) {
            const instrumentationDate = itemData.instrumentationDate.toDate();
            const returnDate = itemData.returnDate.toDate();
  
            const diffInMs = returnDate - instrumentationDate;
            const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diffInMs % (1000 * 60)) / 1000);
  
            const formattedPeriod = `${days.toString().padStart(2, '0')}D:${hours.toString().padStart(2, '0')}H:${minutes.toString().padStart(2, '0')}M:${seconds.toString().padStart(2, '0')}S`;
  
            showAlert('Item Status', `Item with SN: ${data} is currently '${itemData.status}'.\nInstrumentation Date: ${instrumentationDate.toLocaleDateString()}\nReturn Date: ${returnDate.toLocaleDateString()}\nPeriod: ${formattedPeriod}`);
          } else {
            showAlert('Item Status', `Item with SN: ${data} is currently '${itemData.status}'.\nInstrumentation and return dates are not available.`);
          }
        }
      } catch (error) {
        console.error("Error fetching document:", error);
        showAlert('Error', 'Failed to fetch item status');
      } finally {
        setLoading(false);
        setCodeScanned(true);
      }
    }
  };
  
  
  const resetScan = () => {
    setScannedCode(null);
    setCodeScanned(false);
  };

  const updateInstrumentation = async () => {
    await updateStatus('instrumentation');
  };

  const turnBackInstrumentationStatus = async () => {
    await updateStatus('available');
  };

  const updateStatus = async (status) => {
    try {
      if (scannedCode) {
        setLoading(true);
        const q = query(collection(db, 'UserPost'), where("SN", "==", scannedCode));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          showAlert('Not Found', `No item with SN: ${scannedCode} found in the database`);
        } else {
          const docSnapshot = querySnapshot.docs[0];
          const itemRef = doc(db, 'UserPost', docSnapshot.id);
          if (docSnapshot.exists()) {
            // Get current date and time
            const currentDate = Timestamp.now();
            let updateData = { status };
            if (status === 'instrumentation') {
              updateData.instrumentationDate = currentDate;
            } else if (status === 'available') {
              updateData.returnDate = currentDate;
            }
            await updateDoc(itemRef, updateData);
            showAlert('Status Updated', `Item with SN: ${scannedCode} status updated to '${status}'.`);
          } else {
            showAlert('Not Found', `No item with SN: ${scannedCode} found in the database`);
          }
        }
      } else {
        showAlert('Error', 'No code scanned yet');
      }
    } catch (error) {
      console.error("Error updating document:", error);
      showAlert('Error', 'Failed to update item status');
    } finally {
      setLoading(false);
      resetScan();
    }
  };
  
  const handleScanAgain = () => {
    resetScan();
  };

  const showAlert = (title, message) => {
    const newAlert = { title, message };
    setAlerts([newAlert]); // Open new alert, closing others
  };

  const handleCloseAlert = () => {
    setAlerts([]); // Close all alerts
  };

  if (hasPermission === null) {
    return <Text>Requesting Camera Permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No Access to Camera</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <CameraView
          ref={cameraRef}
          onBarcodeScanned={handleBarCodeScanned}
          barcodeScannerSettings={{ barcodeTypes: ["qr", "pdf417"] }}
          style={styles.camera}
        >  

        {/* Overlay the logo image */}
        <Image source={logoImage} style={styles.logo} /> 
            <Animated.View
                    style={[
                        styles.cameraOverlay,
                        {
                        borderWidth: borderAnimation.interpolate({
                            inputRange: [0, 0.2, 0.4, 0.6, 0.8, 1],
                            outputRange: [2, 4, 6, 8, 10, 10], // Maintain final width at 10
                        }),
                        },
                    ]}
                    />

        </CameraView>
        {scannedCode && (
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              onPress={handleScanAgain}
              style={[styles.button, styles.scanAgainButton]}
            >
              <FontAwesome name="refresh" size={24} color="black" />
              <Text style={styles.buttonText}>Scan Again</Text>
            </TouchableOpacity>
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                onPress={updateInstrumentation}
                style={[styles.button, styles.firstButton]}
              >
                <FontAwesome name="cog" size={24} color="black" />
                <Text style={styles.buttonText}>Instrumentation</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={turnBackInstrumentationStatus}
                style={styles.button}
              >
                 <FontAwesome name="undo" size={24} color="black" />
                <Text style={styles.buttonText}>Turn Back</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}

      {/* Render alerts */}
      {alerts.map((alert, index) => (
        <AlertComponent
          key={index}
          title={alert.title}
          message={alert.message}
          onClose={handleCloseAlert}
        />
      ))}
    </ScrollView>
  );
}

// Separate component for alert
const AlertComponent = ({ title, message, onClose }) => {
  useEffect(() => {
    Alert.alert(
      title,
      message,
      [{ text: "OK", onPress: onClose }],
      { cancelable: false }
    );
  }, []); // Run only once when component mounts

  return null; // Render nothing in the component
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
    camera: {
    width: "100%",
    aspectRatio: 3 / 4, // Adjust aspect ratio as needed
    position: 'relative',
  },
  cameraOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderColor: 'white',
    borderWidth: 5, // Adjusted for thinner border
   // borderRadius: 5, // Optional: Slightly rounded corners
    overflow: 'hidden', // Clip content
  },
  
  buttonsContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonGroup: {
    flexDirection: 'row',
    marginTop: 10,
  },
  button: {
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: 10,
    borderRadius: 20, // Add border radius to buttons
    padding: 10,
    backgroundColor: '#4CAF50', // Green color
    width: '45%', // Ensure all buttons take up 45% of the screen width
  },
  scanAgainButton: {
    marginBottom: 10,
  },
  firstButton: {
    marginRight: 5,
  },
  logo: {
    position: 'absolute',
    top: 20, // Adjust top position as needed
    left: 20, // Adjust left position as needed
    width: 140, // Adjust width as needed
    height: 30, // Adjust height as needed
    zIndex: 1, // Ensure logo is above other elements
  },
  buttonText: {
    marginTop: 5,
    color: '#FFFFFF', // White text color for better contrast
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  }
});


