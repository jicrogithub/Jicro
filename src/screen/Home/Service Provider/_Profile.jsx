import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, Linking } from 'react-native'
import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import { main } from '../../../utils/colors'
import MapView, { Marker, } from 'react-native-maps';
import SelectDropdown from 'react-native-select-dropdown'
import Button from './../../components/Button';
import { launchImageLibrary } from 'react-native-image-picker';
import { requestLocationPermission, getCurrentPostiton, getCurrentLocation } from '../../../helper/Location';
import GooglePlacesInput from './components/GooglePlacesAutocomplete';
import RBSheet from "react-native-raw-bottom-sheet";
import WhatsApp from './../../Auth/components/WhatsApp';
import { useUpload } from '../../../suppliers/BackendInteractions/Utils';
import { useAuth } from '../../../suppliers/BackendInteractions/Auth';
import { useLoading } from '../../../suppliers/StateManagement/Loading';
const prof = ["Electrician", "Plumbing", "Carpentering", "House Cleaning", "Cooking", "Gardener", "Home organizer", "Painter", "Personal trainer", "Massage therapist", "Hair stylist or barber", "Technician", "Mobile car wash and Fixing."];
const _Profile = ({ navigation }) => {
  const { verifyServiceProvider,shouldNavigateServiceProvider } = useAuth()
  const { setLoading } = useLoading()
  const [buttonText, setButtonText] = useState("")
  const { upload, uri, imageFor } = useUpload();
  const [address, setAddress] = useState("")
  const [profession, setProfession] = useState("")
  const [waId, setWaId] = useState("")
  const [name, setName] = useState("")
  const [image, setImage] = useState({
    banner: "",
    logo: "",
    proof: ""
  })
  useEffect(()=>{
    shouldNavigateServiceProvider && navigation.replace("ServiceProviderNavigation")
  },[shouldNavigateServiceProvider])
  useEffect(() => {
    const linkingEvent = Linking.addEventListener('url', handleDeepLink);
    Linking.getInitialURL().then(url => {
      if (url) {
        handleDeepLink({ url });
      }
    });
    return () => {
      linkingEvent.remove();
    };
  }, [handleDeepLink]);
  const handleDeepLink = useCallback(async url => {
    const regExp = /waId=([\w-]+)/;
    const match = url.url.match(regExp);
    if (match) {
      setLoading(false)
      setButtonText("Phone Number Added")
      const waID = match[1];
      setWaId(waID)
    } else {
      alert("Something went Wrong");
    }
  },[])
  const refRBSheet = useRef();
  const mapRef = useRef(null);
  const handleRegionChange = useCallback((newCords) => {
    setCords(newCords);
    mapRef?.current?.animateToRegion(newCords, 3000);
  },[])
  const [cords, setCords] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0,
  })

  useEffect(() => {
    getLiveLocation()
    console.log("Hello")
  }, []);
  
  const getLiveLocation = async () => {
    const location = await requestLocationPermission()
    if (location === "granted") {
      const response = await getCurrentPostiton()
      handleRegionChange({
        latitude: response.latitude,
        longitude: response.longitude,
        latitudeDelta: 0.0002,
        longitudeDelta: 0.000001
      });
    }
  }
  useEffect(() => {
    if (imageFor === "banner") {
      setImage({ ...image, banner: uri })
    } else if (imageFor === "logo") {
      setImage({ ...image, logo: uri })
    } else {
      setImage({ ...image, proof: uri })
    }
  }, [imageFor])

  return (
    <>
      <View className={`bg-[${main.primary}] w-full rounded-b-3xl`} >
        <Text className={`text-white text-6xl font-black text-center mt-1 mb-[-10px]`} >Jicro</Text>
      </View>
      <ScrollView className="h-screen bg-white px-3" >
        <View className="py-2" >
          {
            image.banner !== "" ? (<Image className={`w-full h-44 rounded-2xl`} source={{
              uri: image.banner
            }} />) : (
              <TouchableOpacity onPress={() => {
                launchImageLibrary({ noData: true }, (response) => {
                  if (response.assets) {
                    setImage({ ...image, banner: response.assets[0].uri })
                    upload(response.assets[0], "banner")
                    imageFor === "banner" && setImage({ ...image, banner: uri })
                  }
                  if(response.didCancel){
                    setImage({ ...image, banner: "" })
                  }
                });
              }} className="w-full h-44 bg-gray-600 rounded-2xl" >
                <Text className="text-center font-black text-white text-2xl" >Upload Banner</Text>
              </TouchableOpacity>
            )
          }
          <View className="w-full mt-[-70px] h-32 flex justify-center items-center" >
            {
              image.logo !== "" ? (<View className="rounded-full  border-white border-8" >
                <Image className={`w-32 h-32 rounded-full`} source={{
                uri: image.logo
              }} />
              </View>) : (
                <TouchableOpacity onPress={() => {
                  launchImageLibrary({ noData: true }, (response) => {
                    // console.log(response);
                    if (response.assets) {
                      setImage({ ...image, logo: response.assets[0].uri })
                      upload(response.assets[0], "logo")
                      imageFor === "logo" && setImage({ ...image, logo: uri })
                    }
                    if(response.didCancel){
                    setImage({ ...image, logo: "" })
                  }
                  });
                }} className="w-32 h-32 rounded-full bg-gray-400 border-white border-8 flex justify-center items-center " >
                  <Text className="text-xl text-white font-black" >Logo</Text>
                </TouchableOpacity>
              )
            }
          </View>
          <View className="p-2" >
            <TextInput
              keyboardType="default"
              cursorColor={'#1c1c1c'}
              className=" rounded-xl h-12 text-black font-bold text-md px-2 mb-2 border-2 border-gray-300"
              placeholder="Name of Service Provider/Shop"
              placeholderTextColor={'#727272'}
              onChangeText={(e) => {
                setName(e)
              }}
            />
            <View className="py-1" >
              <WhatsApp disabled={buttonText !== "" ? true : false} text={`${buttonText !== "" ? buttonText : "Add Phone Number"}`} />
            </View>
            {
              address === "" ? <Button func={() => refRBSheet.current.open()} text={"Set Location"} /> :
                <TouchableOpacity onPress={() => refRBSheet.current.open()} >
                  <Text className="m-2 text-md font-black text-gray-700 text-center" >{address}</Text>
                </TouchableOpacity>
            }
            <SelectDropdown
              data={prof}
              className="w-full"
              defaultButtonText="Select a Profession"
              onSelect={(selectedItem, index) => {
                console.log(selectedItem)
                setProfession(selectedItem)
              }}
              buttonTextAfterSelection={useMemo((selectedItem, index) => {
                return selectedItem
              },[])}
              rowTextForSelection={useMemo((item, index) => {
                return item
              },[])}
              dropdownStyle={{
                borderRadius: 5,
                borderBottomColor: main.primary
              }}
              buttonStyle={{
                width: "100%",
                marginTop: 10,
                borderRadius: 12,
                backgroundColor: main.primary,
              }}
              buttonTextStyle={{
                fontWeight: 700,
                color: "#fff",
                fontSize: 22
              }}
            />
            <Text className="text-gray-600 mt-1 ml-2 font-black text-lg" >Add Any Type of Proof</Text>
            <Text className="text-zinc-600 ml-2 font-normal text-xs mt-[-8px]" >Example: Aadhar or Pan Card</Text>
            {
              image.proof !== "" ? (<Image className={`w-full h-44 rounded-2xl`} source={{
                uri: image.proof
              }} />) : (
                <TouchableOpacity onPress={() => {
                  launchImageLibrary({ noData: true }, (response) => {
                    if (response.assets) {
                      setImage({ ...image, proof: response.assets[0].uri })
                      upload(response.assets[0], "proof")
                      imageFor === "proof" && setImage({ ...image, proof: uri })
                    }
                    if(response.didCancel){
                    setImage({ ...image, proof: "" })
                  }
                  });
                }} className="w-full h-44 bg-slate-400 rounded-2xl" >
                </TouchableOpacity>
              )
            }
            <Button func={() => {
              if ((waId !== "" && image.banner !== "" && image.logo !== "" && image.proof !== "" && address !== "" && name !== "" && profession !== "")) {
                verifyServiceProvider(waId,
                  {
                    address,
                    name,
                    profession,
                    logo: image.logo,
                    banner: image.banner,
                    proof: image.proof
                  })
              } else {
                alert("Please Fill All The Details")
              }
            }} text="Continue" />
          </View>
        </View>
      </ScrollView>
      <RBSheet
        height={600}
        dragFromTopOnly={true}
        animationType={'slide'}
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent"
          },
          draggableIcon: {
            backgroundColor: "#fff",
            width: 70
          },
          container: {
            backgroundColor: "#202020",
            paddingLeft: 10,
            paddingRight: 10,
            borderRadius: 20
          }
        }}
      >
        <GooglePlacesInput setAddress={setAddress} setCords={setCords} onChange={handleRegionChange} />
        <Button func={async ()=>{
          const address = await getCurrentLocation()
          setAddress(address)
          refRBSheet.current.close()
        }} text="Add Your Current Location" />
        <MapView
          ref={mapRef}
          loadingBackgroundColor='#000'
          loadingEnabled={true}
          loadingIndicatorColor={main.primary}
          style={{
            flex: 1,
            marginTop:5,
            borderRadius:10
          }}
          className={" rounded-xl bg-black"}
          initialRegion={cords}
        >
          <Marker
            coordinate={cords}
          />
        </MapView>
      </RBSheet>
    </>

  )
}

export default _Profile