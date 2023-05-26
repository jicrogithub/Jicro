import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { main } from "../../../../utils/colors"
// import Button from './../../../components/Button';
import RBSheet from "react-native-raw-bottom-sheet";
import { getDistance } from '../../../../helper/Location';
import { getCurrentPostiton } from './../../../../helper/Location';
import Button from '../../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { usePost } from '../../../../suppliers/BackendInteractions/Post';
const Card = ({ showcase, title, price, location, orderID, _id, status, user }) => {
    const navigation = useNavigation()
    const {updateStatus} = usePost()
    const refRBSheet = useRef();
    const [distance, setDistance] = useState(0);
    useEffect(() => {
        (async () => {
            const { distance } = await getDistance(location.coordinates[0], location.coordinates[1])
            setDistance(distance)
        })()
    }, [])
    return (
        <View className="mx-1 my-2" >
            <View style={main.shadows} className="bg-white rounded-xl mx-1 w-50 max-h-48  flex flex-row justify-between" >
                <View className="w-[80%]  h-full rounded-l-xl flex flex-col px-3 py-2 gap-2" >
                    <Text className="font-bold text-[16px] mb-[-20px] text-gray-600 " >{title.length > 28 ? `${title.slice(0,28)}...`:title}</Text>
                    <View className="flex flex-row gap-4 justify-center items-center" >
                        <View className="rounded-full w-8 h-8  bg-zinc-700 text-white font-black flex justify-center items-center" >
                            <Text className=" text-white font-black" >AT</Text>
                        </View>
                        <Text className="text-zinc-500" >{location.address_formated}</Text>
                    </View>
                    {
                        showcase === undefined  ? <View className="h-26 flex flex-row justify-evenly mt-2 items-center" >
                            <View className="w-28 h-10 bg-gray-200 rounded-xl flex flex-row justify-center items-center" >
                                <View className="rounded-full w-7 h-7  bg-emerald-600 flex justify-center items-center mr-2" >
                                    <Text className=" text-white font-black text-lg " >₹</Text>
                                </View>
                                <Text className="text-zinc-800 font-black text-lg" >{price.actual}</Text>
                            </View>
                            <View className="max-w-44 px-1 h-10 bg-gray-200 rounded-xl flex flex-row justify-center items-center" >
                                <View className="rounded-full w-7 h-7  bg-neutral-100 flex justify-center items-center mr-2" >
                                    <Image className="w-10 h-10" source={require("../assets/location.png")} />
                                </View>
                                <Text className="text-zinc-800 font-bold text-md" >{distance} KM</Text>
                            </View>
                        </View> : <View className="flex flex-row justify-evenly items-center" >
                            <View className="flex flex-col justify-between items-center">
                                <Text className="text-gray-600 font-black text-md" >Ratings</Text>
                                <View className="flex flex-row gap-1 items-center" >
                                    <Image className="h-7 w-7" source={require("../assets/ratings.gif")} />
                                    <Text className="font-black text-gray-500 text-lg" >3.8</Text>
                                </View>
                            </View>
                            <View className="flex flex-col justify-between items-center">
                                <Text className="text-gray-600 font-black text-md" >Earned</Text>
                                <View className="flex flex-row gap-1 items-center" >
                                    {/* <Image className="h-7 w-7" source={require("../assets/ratings.gif")} /> */}
                                    <Text className="font-black text-gray-500 text-lg" >₹ 400</Text>
                                </View>
                            </View>
                        </View>
                    }
                </View>
                <View style={{
                    backgroundColor:status === 'On-Going'?"#2d2d2dec":main.primary
                }} className={`w-[20%] h-full rounded-r-xl `} >
                    <TouchableOpacity onPress={() => {
                        refRBSheet.current.open()
                    }} className="w-full  h-full flex justify-center items-center" >
                        <Text className="w-32 text-white text-center font-black -rotate-90 text-[23px]" >{status === 'Completed' && "Completed"}{status === 'Pending' && "Accept"}{status === 'On-Going' && "View"}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <RBSheet
                height={200}
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
                    }
                }}
            >
                <View className="w-full h-[180px] px-2 flex justify-evenly items-center" >
                <Text className="font-black text-gray-800 text-center " >By clicking the Button You will be Presented with the Map and with Customer House Location. You have to Go to The House Location with the help of Map</Text>
                <Text className="font-black text-gray-500 text-center " >Please Drive Safely :) </Text>
                    <Button func={()=>{
                        updateStatus(_id, 'On-Going')
                        navigation.replace('MapSP',{
                            latitude:location.coordinates[1],
                            longitude:location.coordinates[0],
                            orderID,
                            address:location.address_formated,
                            name:user.name,
                            phone_number:user.phone_number
                        })
                    }} text="Continue" />
                </View>
            </RBSheet>
        </View>
    )
}

export default Card