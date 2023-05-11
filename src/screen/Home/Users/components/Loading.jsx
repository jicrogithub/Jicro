import { useEffect, useRef } from 'react';
import { Animated, View, Text } from 'react-native';
import { main } from '../../../../utils/colors';
export const Loading = ({text,delay,onComplete}) => {
    const LETTER_BOUNCE_DURATION = 600;

    const animatedValues = useRef(text.split('').map(() => new Animated.Value(0))).current;

    useEffect(() => {
        const animations = animatedValues.map((animatedValue, index) => {
            return Animated.sequence([
                Animated.delay(delay + index * 200),
                Animated.timing(animatedValue, {
                    toValue: 1,
                    duration: LETTER_BOUNCE_DURATION,
                    useNativeDriver: true,
                }),
                Animated.parallel([
                    Animated.timing(animatedValue, {
                        toValue: 0,
                        duration: LETTER_BOUNCE_DURATION,
                        useNativeDriver: true,
                    }),
                    Animated.timing(animatedValue, {
                        toValue: 0,
                        duration: 500,
                        useNativeDriver: true,
                    })
                ]),
            ]);
        });

        Animated.loop(Animated.parallel(animations)).start(onComplete);
    }, []);

    return (
        <View className="h-screen w-full flex justify-center items-center bg-white" style={{ flexDirection: 'row' }}>
            {text.split('').map((letter, index) => (
                <Animated.Text
                    key={`${letter}-${index}`}
                    style={{
                        fontWeight: '900',
                        fontSize: 50,
                        color: main.primary,
                        transform: [{
                            translateY: animatedValues[index].interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, -25],
                            })
                        }],
                    }}
                >
                    {letter}
                </Animated.Text>
            ))}
        </View>
    );
}