import { Text, StyleSheet, View, RefreshControl, FlatList } from 'react-native';
import React, { useState, useCallback, useEffect } from 'react';
import moment from 'moment';
import Header from './components/Header';
import Crousel from './components/Crousel';
import Tabs from './components/Tabs';
import Trending from './components/Trending';
import Suggested from './components/Suggested';
import { main } from '../../../utils/colors';
import { useFetch } from '../../../suppliers/BackendInteractions/Fetch';
import { Loading } from './components/Loading';
import { messagePopup } from '../../../helper/Message'

const UserHome = ({ navigation }) => {
    const { data, getServices } = useFetch()
    const [refreshing, setRefreshing] = useState(false);
    useEffect(() => {
        getServices()
    }, [])
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    const components = [
        { type: 'Crousel' },
        { type: 'Trending' },
        { type: 'Suggested' },
    ];

    const renderItem = ({ item }) => {
        switch (item.type) {
            case 'Crousel':
                return <Crousel />;
            case 'Trending':
                return (
                    <>
                        <Text style={styles.sectionTitle}>Trending</Text>
                        <Trending navigation={navigation} />
                    </>
                );
            case 'Suggested':
                return (
                    <>
                        <Text style={styles.sectionTitle}>Suggested</Text>
                        <View className="items-end mr-2" >
                            <Tabs />
                        </View>
                        <Suggested />
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <View style={styles.container}>
                <Header />
                <FlatList
                    data={components}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    refreshControl={
                        <RefreshControl
                            colors={[main.primary]}
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    sectionTitle: {
        marginLeft: 10,
        color: 'gray',
        fontWeight: 'bold',
        fontSize: 20,
    },
});

export default UserHome;
