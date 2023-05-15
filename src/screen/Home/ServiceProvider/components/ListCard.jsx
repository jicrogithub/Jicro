import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, TouchableWithoutFeedback } from 'react-native'
import React, { useState, useRef, useEffect, useCallback } from 'react'
import { main } from "../../../../utils/colors"
import Button from '../../../components/Button'
import { useNavigation } from '@react-navigation/native';
import RBSheet from 'react-native-raw-bottom-sheet';
import Carousel from './Carousel';
import { messagePopup } from './../../../../helper/Message';
const ListCard = ({ images, title, price, service_id }) => {
    const navigation = useNavigation()
    const refRBSheet = useRef()
    const [included, setIncluded] = useState(1)
    const [includedLists, setIncludedLists] = useState([])
    const [notIncluded, setNotIncluded] = useState(1)
    const [notIncludedLists, setNotIncludedLists] = useState([])
    const includedTextInputRef = useRef([]);
    const notIncludedTextInputRef = useRef([]);
    const [count, setCount] = useState(0)

    const handleTextInputBlur = useCallback((index, text, type) => {
        if (type === "included") {
            setIncludedLists(includedLists => {
                const newList = [...includedLists];
                newList[index] = text;
                return newList;
            });
        } else {
            setNotIncludedLists(notIncludedLists => {
                const newList = [...notIncludedLists];
                newList[index] = text;
                return newList;
            });
        }
    }, []);

    const handleAddButtonPress = useCallback((type) => {
        if (type === "included") {
            setIncluded(included => {
                const newIncluded = included + 1;
                includedTextInputRef.current[newIncluded] = React.createRef();
                return newIncluded;
            });
        } else {
            setNotIncluded(notIncluded => {
                const newNotIncluded = notIncluded + 1;
                notIncludedTextInputRef.current[newNotIncluded] = React.createRef();
                return newNotIncluded;
            });
        }
    }, []);

    const handleRemoveButtonPress = useCallback((index, type) => {
        if (type === "included") {
            setIncludedLists(includedLists => {
                const newList = [...includedLists];
                newList.splice(index, 1);
                return newList;
            });
            setIncluded(included => included - 1);
        } else {
            setNotIncludedLists(notIncludedLists => {
                const newList = [...notIncludedLists];
                newList.splice(index, 1);
                // return newList;
            });
            setNotIncluded(notIncluded => notIncluded - 1);
        }
    }, []);
    return (
        <>
            <View style={main.shadows} className="bg-white rounded-xl w-50 h-72 p-1 mb-2 flex flex-col justify-around m-1" >
                <Image
                    source={{
                        uri: images[0]
                    }}
                    className="w-50 h-40 rounded-xl"
                />
                <Text className="text-gray-700 text-[16px] font-black text-center my-1" >{title}</Text>
                <View className="h-26 flex flex-row justify-between items-center px-2" >
                    <View className="flex flex-row justify-between items-center" >
                        <View className="w-10 h-10 bg-gray-700 rounded-full mr-1" ></View>
                        <View className="w-44 h-10 bg-slate-300 rounded-l-xl " ></View>
                    </View>
                    <View className="w-12 h-10 bg-slate-200 rounded-md" ></View>
                    <View className={`w-16 h-10 bg-[${main.primary}]  rounded-r-xl flex justify-around items-center`} >
                        <Text className="font-black text-lg text-white" >₹ {price}</Text>
                    </View>
                </View>
                <Button func={() => {
                    messagePopup("This Feature is Under Development","We Will be Updating it soon",'danger')
                    // refRBSheet.current.open()
                }} text="Edit Service" />
                {/* <RBSheet
                    height={500}
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
                    <ScrollView className="w-full px-2 " >
                        <TouchableWithoutFeedback onPress={()=>{
                            messagePopup("This Feature is Under Development","We Will be Updating it soon",'danger')
                        }} >
                            <Carousel images={images} />
                        </TouchableWithoutFeedback>
                        <View>
                            <Text className="font-black text-gray-800 text-lg" >Title</Text>
                            <TextInput
                                keyboardType="default"
                                onChangeText={(e) => {
                                   
                                }}
                                cursorColor={'#1c1c1c'}
                                className="bg-gray-100 rounded-xl p-2 
                          text-zinc-700 font-bold text-md mb-2"
                                placeholder={title}
                                placeholderTextColor={'#15151a'}
                            />
                        </View>
                        <View className="w-full" >
                            <Text className="font-black text-gray-800 text-xl" >Price</Text>
                            <TextInput
                                keyboardType="default"
                                onChangeText={(e) => {
                                    // setPrice(e)
                                }}
                                cursorColor={'#1c1c1c'}
                                className="bg-gray-100 rounded-xl p-2 
                          text-zinc-700 font-bold text-md mb-2"
                                placeholder={price}
                                placeholderTextColor={'#15151a'}
                            />
                        </View> */}
                        {/* <View style={main.shadows} className="h-min-96 w-full p-1 bg-white rounded-xl" >
                            <View>
                                <View className="flex flex-row items-center" >
                                    <Image className="w-14 h-14" source={require("../assets/plus.gif")} />
                                    <Text className="font-black text-gray-700 text-xl" >Included in Service</Text>
                                </View>
                                {Array.from({ length: included }).map((e, i) => (
                                    <View key={i} className="flex flex-row items-center justify-center gap-2">
                                        <TextInput
                                            keyboardType="default"
                                            cursorColor={'#1c1c1c'}
                                            onChangeText={(text) => {
                                                handleTextInputBlur(i, text, "included");
                                            }}
                                            onBlur={() => {
                                                includedTextInputRef.current[i].blur()
                                            }}
                                            className="w-[80%] bg-gray-200 rounded-xl p-2 text-zinc-700 font-bold text-md mb-2"
                                            placeholder="Write Something that is Included"
                                            placeholderTextColor={'#464647'}
                                            ref={(ref) => {
                                                includedTextInputRef.current[i] = ref;
                                            }}
                                        />
                                        {i === 0 && (
                                            <TouchableOpacity
                                                onPress={() => {
                                                    handleAddButtonPress("included");
                                                }}
                                                className={`w-10 h-10 bg-[${main.primary}] rounded-full flex justify-center items-center`}
                                            >
                                                <Text className="text-3xl font-black text-white">+</Text>
                                            </TouchableOpacity>
                                        )}
                                        {i > 0 && (
                                            <TouchableOpacity
                                                onPress={() => {
                                                    handleRemoveButtonPress(i, "included");
                                                }}
                                                className={`w-10 h-10 bg-red-500 rounded-full flex justify-center items-center`}
                                            >
                                                <Text className="text-3xl font-black text-white">-</Text>
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                ))}
                            </View>
                            <View className="flex flex-row items-center" >
                                <Image className="w-14 h-14" source={require("../assets/minus.gif")} />
                                <Text className="font-black text-gray-700 text-xl" >Not Included in Service</Text>
                            </View>
                            {
                                Array.from({ length: notIncluded }).map((e, i) => {
                                    return (
                                        <View key={i} className="flex flex-row items-center justify-center gap-2">
                                            <TextInput
                                                keyboardType="default"
                                                onChangeText={(text) => {
                                                    handleTextInputBlur(i, text, "notIncluded");
                                                }}
                                                onBlur={() => {
                                                    notIncludedTextInputRef.current[i].blur()
                                                }}
                                                cursorColor={'#1c1c1c'}
                                                className="w-[80%] bg-gray-200 rounded-xl p-2 text-zinc-700 font-bold text-md mb-2"
                                                placeholder="Write Something that is Not Included"
                                                placeholderTextColor={'#464647'}
                                                ref={(ref) => {
                                                    notIncludedTextInputRef.current[i] = ref;
                                                }}
                                            />
                                            {
                                                i === 0 && <TouchableOpacity
                                                    onPress={() => {
                                                        handleAddButtonPress("notIncluded");
                                                    }}
                                                    className={`w-10 h-10 bg-[${main.primary}] rounded-full flex justify-center items-center`}
                                                >
                                                    <Text className="text-3xl font-black text-white">+</Text>
                                                </TouchableOpacity>
                                            }
                                            {i > 0 && (
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        handleRemoveButtonPress(i, "notIncluded");
                                                    }}
                                                    className={`w-10 h-10 bg-red-500 rounded-full flex justify-center items-center`}
                                                >
                                                    <Text className="text-3xl font-black text-white">-</Text>
                                                </TouchableOpacity>
                                            )}
                                        </View>
                                    );
                                })

                            }
                        </View> */}
                    {/* </ScrollView>
                </RBSheet> */}
            </View>
        </>
    )
}

export default ListCard