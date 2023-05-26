import React, { useState, useEffect, useRef,memo } from 'react';
import { View, ScrollView, Image, Text } from 'react-native';
const images = [
  'https://cdn.pixabay.com/photo/2012/08/27/14/19/mountains-55067__340.png',
  'https://images.unsplash.com/photo-1612441804231-77a36b284856?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8bW91bnRhaW4lMjBsYW5kc2NhcGV8ZW58MHx8MHx8&w=1000&q=80',
  'https://img.freepik.com/free-vector/nature-scene-with-river-hills-forest-mountain-landscape-flat-cartoon-style-illustration_1150-37326.jpg?w=2000',
  'https://petapixel.com/assets/uploads/2022/08/fdfs11-800x533.jpg',
  'https://petapixel.com/assets/uploads/2022/08/fdfs19-800x533.jpg',
];

const Carousel = () => {
  // 
  const imageWidth = 350;
  const imageSpacing = 8;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (currentImageIndex === images.length - 1) {
        setCurrentImageIndex(0);
        scrollViewRef.current.scrollTo({ x: 0, animated: false });
      } else {
        setCurrentImageIndex(currentImageIndex + 1);
        scrollViewRef.current.scrollTo({ x: (imageWidth + imageSpacing) * (currentImageIndex + 1), animated: true });
      }
    }, 3000);

    return () => clearInterval(intervalId);
  }, [currentImageIndex]);


  return (
    <ScrollView
      ref={scrollViewRef}
      horizontal={true}
      className="mt-2"
      showsHorizontalScrollIndicator={false}
      pagingEnabled={true}
      snapToInterval={imageWidth + imageSpacing}
      contentContainerStyle={{ paddingLeft: imageSpacing }}
      onMomentumScrollEnd={(event) => {
        const index = Math.round(event.nativeEvent.contentOffset.x / (imageWidth + imageSpacing));
        setCurrentImageIndex(index);
      }}
    >
      {images.map((image, index) => (
        <View key={index} style={{ width: imageWidth, marginRight: imageSpacing,height:200 }}>
          <Image source={{ uri: image }} style={{ width: '100%', height: '100%', borderRadius: 8 }} />
          <Text style={{ textAlign: 'center', marginTop: 4 }}>Image {index + 1}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default Carousel;
