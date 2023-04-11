import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { key } from "../../../../constants/API_KEYS"
const GooglePlacesInput = ({ setCords,setAddress,onChange }) => {
    return (
        <GooglePlacesAutocomplete
            fetchDetails={true}
            placeholder='Search' 
            onFail={error => console.log(error)}
            onPress={(data, details) => {
                // console.log("heyy")
                // console.log(details.geometry.location)
                // 'details' is provided when fetchDetails = true
                onChange({
                    latitude: details.geometry.location.lat,
                    longitude: details.geometry.location.lng,
                    latitudeDelta: 0.002,
                    longitudeDelta: 0.000001
                })
                console.log(details)
                setAddress(()=>details.formatted_address)
            }}
            styles={{
                textInputContainer: {
                    flexDirection: 'row',
                },
                textInput: {
                    backgroundColor: '#fff',
                    height: 44,
                    borderRadius: 5,
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    fontSize: 15,
                    flex: 1,
                    color: '#000', // set text color to white
                    // placeholderTextColor: '#000000', // set placeholder text color to black
                },
                poweredContainer: {
                },
                powered: {},
                listView: {
                },
                row: {
                    backgroundColor: 'transparent',
                    padding: 13,
                    height: 44,
                    flexDirection: 'row',
                },
                separator: {
                    height: 0.5,
                    backgroundColor: '#c8c7cc',
                },
                description: {},
                loader: {
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    height: 10,
                    backgroundColor: "transparent"
                },
            }}
            query={{
                key: key.google_maps_key,
                language: 'en',
            }}

        />
    );
};

export default GooglePlacesInput;