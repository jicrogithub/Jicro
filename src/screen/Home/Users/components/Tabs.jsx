import { useState, useRef } from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import { Button, SegmentedButtons } from 'react-native-paper';
import { useData } from '../../../../suppliers/StateManagement/DataTransfer';
import { main } from './../../../../utils/colors';
import RBSheet from 'react-native-raw-bottom-sheet';
import RangeSlider from 'rn-range-slider';
import Slider from '@react-native-community/slider';

const Tabs = () => {
    const refRBSheet = useRef()
    const [value, setValue] = useState('')
    // console.log(value === "price")
    const [rangeValues, setRangeValues] = useState([0, 100]);
    const [filters, setFilters] = useState({})
    console.log(filters)
    return (
        <SafeAreaView className="" style={styles.container}>
            <Button mode="contained" buttonColor={main.primary} onPress={() => { refRBSheet.current.open() }}>
                Filter
            </Button>
            <RBSheet
                height={150}
                animationType='fade'
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
                        width: "100%",
                        padding: 10
                    }
                }}
            >
                <View>
                    <SegmentedButtons
                        value={value}
                        onValueChange={setValue}
                        density='medium'
                        buttons={[
                            {
                                value: 'price',
                                label: 'Price',
                            },
                            {
                                value: 'sort',
                                label: 'Sort By',
                            },
                            {
                                value: 'discount',
                                label: 'Discount',

                            },
                        ]}
                    />
                    {
                        !value || value === 'price' && <View className=" h-[70%] w-full p-1 flex justify-center items-center" >
                            <View className="w-full flex flex-row justify-evenly items-center" >
                                <Button mode="outlined" onPress={() => {
                                    alert('This is Under Construction.')
                                    setFilters({ ...filters, ['maxPrice']: 500 })
                                }} textColor='#fff' buttonColor={main.primary} >
                                    Below 500
                                </Button>
                                <Button onPress={() => {
                                    alert('This is Under Construction.')
                                    setFilters({ ...filters, ['minPrice']: 500 })
                                }} mode="outlined" textColor='#fff' buttonColor={main.primary} >
                                    Above 500
                                </Button>
                            </View>
                        </View>
                    }
                </View>
            </RBSheet>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
});

export default Tabs;