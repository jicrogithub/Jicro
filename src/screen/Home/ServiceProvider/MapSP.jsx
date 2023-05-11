import React, { useCallback, useEffect, useRef, useState, memo } from 'react';
import { View, Text, Animated, Dimensions } from 'react-native';
import MapView, { Marker, AnimatedRegion } from 'react-native-maps';
import MapViewDirections, { MapDirectionsResponse } from 'react-native-maps-directions';
import { main } from './../../../utils/colors';
import { getCurrentPostiton, requestLocationPermission } from './../../../helper/Location';
import { key } from '../../../constants/API_KEYS';
import { duration } from 'moment';
import socket from './../../../suppliers/others/SocketIO/io';
import { NavigationRouteContext, useRoute } from '@react-navigation/native';

const MemoizedMarker = memo(({ coords }) => (
    <Marker coordinate={coords} title="I am here..." />
));

const MapSP = () => {
    const { width, height } = Dimensions.get('window');
    const ASPECT_RATIO = width / height;
    const LATITUDE_DELTA = 0.0922;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
    const mapRef = useRef()
    const markerRef = useRef()
    const route = useRoute();
    const [routeAngle, setRouteAngle] = useState(0)
    const [details, setDetails] = useState({
        distance: 0,
        duration: 0
    })
    const [coords, setCoords] = useState({
        coordinates: new AnimatedRegion({
            latitude: 0,
            longitude: 0,
        }),
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    });
    const [initialCoords, setInitialCoords] = useState({
        latitude: 0,
        longitude: 0,
    });
    const [destination, setDestination] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
    });
    // console.log(destination, coords)
    useEffect(() => {
        socket.init()
        socket.emit('join room', route.params.orderID);
        handleRegionChange({
            latitude: route.params.latitude,
            longitude: route.params.longitude,
            latitudeDelta: 0.00002,
            longitudeDelta: 0.0001,
        });
        return () => {
            socket.off('delivery location receive');
        }
    }, [])
    const handleRegionChange = useCallback(
        (newCoords) => {
            setDestination(newCoords);
            // mapRef.current?.animateToRegion(newCoords, 3000);
        },
        [],
    );
    useEffect(() => {
        const setInitCoords = async () => {
            const newCoords = await getCurrentPostiton();
            setInitialCoords({
                latitude: newCoords.latitude,
                longitude: newCoords.longitude
            })
        }
        setInitCoords()
    }, [])
    useEffect(() => {
        const intervalId = setInterval(async () => {
            const newCoords = await getCurrentPostiton();
            setRouteAngle(newCoords.heading)
            const data = { room: route.params.orderID, location: [newCoords.latitude, newCoords.longitude] };
            socket.emit('delivery location update', data);
            animatedMarker(newCoords.latitude, newCoords.longitude)
            setCoords({
                coordinates: {
                    latitude: newCoords.latitude,
                    longitude: newCoords.longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                }
            });
            // mapRef.current?.fitToCoordinates([{
            //     latitude: newCoords.latitude,
            //     longitude: newCoords.longitude
            // }], {
            //     edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
            //     animated: true,
            // });
        }, 1000);
        return () => clearInterval(intervalId);
    }, [coords, mapRef, socket]);
    const handleDirectionsReady = useCallback(
        (directions) => {
            setDetails({
                distance: directions.distance.toFixed(2),
                duration: directions.duration.toFixed(2)
            });
            const coordinates = [{
                latitude: coords.coordinates.latitude,
                longitude: coords.coordinates.longitude
            }];
            mapRef.current?.fitToCoordinates(coordinates, {
                edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                animated: true
            });
            mapRef.current?.animateCamera(
                {
                    center: {
                        latitude: coords.coordinates.latitude,
                        longitude: coords.coordinates.longitude
                    },
                    heading: routeAngle,
                },
                { useNativeDriver: true, }
            );
        },
        [coords, mapRef],
    );


    const animatedMarker = (latitude, longitude) => {
        if (markerRef.current) {
            markerRef.current.animateMarkerToCoordinate({ latitude, longitude }, 1000)
        } else {
            destination.coordinates.timing({ latitude, longitude }).start()
        }
    }
    return (
        <View style={{ flex: 1 }}>
            <MapView.Animated
                ref={mapRef}
                loadingBackgroundColor="#000"
                loadingEnabled={true}
                loadingIndicatorColor={main.primary}
                style={{ flex: 1 }}
                initialRegion={coords.coordinates}
                toolbarEnabled={false}
                mapType={'standard'}
                rotateEnabled={true}
            // camera={{
            //     center: {
            //         latitude: coords.coordinates.latitude,
            //         longitude: coords.coordinates.longitude
            //     },
            //     heading: routeAngle ,
            //     pitch: 0,
            //     zoom: 100
            // }}
            >
                <MapViewDirections
                    origin={initialCoords}
                    destination={destination}
                    apikey={key.google_maps_key}
                    strokeWidth={5}
                    strokeColor={main.primary}
                    precision={'high'}
                    onReady={handleDirectionsReady}
                    mode='DRIVING'
                />
                <MemoizedMarker coords={destination} />
                <Marker.Animated rotation={routeAngle} coordinate={coords.coordinates} ref={markerRef} title="Service Provider" pinColor="blue" />
            </MapView.Animated>
            <View style={{ position: 'absolute', bottom: 0, padding: 10, margin: 20, width: "90%", elevation: 5 }} className="rounded-3xl bg-white flex jusify-center items-center">
                <View className="flex flex-row justify-center items-center" >
                    <Text className="font-black text-xl text-gray-600" >{details.distance} KM</Text>
                    <Text className="font-black text-xl text-gray-600" > will take {details.duration} min</Text>
                </View>
                <View>
                    <Text className="font-black text-xl text-gray-600" > {route.params.address}</Text>
                </View>
            </View>
        </View>
    );
};


export default MapSP;