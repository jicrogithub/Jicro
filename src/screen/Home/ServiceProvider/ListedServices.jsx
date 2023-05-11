import { View, Text, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import Card from './components/Card'
import ListCard from './components/ListCard';
import { useFetch } from '../../../suppliers/BackendInteractions/Fetch';

const ListedServices = () => {
    const { getAllServices, allServicesData } = useFetch()
    useEffect(() => {
        getAllServices()
    }, [])
    // console.log(allServicesData)
    return (
        <View className="h-screen w-full bg-white " >
            <FlatList
                data={allServicesData}
                renderItem={({item}) => {
                    console.log(item)
                    const { images, included, notIncluded, price, title } = item
                    return <ListCard images={images} price={100} title={title} included={included} notIncluded={notIncluded} />
                }}
                keyExtractor={(_, i)=> i}
            />
        </View>
    )
}

export default ListedServices