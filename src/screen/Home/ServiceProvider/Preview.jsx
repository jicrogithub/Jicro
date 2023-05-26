import { View, Text, ScrollView, Image } from 'react-native'
import React, { useRef, useEffect, useState, useCallback } from 'react'
import Carousel from './components/Carousel';
import UniversalHeader from './../../components/Universalheader';
import { main } from '../../../utils/colors';
import Separator from './../../Auth/components/Seperator';
import { requestLocationPermission } from '../../../helper/Location';
import { getCurrentPostiton, getCurrentLocation } from './../../../helper/Location';
import Button from './../../components/Button';
import { getData } from './../../../helper/LocalStorage';
import { useData } from '../../../suppliers/StateManagement/DataTransfer';
import { usePost } from '../../../suppliers/BackendInteractions/Post';

const Preview = ({ navigation }) => {
    const { addService, shouldRedirect } = usePost()
    const { data, setRedirect } = useData()
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setRedirect(false)
    }, [])
    useEffect(() => {
        console.log("Hello")
        setLoading(false)
        shouldRedirect && navigation.navigate('ServiceProviderNavigation', { screen: 'Services' });
    }, [shouldRedirect])
    return (
        <View className="w-full bg-white h-full">
            <UniversalHeader />
            <ScrollView className="bg-white p-2 h-full mt-2" >
                <Carousel images={data.images} />
                <View className="w-full h-14 p-1 bg-gray-100 my-2 rounded-xl flex flex-row justify-around" >
                    <View className="w-28 h-full bg-gray-200 rounded-xl flex justify-center items-center" >
                    </View>
                    <View className={`w-28 h-full bg-[${main.primary}] flex justify-center items-center rounded-xl`} >
                        <Text className="text-white font-black text-xl" >{`₹ ${data.price}`}</Text>
                    </View>
                    <View className="w-28 h-full bg-gray-200 flex justify-center items-center rounded-xl" >
                    </View>
                </View>
                <View>
                    <Text className="text-gray-600 font-black text-xl text-center " >{data.title}</Text>
                </View>
                <Separator text={"*"} />
                <View className=" w-full min-h-96 mt-[-15px] rounded-xl" >
                    <View className="flex flex-row items-center" >
                        <Image className="w-14 h-14" source={require("./assets/plus.gif")} />
                        <Text className="font-black text-gray-700 text-xl" >Included in Service</Text>
                    </View>
                    <View className="pl-14" >
                        {
                            data.includedLists.map((e, i) => {
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
                            data?.notIncludedLists.map((e, i) => {
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
                        data?.note.length !== 0 && <View className="w-full max-h-40 bg-gray-200 rounded-xl p-3" >
                            <Text className="text-gray-700 font-black text-sm" >Note: {data?.note}</Text>
                        </View>
                    }
                </View>
            </ScrollView>
            <View className="self-stretch m-2" >
                <Button isloading={loading} func={() => {
                    setLoading(true);
                    addService({
                        title: data.title,
                        price: data.price,
                        images: data.images,
                        included: data.includedLists,
                        notIncluded: data.notIncludedLists,
                        note: data.note,
                        provider: "",
                        category:data.category,
                        sub_category:data.sub_category
                    })
                }} text="Publish Service" />
            </View>
        </View>
    )
}

export default Preview