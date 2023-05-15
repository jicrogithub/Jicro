import React, { memo } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { key } from "../../../../constants/API_KEYS"
import { getCurrentLocationWithLocality } from '../../../../helper/Location';
import Button from './../../../components/Button';
import { setData } from './../../../../helper/LocalStorage';
const GooglePlacesInput = ({ setCords, setAddress, onChange, refRBSheet }) => {
    return (
        <GooglePlacesAutocomplete
            fetchDetails={true}
            placeholder='Search'
            onPress={async (data, details) => {
                setAddress({
                    address: details.formatted_address,
                    locality: details.address_components[2].long_name
                })
                await setData('address_formatted', details.formatted_address);
                await setData('locality', details.address_components[2].long_name);
                // 
                // 
                // 'details' is provided when fetchDetails = true

                // setAddress(()=>details.formatted_address)
            }}
            styles={{
                textInputContainer: {
                    flexDirection: 'row',
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

        >
            <Button func={async () => {
                const { address, locality } = await getCurrentLocationWithLocality()
                // console.log(address,
                //     locality)
                setAddress({
                    address,
                    locality
                })
                refRBSheet.current.close()
            }} text="Add Your Current Address" />
        </GooglePlacesAutocomplete>
    );
};

export default GooglePlacesInput;