import { View, Text, TextInput, Image, FlatList } from 'react-native'
import React, { useState } from 'react'
import UniversalHeader from '../../components/Universalheader'
import { main } from './../../../utils/colors';
import SearchItem from './components/SearchItem';
import { debounce } from './../../../helper/Performance';
import { useFetch } from '../../../suppliers/BackendInteractions/Fetch';

const Search = () => {
  const {search, searchData} = useFetch()
  const [query, setQuery] = useState('');
  const doSearch = debounce(()=>{
    search(query)
  },500)
  function handleInputChange(text) {
    setQuery(text);
    doSearch(); // Call the debounced search function
  }
  return (
    <View className="w-full h-screen ">
      <View className='p-2' >
        <View className=" mb-1 h-10 w-full rounded-2xl bg-gray-200 flex flex-row items-center" >
          <Image source={require('./assets/search.png')} className="w-5 h-5 mx-3" />
          <TextInput onChangeText={handleInputChange} className="w-full h-12 rounded-xl p-2 text-gray-600 font-semibold" placeholder='Search...' placeholderTextColor={'#0d0d0d'} />
        </View>
      </View>
      <FlatList
        data={searchData}
        renderItem={({item}) => {
          const {images, title, _id} = item;
          return <SearchItem image={images[0]} title={title} id={_id} />
        }}
      />
    </View>
  )
}

export default Search