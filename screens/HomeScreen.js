import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Alert,
    Pressable,
    Image,
    TextInput,
    ScrollView
} from 'react-native'
import React, { useEffect, useState } from 'react';
import * as Location from "expo-location";
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

import Carousel from '../components/Carousel';
import Services from '../components/Services';
import DressItem from '../components/DressItem';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../ProductReducer';
import { useNavigation } from "@react-navigation/native";
import { collection, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";



const HomeScreen = () => {
    const cart = useSelector((state) => state.cart.cart);
    const total = cart.map((item) => item.quantity * item.price).reduce((curr, prev) => curr + prev, 0);
    const navigation = useNavigation();
    console.log(cart);
    const [displayCurrentAddress, setdisplayCurrentAddress] = useState("we are loading your location");
    const [locationServicesEnabled, setlocalServicesEnabled] = useState(false);
    useEffect(() => {
        checkIfLocationEnabled();
        getCurrentLocation();
    }, [])
    const checkIfLocationEnabled = async () => {
        let enabled = await Location.hasServicesEnabledAsync();
        if (!enabled) {
            Alert.alert(
                "Location Service not enabled",
                "Please enable the location service",
                [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false }
            );
        } else {
            setlocalServicesEnabled(enabled);
        }
    }
    const getCurrentLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
            Alert.alert(
                "Permission denied",
                "Allow the app to use the location services",
                [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ]);
        }
        const { coords } = await Location.getCurrentPositionAsync();
        // console.log(coords);
        if (coords) {
            const { latitude, longitude } = coords;

            let response = await Location.reverseGeocodeAsync({
                latitude,
                longitude
            })
            // console.log(response);
            for (let item of response) {
                let address = `${item.name} ${item.city} ${item.postalCode}`;
                setdisplayCurrentAddress(address);
            }
        }
    };
    const product = useSelector((state) => state.product.product);
    const dispatch = useDispatch();
    useEffect(() => {
      if (product.length > 0) return;
  
      const fetchProducts = async () => {
        const colRef = collection(db,"types");
        const docsSnap = await getDocs(colRef);
        docsSnap.forEach((doc) => {
          item.push(doc.data());
        });
        item?.map((service) => dispatch(getProducts(service)));
      };
      fetchProducts();
    }, []);
    
    console.log(product);
  
    // console.log(product)
    const services = [
        {
            id: "0",
            image: "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/ry3c3f518z10t4olu4l7 ",
            name: "Paneer 65",
            quantity: 1,
            price: 210,
        },
        {
            id: "11",
            image: "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/druwjzmfmz7qvepq3bkr",
            name: "Chilly Chicken (Boneless)",
            quantity: 0,
            price: 110,
        },
        {
            id: "12",
            image: "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/fsitbray4gq1kxcndqqx",
            name: "Spl Veg Biryani",
            quantity: 0,
            price: 140,
        },
        {
            id: "13",
            image: "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/byonwwb8mzxyqluxlqpq",
            name: "Chilly Paneer",
            quantity: 0,
            price: 160,
        },
        {
            id: "14",
            image: "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/x0jegvlf4h7wrgaaqdqi",
            name: "Chicken 65",
            quantity: 0,
            price: 130,
        },
        {
            id: "15",
            image: "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/akmx533z73jjbq8avy6v",
            name: "Chicken Fried Rice",
            quantity: 0,
            price: 110,
        },
        {
            id: "16",
            image: "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/lv6jl9qdscekjmwkxm9l",
            name: "Egg Fried Rice",
            quantity: 0,
            price: 100,
        },
    ];

    return (
        <>
            <ScrollView style={{ backgroundColor: "#F0F0F0", flex: 1, marginTop: 50 }}>
                {/* Location and profile bar */}

                <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
                    <MaterialIcons name="location-on" size={30} color="#fd5c63" />
                    <View>
                        <Text style={{ fontSize: 18, fontWeight: "600" }}>Home</Text>
                        <Text>{displayCurrentAddress}</Text>
                    </View>

                    <Pressable onPress={() => navigation.navigate("Profile")}  
                    style={{ marginLeft: "auto", marginRight: 7 }} >
                        <Image  
                        style={{ width: 40, height: 40, borderRadius: 20 }}
                            source={{
                                uri: "https://yt3.ggpht.com/hu807DZYWt8SwtGVUsLJ3loDPy-SGpkren2wcinFGJwfM5da2fnNiA9G7wE6U4k0kbTmhtfs_3Y=s88-c-k-c0x00ffffff-no-rj"
                            }} />
                    </Pressable>

                </View>

                {/* Search Bar Starts from here */}

                <View
                    style={{
                        padding: 10,
                        margin: 10,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderWidth: 0.8,
                        borderColor: "#C0C0C0",
                        borderRadius: 7
                    }}>
                    <TextInput placeholder="Search for items or more" />
                    <Feather name="search" size={24} color="#fd5c63" />
                </View>

                {/* Image Carousel */}
                <Carousel />
                {/* Services  */}
                <Services />

                {/* Render all the Products */}
                {
                    services.map((item) => (
                        <DressItem item={item} />
                    )
                    )
}

                


            </ScrollView>

            {total === 0 ? (
                null
            ) : (
                <Pressable
                style={{
                    backgroundColor: "#088F8F",
                    padding: 10,
                    marginBottom: 40,
                    margin: 15,
                    borderRadius: 7,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between"
                }}>
                <View>
                    <Text style={{fontSize:17, fontWeight:"600", color:"white"}}>{cart.length} item | $ {total}</Text>
                    <Text style={{fontSize:12, fontWeight:"400", color:"white", marginVertical:6}}>Extra Charges might be Apply</Text>
                </View>

                <Pressable onPress={() => navigation.navigate("PickUpScreen")}>
                    <Text style={{fontSize:17, fontWeight:"600", color:"white"}}>Proceed to Pickup!</Text>

                </Pressable>

            </Pressable>
            )}

            
        </>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})