import { View, Text, TouchableOpacity } from 'react-native'
import React,{memo} from 'react'
import { main } from "../../../../utils/colors";
import SquareBoxs from './SquareBoxs';
import Button from './../../../components/Button';

const Trending = () => {
  
  return (
    <View style={main.shadows} className="bg-white w-50 h-60 mx-2 my-1 rounded-lg p-2 flex flex-col justify-between" >
      <SquareBoxs data={
        [
          {
            id:1,
            text:"",
            img:"",
            redirectTo:"TrendingExtended"    
          },
          {
            id:2,
            text:"",
            img:"",
            redirectTo:""    
          },
          {
            id:3,
            text:"",
            img:"",
            redirectTo:""    
          },
          {
            id:4,
            text:"",
            img:"",
            redirectTo:""    
          }
        ]
      } />
            <SquareBoxs data={
        [
          {
            id:1,
            text:"",
            img:"",
            redirectTo:""    
          },
          {
            id:2,
            text:"",
            img:"",
            redirectTo:""    
          },
          {
            id:3,
            text:"",
            img:"",
            redirectTo:""    
          },
          {
            id:4,
            text:"",
            img:"",
            redirectTo:""    
          }
        ]
      } />
      <Button text="Demand a Service" func={()=>{
        navigation.navigate('DemandService')
      }} />
    </View>
  )
}

export default memo(Trending)