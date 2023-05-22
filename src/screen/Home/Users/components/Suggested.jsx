import { View, Text, FlatList, Image } from 'react-native'
import React, { useMemo, useCallback } from 'react'
import Card from './Card';
import { useFetch } from '../../../../suppliers/BackendInteractions/Fetch';

const Suggested = () => {
    const { data } = useFetch()
    // const data = [{"__v": 0, "_id": "644e162298f9918bc478740d", "buyers": [], "images": ["http://res.cloudinary.com/dvvo0yihr/image/upload/v1682838672/eabd0dkufop0ovgabmma.jpg", "http://res.cloudinary.com/dvvo0yihr/image/upload/v1682838671/bzjthaozgjxtmarl2m00.jpg"], "included": ["Hbb"], "notIncluded": ["Dyzu"], "note": "Uvivi", "orderID": "J-U57", "price": {"actual": 658, "discount": 59, "manupulaterd": 241}, "provider": {"_id": "644e0e8198f9918bc47873f5", "location": [Object], 
    // "logo": "http://res.cloudinary.com/dvvo0yihr/image/upload/v1682837022/enfcxvqngkocngrslpxi.jpg", "name": "Siddhant", "profession": "Personal trainer", "ratings": 0}, "ratings": 0, "title": "Uuuu"}]
    const keyExtractor = useCallback((item) => item._id, [])

    const renderItem = useCallback(({ item }) => {
        const { title, images, provider, ratings, price, _id } = item
        const checkedCondition = ratings === 0 && price.discount !== 0
        return <Card _id={_id} checkedCondition={checkedCondition} key={_id} images={images} title={title} provider={provider} ratings={ratings} price={price} service_id={_id} service_provider_id={provider._id} />
    }, [])

    const isEmpty = useMemo(() => Object.keys(data).length === 0, [data])

    return (
        <>
            {!isEmpty ? (
                <FlatList
                    data={data}
                    keyExtractor={keyExtractor}
                    renderItem={renderItem}
                    showsHorizontalScrollIndicator={false}
                    vertical
                    className='mx-2 mb-4'
                />
            ):<View className="w-full" >
                <Image className="w-44 h-44" source={require("../assets/not-found.gif")} />
                </View>}
        </>
    )
}

export default Suggested
