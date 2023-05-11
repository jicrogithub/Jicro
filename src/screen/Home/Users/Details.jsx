import { View, Text, ScrollView, Animated, Image, TextInput } from 'react-native'
import React from 'react'
import UniversalHeader from '../../components/Universalheader'
import { main } from "../../../utils/colors"
import { useRoute } from '@react-navigation/native'
import Carousel from '../ServiceProvider/components/Carousel'
import Separator from '../../Auth/components/Seperator'
import { useEffect, useState, useRef } from 'react';
import { useFetch } from '../../../suppliers/BackendInteractions/Fetch'
import Button from './../../components/Button';
import { useLoading } from '../../../suppliers/StateManagement/Loading'
import { Loading } from './components/Loading';
import RBSheet from 'react-native-raw-bottom-sheet';
import { getCurrentLocation } from './../../../helper/Location';
import { getData } from '../../../helper/LocalStorage'
import { usePost } from '../../../suppliers/BackendInteractions/Post'

const Details = ({ navigation }) => {
    const route = useRoute()
    const { getService, serviceData } = useFetch()
    
    const { setLoading } = useLoading()
    const [loading, setLoadingg,] = useState(false)
    const [address, setAddress] = useState("")
    const { orderService, shouldRedirect } = usePost()
    useEffect(()=>{
        shouldRedirect && navigation.replace('Buy')
    },[shouldRedirect])
    
    useEffect(() => {
        const reteriveAddress = async () => {
            const address_formated = await getCurrentLocation()
            setAddress(address_formated)
        }
        reteriveAddress()
    }, [])
    useEffect(() => {
        const _id = route.params.service_id;
        
        getService(_id)
    }, [])
    
    const refRBSheet = useRef()
    return (
        <View className="h-screen w-full flex justify-center items-center" >
            {
                Object.keys(serviceData).length === 0 ? <Loading text="Jicro" delay={100} /> : <View className="bg-white">
                    <UniversalHeader />
                    <ScrollView className="px-2" >
                        <Carousel images={serviceData.images} />
                        <View className="w-full h-14 p-1 bg-gray-100 my-2 rounded-xl flex flex-row justify-around" >
                            <View className="w-28 h-full bg-gray-200 rounded-xl flex justify-center items-center" >
                            </View>
                            <View className={`w-28 h-full bg-[${main.primary}] flex justify-center items-center rounded-xl`} >
                                <Text className="text-white font-black text-xl" >{`₹ ${serviceData?.price.actual}`}</Text>
                            </View>
                            <View className="w-28 h-full bg-gray-200 flex justify-center items-center rounded-xl" >
                            </View>
                        </View>
                        <View>
                            <Text className="text-gray-600 font-black text-xl text-center " >{serviceData.title}</Text>
                        </View>
                        <Separator text={"*"} />
                        <View className=" w-full min-h-96 mt-[-15px] rounded-xl" >
                            <View className="flex flex-row items-center" >
                                <Image className="w-14 h-14" source={require("./assets/plus.gif")} />
                                <Text className="font-black text-gray-700 text-xl" >Included in Service</Text>
                            </View>
                            <View className="pl-14" >
                                {
                                    serviceData.included.map((e, i) => {
                                        return <View key={i} className="flex flex-row items-center gap-2 mb-1 " >
                                            <View className="bg-gray-800 rounded-full w-8 h-8 flex justify-center items-center " >
                                                <Text className="text-white font-black text-xl" >✓</Text>
                                            </View>
                                            <Text className="font-black text-gray-500 text-sm" >{e}</Text>
                                        </View>
                                    })
                                }
                            </View>
                            <View className="flex flex-row items-center" >
                                <Image className="w-14 h-14" source={require("./assets/minus.gif")} />
                                <Text className="font-black text-gray-700 text-xl" >Not Included in Service</Text>
                            </View>
                            <View className="pl-14" >
                                {
                                    serviceData?.notIncluded.map((e, i) => {
                                        return <View key={i} className="flex flex-row items-center gap-2 mb-1 " >
                                            <View className="bg-red-600 rounded-full w-8 h-8 flex justify-center items-center " >
                                                <Text className="text-white font-black text-xl" >✕</Text>
                                            </View>
                                            <Text className="font-black text-gray-500 text-sm" >{e}</Text>
                                        </View>
                                    })
                                }
                            </View>
                            {
                                serviceData?.note.length !== 0 && <View className="w-full max-h-40 bg-gray-200 rounded-xl p-3" >
                                    <Text className="text-gray-700 font-black text-sm" >Note: {serviceData?.note}</Text>
                                </View>
                            }
                        </View>
                    </ScrollView>
                    <View className="self-stretch m-2" >
                        <Button func={() => {
                            // setLoadingg(true)
                            refRBSheet.current.open()
                        }} text="Buy Service" />
                    </View>
                </View>
            }
            <RBSheet
                height={300}
                dragFromTopOnly={true}
                animationType={'slide'}
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={true}
                customStyles={{
                    wrapper: {
                        backgroundColor: 'transparent',
                    },
                    draggableIcon: {
                        backgroundColor: main.primary,
                        width: 70
                    },
                    container: {
                        backgroundColor: "#fff",
                        paddingLeft: 10,
                        paddingRight: 10,
                        borderRadius: 30,
                        elevation: 30,
                        // opacity:0.9
                        shadowOpacity: 1,
                        shadowRadius: 40
                    }
                }}
            >
                <View className="flex justify-between items-center h-[270px]" >
                    <View className="flex flex-row justify-evenly items-center w-full  " >
                        <Text className={`font-black text-xl text-white bg-[${main.primary}] p-2 rounded-xl`} >Address</Text>
                        <Text className="font-black text-[11px] text-gray-800 text-center w-52" >{address}</Text>
                    </View>
                    <Text className="text-gray-600 underline font-black text-center" >Change Address</Text>
                    <View className="w-full h-32 bg-gray-200 rounded-b-xl" >
                        <TextInput style={{
                            // height: 150,
                            justifyContent: "flex-start",
                            textAlignVertical: "top"
                        }
                        } onChangeText={(e) => {
                            // setNote(e)
                        }} multiline={true} numberOfLines={4} underlineColorAndroid="transparent" cursorColor={main.primary} className="p-2 text-black text-md font-bold" placeholder='Add some Important Informations or Note' placeholderTextColor={"#3d3d3d"} />
                    </View>
                    <Button func={() => {
                        orderService(serviceData._id,serviceData.provider._id)
                    }} text={'Confirm purchase'} />
                </View>
            </RBSheet>
        </View>
    )
}

export default Details