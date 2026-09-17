import { useEffect, useState } from "react";
import { View, Dimensions, useWindowDimensions, Text, StyleSheet, StatusBar } from "react-native";
 
// export const TestScreen = () => {
//     // 1. const { width, height } = Dimensions.get("window");
//     // 2. const { width, height } = useWindowDimensions();
//     // 3.  const [width, setWidth] = useState<number>(0);
//     //   const [height, setHeight] = useState<number>(0);
//     //   useEffect(() => {
//     //     const subscription = Dimensions.addEventListener("change", ({ window }) => {
//     //       console.log(window.width);
//     //       setHeight(window.height);
//     //       setWidth(window.width);
//     //     });
    
//     //     return () => subscription.remove();
//     //   }, []);
//     // return (
//     //     <View>
//     //         <Text>
//     //             Width: {width} Height {height}
//     //         </Text>
//     //     </View>
//     // );
// };
 
 
const cl = console.log;
export const TestScreen = () => {
    const { width, height } = useWindowDimensions();
    cl(`${width} ${height}`);
    return (
        <View style={styles.container}>
            <View style={[styles.item, { backgroundColor: "red" }]}></View>
            <View style={[styles.item, { backgroundColor: "orange", flex: 2 }]}></View>
            <View style={[styles.item, { backgroundColor: "blue", flex: 2 }]}></View>
            <View style={[styles.item, { backgroundColor: "green" }]}></View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "gray",
        flex: 1,
    },
    item: {
        flex: 1,
    }
})