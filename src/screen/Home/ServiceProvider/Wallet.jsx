import { View, Text, Image, ScrollView } from 'react-native'
import React from 'react'
import UniversalHeader from '../../components/Universalheader'
import Button from '../../components/Button'
import { main } from './../../../utils/colors';
import Transaction from './components/Transaction';

const Wallet = () => {
    return (
        <View className="h-full bg-white" >
            <UniversalHeader />
            <View className="" >
                <View style={main.shadows} className="h-44 w-full bg-gray-100 px-2" >
                    <View className="w-full flex flex-row justify-center items-center gap-1 mt-4" >
                        <Text className="text-gray-900 text-3xl font-bold" >₹</Text>
                        <Text className="text-gray-700 text-6xl font-black" >800</Text>
                    </View>
                    <Text className="text-gray-900 text-xl font-bold text-center" >Cooming Soon</Text>
                    <Button text={"Withdraw"} />
                </View>
                <ScrollView className="p-2 h-full" >
                <Text className="text-gray-600 font-black text-xl" >Transaction's History</Text>
                <View className="mb-72 h-full" >
                <Transaction/>
                <Transaction/>
                <Transaction/>
                <Transaction/>
                <Transaction/>
                <Transaction/>
                <Transaction/>
                <Transaction/>
                <Transaction/>
                <Transaction/>
                <Transaction/>
                <Transaction/>
                <Transaction/>
                <Transaction/>
                <Transaction/>
                <Transaction/>
                <Transaction/>
                <Transaction/>
                <Transaction/>
                <Transaction/>
                <Transaction/>
                <Transaction/>
                <Transaction/>
                <Transaction/>
                <Transaction/>
                <Transaction/>
                <Transaction/>
                <Transaction/>
                <Transaction/>
                <Transaction/>
                <Transaction/>
                </View>
                </ScrollView>
            </View>
        </View>
    )
}

export default Wallet