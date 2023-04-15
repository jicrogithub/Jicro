import { View, Text, TouchableOpacity,Image } from 'react-native'
import React, { useRef } from 'react'
import { main } from "../../../../utils/colors"
import Button from './../../../components/Button';
import locationGIF from "C:\Users\siddh\Desktop\Business\Jicro\src\screen\Home\Service Provider\assets\location.gif"
import RBSheet from "react-native-raw-bottom-sheet";
const Card = () => {
    // console.log(locationGIF)
    const refRBSheet = useRef();
    return (
        <View className="my-2" >
            <View style={main.shadows} className="bg-white rounded-xl mx-1 w-50 h-44 flex flex-row justify-between" >
                <View className="w-[80%]  h-full rounded-l-xl flex flex-col px-3 py-2 gap-2" >
                    <Text className="font-bold text-[16px] mb-[-20px] text-gray-600 text-center" >Tap Fitting with Free Washer...</Text>
                    <View className="flex flex-row gap-4 justify-center items-center" >
                        <View className="rounded-full w-8 h-8  bg-zinc-700 text-white font-black flex justify-center items-center" >
                            <Text className=" text-white font-black" >AT</Text>
                        </View>
                        <Text className="text-zinc-500" >Ramkrishna Nagar, Aadarsh Colony Patna, 800027</Text>
                    </View>
                    <View className="h-26 flex flex-row justify-evenly mt-2 items-center" >
                        <View className="w-28 h-10 bg-gray-200 rounded-xl flex flex-row justify-center items-center" >
                            <View className="rounded-full w-7 h-7  bg-emerald-600 flex justify-center items-center mr-2" >
                                <Text className=" text-white font-black text-lg " >₹</Text>
                            </View>
                            <Text className="text-zinc-800 font-black text-lg" >230</Text>
                        </View>
                        <View className="w-28 h-10 bg-gray-200 rounded-xl flex flex-row justify-center items-center" >
                            <View className="rounded-full w-7 h-7  bg-neutral-800 flex justify-center items-center mr-2" >
                                <Image className=""  source={locationGIF} />
                            </View>
                            <Text className="text-zinc-800 font-black text-lg" >1KM</Text>
                        </View>
                    </View>
                    {/* <Button text="View Details"/> */}
                    <TouchableOpacity onPress={() => { refRBSheet.current.open() }}>
                        <Text className={`text-[${main.primary}] text-lg font-semibold text-center`} >View Details</Text>
                    </TouchableOpacity>
                </View>
                <View className={`w-[20%] bg-[${main.primary}] h-full rounded-r-xl flex justify-center items-center `} >
                    <Text className="text-white font-black -rotate-90 text-xl" >Accept</Text>
                </View>
            </View>
            <RBSheet
                height={400}
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={true}
                customStyles={{
                    wrapper: {
                        backgroundColor: "transparent"
                    },
                    draggableIcon: {
                        backgroundColor: main.primary
                    }
                }}
            >
                <Text className="text-black" >Yeh abhi bna nhi h lode</Text>
                {/* <YourOwnComponent /> */}
            </RBSheet>
        </View>
    )
}

export default Card