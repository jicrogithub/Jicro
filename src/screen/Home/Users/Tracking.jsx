import React, { useCallback, useEffect, useRef, useState, memo } from 'react';
import { View, Text, Animated } from 'react-native';
import MapView, { Marker, AnimatedRegion } from 'react-native-maps';
import MapViewDirections, { MapDirectionsResponse } from 'react-native-maps-directions';
import { main } from './../../../utils/colors';
import { getCurrentPostiton, requestLocationPermission } from './../../../helper/Location';
import { key } from '../../../constants/API_KEYS';
import { duration } from 'moment';
import socket from './../../../suppliers/others/SocketIO/io';
import { useRoute } from '@react-navigation/native';

const MemoizedMarker = memo(({ coords }) => (
  <Marker coordinate={coords} title="I am here..." />
));

const Tracking = () => {
  const mapRef = useRef();
  const markerRef = useRef();
  const [rotation, setRotation] = useState(0)
  const route = useRoute();
  const [details, setDetails] = useState({
    distance: 0,
    duration: 0,
  });
  const [coords, setCoords] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [destination, setDestination] = useState({
    coordinates: new AnimatedRegion({
      latitude: 0,
      longitude: 0,
    }),
  });

  useEffect(() => {
    socket.init();
    socket.emit('join room', route.params.orderID);
    const getLiveLocationOfUser = async () => {
      const {latitude, longitude} = await getCurrentPostiton()
      handleRegionChange({
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
    getLiveLocationOfUser()
    return () => {
      socket.off('delivery location receive');
    }
  }, []);

  const handleRegionChange = useCallback(
    (newCoords) => {
      setCoords(newCoords);
    },
    []
  );

  useEffect(() => {
    socket.on('delivery location receive', (data) => {
      // console.log(data)
      mapRef.current?.animateToRegion({
        latitude: data.latitude,
        longitude: data.longitude,
      }, 1000);
      animatedMarker(data[0], data[1]);
      setDestination({
        coordinates: {
          latitude: data[0],
          longitude: data[1],
        }
      });
    })
  }, [socket]);

  const handleDirectionsReady = useCallback(
    (directions) => {
      setDetails({
        distance: directions.distance.toFixed(2),
        duration: directions.duration.toFixed(2),
      });
      const coordinates = [
        {
          latitude: coords.latitude,
          longitude: coords.longitude
        },
        {
          latitude: destination.coordinates.latitude,
          longitude: destination.coordinates.longitude
        }
      ];

      mapRef.current?.fitToCoordinates(coordinates, {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true
      });

    },
    [coords, destination, mapRef],
  );

  const animatedMarker = (latitude, longitude) => {
    try {
      if (markerRef.current) {
        markerRef.current.animateMarkerToCoordinate({ latitude, longitude }, 1000);
      } else {
        console.error('Marker ref is not defined or initialized.');
      }
      if (destination && destination.coordinates) {
        destination.coordinates.timing({ latitude, longitude }).start();
      } else {
        console.error('Destination coordinates are not defined or initialized.');
      }
    } catch (error) {
      console.error('Error occurred while animating marker:', error);
    }
  };
  console.log(markerRef)
  
  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        loadingBackgroundColor="rgba(0,0,0,0.5)"
        loadingEnabled={true}
        loadingIndicatorColor={main.primary}
        style={{
          flex: 1,
        }}
        initialRegion={coords}
        toolbarEnabled={true}
        mapType={'standard'}
        rotateEnabled={true}
      >
        <MapViewDirections
          origin={{
            latitude: coords.latitude,
            longitude: coords.longitude,
          }}
          destination={{
            latitude:destination.coordinates.latitude,
            longitude:destination.coordinates.longitude
          }}
          apikey={key.google_maps_key}
          strokeWidth={5}
          strokeColor={main.primary}
          geodesic={true}
          precision='high'
          onReady={handleDirectionsReady}
          mode='DRIVING'
        />
        <MemoizedMarker coords={coords} />
        <Marker.Animated coordinate={destination.coordinates} ref={markerRef} title="Service Provider" pinColor="blue" />
      </MapView>
      <View style={{ position: 'absolute', bottom: 0, padding: 10, margin: 20, width: "90%", elevation: 5 }} className="rounded-3xl bg-white h-16 flex flex-row justify-center items-center">
        <Text className="font-black text-md text-gray-600" >I am {details.distance} KM away, </Text>
        <Text className="font-black text-md text-gray-600" >I will arrive in {details.duration} min</Text>
      </View>
    </View>
  );
};


export default Tracking;
