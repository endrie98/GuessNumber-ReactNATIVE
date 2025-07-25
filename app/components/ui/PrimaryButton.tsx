import { ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/Colors";

const PrimaryButton = ({ children, onPressHandler }: { children: ReactNode; onPressHandler: () => void; }) => {
    return (
        <View style={styles.buttonOuterContainer}>
            <Pressable
                onPress={onPressHandler}
                style={({ pressed }) => pressed ? [styles.pressed, styles.buttonInnerContainer] : styles.buttonInnerContainer}
                android_ripple={{ color: Colors.primary600 }}>
                <Text style={styles.buttonText}>{children}</Text>
            </Pressable>
        </View>
    )
}

export default PrimaryButton

const styles = StyleSheet.create({
    buttonOuterContainer: {
        borderRadius: 28,
        margin: 4,
        overflow: "hidden"
    },
    buttonInnerContainer: {
        backgroundColor: Colors.primary500,
        paddingVertical: 8,
        paddingHorizontal: 16,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        elevation: 2
    },
    buttonText: {
        color: "white",
        textAlign: "center",
        flexDirection: "row",
        alignItems: "center"
    },
    pressed: {
        opacity: 0.75,
    }
})
