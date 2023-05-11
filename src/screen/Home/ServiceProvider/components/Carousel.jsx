import React, { useState, useEffect, useRef, memo } from 'react';
import { View, ScrollView, Image, Text } from 'react-native';

const Carousel = ({images}) => {
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
    }, 2000);

    return () => clearInterval(intervalId);
  }, [currentImageIndex]);

  const imageWidth = 365;
  const imageSpacing = 8;

  return (
    <ScrollView
    // className="w-full"
      ref={scrollViewRef}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      pagingEnabled={true}
      snapToInterval={imageWidth + imageSpacing}
      // contentContainerStyle={{ paddingLeft: imageSpacing }}
      onMomentumScrollEnd={(event) => {
        const index = Math.round(event.nativeEvent.contentOffset.x / (imageWidth + imageSpacing));
        setCurrentImageIndex(index);
      }}
    >
      {images?.map((image, index) => (
        <View key={index} style={{ width: imageWidth, marginRight: imageSpacing,height:180 }}>
          <Image source={{ uri: image }} style={{ width: '100%', height: '100%', borderRadius: 15 }} />
          <Text style={{ textAlign: 'center', marginTop: 4 }}>Image {index + 1}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default Carousel
