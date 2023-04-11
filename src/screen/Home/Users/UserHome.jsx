import { ScrollView, Text, RefreshControl, StyleSheet, View, Image } from 'react-native'
import React, { useState } from 'react'
import moment from 'moment';
import Header from './components/Header';
import Crousel from './components/Crousel';
import Tabs from './components/Tabs';
import Trending from './components/Trending';
import Suggested from './components/Suggested';
import { main } from "../../../utils/colors"
const UserHome = ({ navigation }) => {

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    return (
        <>
            <View className="bg-white" >
                <Header />
            </View>
            <ScrollView
                contentContainerStyle={styles.scrollView}
                className="bg-white px-1 py-2"
                refreshControl={
                    <RefreshControl colors={[main.primary]} refreshing={refreshing} onRefresh={onRefresh} />
                }>
                <Crousel />
                <Text className="ml-2 text-gray-700 font-black text-xl" >Trending</Text>
                <Trending navigation={navigation} />
                <Text className="ml-2 text-gray-700 font-black text-xl" >Suggested</Text>
                <Tabs />
                <Suggested navigation={navigation} />
            </ScrollView>
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },  
});

export default UserHome