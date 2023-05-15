import { View, Text, TextInput, Image, FlatList, RefreshControl, TouchableOpacity } from 'react-native'
import React, { useCallback, useRef, useState, useEffect } from 'react';
import UniversalHeader from '../../components/Universalheader'
import Button from '../../components/Button'
import Seperator from './components/Seperator';
import Card from './components/Card';
import { useFetch } from '../../../suppliers/BackendInteractions/Fetch';
import { main } from '../../../utils/colors';
import RBSheet from 'react-native-raw-bottom-sheet';
import { launchImageLibrary } from 'react-native-image-picker';
import { useUpload } from '../../../suppliers/BackendInteractions/Utils';
import { usePost } from '../../../suppliers/BackendInteractions/Post';
import { messagePopup } from './../../../helper/Message';

const Profile = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { getSP, data } = useFetch();
  const [bannerImg, setBanner] = useState("")
  const [logoImg, setLogo] = useState("")
  const [updateName, setUpdateName] = useState("")
  const [updates, setUpdates] = useState({})
  const refRBSheet = useRef()
  const { uri, imageFor, upload } = useUpload()
  const { updateProfile, shouldRefreshProfileScreen } = usePost()
console.log(data)
  useEffect(() => {
    if (imageFor === "banner") {
      setUpdates({ ...updates, [imageFor]: uri })
    } else if (imageFor === "logo") {
      setUpdates({ ...updates, [imageFor]: uri })
    } else if (updateName) {
      setUpdates({ ...updates, ["name"]: updateName })
    }
  }, [imageFor, updateName])
  useEffect(()=>{
    if(shouldRefreshProfileScreen){
      refRBSheet.current.close()
      messagePopup('Profile Updated SuccesFully', `${Object.keys(updates).join(', ')} has been Succesfully updated`)
      getSP();
      setUpdates({})
    }
  },[shouldRefreshProfileScreen])
  // const onRefresh = useCallback(() => {
  //   setRefreshing(true);
  //   setTimeout(() => {
  //     setRefreshing(false);
  //     getSP();
  //   }, 2000);
  // }, [getSP]);

  const { logo, banner, name, ratings, services } = data
  const renderItem = useCallback(({ item }) => <Card showcase={true} />, []);
  return (
    <View className="bg-white h-full">
      <UniversalHeader />
      <View className="p-2" >
        {
          banner ? <Image source={{ uri: banner }} className="w-full h-44 rounded-3xl" /> : <View>
            <Text>Hello</Text>
          </View>
        }
        {
          logo ? <View className="w-full flex justify-center items-center mt-[-70px]" >
            <Image style={{
              borderWidth: 8,
              borderColor: "#fff"
            }} className="w-32 h-32 rounded-full flex justify-center items-center" source={{ uri: logo }} />
          </View> : <View>
            <Text>Hello</Text>
          </View>
        }
        <View className="w-full mb-2">
          <View className="flex flex-row justify-center items-center" >
            <Image className="h-10 w-10" source={require("./assets/shop.png")} />
            <Text className="text-gray-700 text-2xl font-black text-center capitalize" >{name}</Text>
          </View>
        </View>
        <View className="flex flex-row justify-around items-center mb-2" >
          <View className="flex flex-col justify-between items-center">
            <Text className="text-gray-600 font-black text-md" >Ratings</Text>
            <View className="flex flex-row gap-1 items-center" >
              <Image className="h-7 w-7" source={require("./assets/ratings.gif")} />
              <Text className="font-black text-gray-500 text-lg" >{ratings}</Text>
            </View>
          </View>
          <Seperator />
          <View className="flex flex-col justify-between items-center ">
            <Text className="text-gray-600 font-black text-md" >Service Completed</Text>
            <Text className="font-black text-blue-500 text-3xl" >0</Text>
          </View>
          <Seperator />
          <View className="flex flex-col justify-between items-center">
            <Text className="text-gray-600 font-black text-md" >Growth</Text>
            <View className="flex flex-row gap-1 items-center" >
              <Image className="h-5 w-5" source={require("./assets/growth.gif")} />
              <Text className="font-black text-gray-500 text-lg" >{ratings}%</Text>
            </View>
          </View>
        </View>
        <View>
          <Button text="Edit Profile" func={() => {
            refRBSheet.current.open()
          }} />
        </View>
        <View className="h-64 w-full flex justify-center items-center" >
          <Image className="h-52 w-52" source={require('./assets/nothing.gif')} />
        </View>
        {/* <FlatList
          data={services}
          renderItem={renderItem}
          keyExtractor={item => item.toString()}
          contentContainerStyle={{ paddingBottom: 70 }}
          refreshControl={
            <RefreshControl colors={[main.primary]} refreshing={refreshing} onRefresh={onRefresh} />
          }
        /> */}
      </View>
      <RBSheet
        height={400}
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0,0,0,0.5)",

          },
          draggableIcon: {
            backgroundColor: main.primary
          },
          container: {
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            width: "100%"
          }
        }}
      >
        <View className="p-2" >
          <View className=" w-full  mb-2 rounded-xl flex flex-row px-2 justify-between" >
            <TouchableOpacity className="text-red-400 text-lg font-bold " onPress={() => {
              refRBSheet.current.close()
            }} ><Text className="font-black text-red-500 text-lg" >Cancle</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => {
              if(Object.keys(updates).length !== 0){
              updateProfile(updates)
              }else{
                alert("File is Uploading")
              }
            }} className=" text-lg font-Black" ><Text className="font-black text-blue-500 text-lg" >Done</Text></TouchableOpacity>
          </View>
          {
            banner ? <TouchableOpacity onPress={() => {
              launchImageLibrary({ noData: true }, (response) => {
                if (response.assets) {
                  // setCount(count + 1)
                  setBanner(response.assets[0].uri)
                  upload(response.assets[0], "banner")
                }
                if (response.didCancel) {
                  setBanner(bannerImg)
                }
              });
            }} >
              <View className="absolute right-2 top-2 w-16 h-8 bg-gray-500 rounded-xl z-10 flex justify-center items-center " >
                <Text className="text-white font-bold text-lg " >Edit</Text>
              </View>
              <Image source={{ uri: bannerImg ? bannerImg : banner }} className="w-full h-44 rounded-3xl" />
            </TouchableOpacity> : <View>
              <Text>Hello</Text>
            </View>
          }
          {
            logo ? <TouchableOpacity onPress={() => {
              launchImageLibrary({ noData: true }, (response) => {
                if (response.assets) {
                  // setCount(count + 1)
                  setLogo(response.assets[0].uri)
                  upload(response.assets[0], "logo")
                }
                if (response.didCancel) {
                  setBanner(bannerImg)
                }
              });
            }} >
              <View className="w-full flex justify-center items-center mt-[-70px]" >
                <Image style={{
                  borderWidth: 8,
                  borderColor: "#fff"
                }} className="w-32 h-32 rounded-full flex justify-center items-center" source={{ uri: logoImg ? logoImg : logo }} />
              </View></TouchableOpacity> : <View>
              <Text>Hello</Text>
            </View>
          }
          <View className="w-full mb-2">
            {/* <View className="flex flex-row justify-center items-center" > */}
            {/* <Image className="h-10 w-10" source={require("./assets/shop.png")} /> */}
            <TextInput onChangeText={(e) => {
              setUpdateName(e)
            }} className="text-gray-700 bg-gray-200 text-lg font-bold p-3 capitalize rounded-xl" placeholder={name} placeholderTextColor={"#0d0d0d"} />
          </View>
          {/* </View> */}
        </View>
      </RBSheet>
    </View>
  )
}

export default Profile
