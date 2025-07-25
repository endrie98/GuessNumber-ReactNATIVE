import Colors from "@/app/constants/Colors";
import { ReactNode } from "react";
import { StyleSheet, Text } from "react-native";

const InstructionComponent = ({ children, styleProp }: { children: ReactNode; styleProp: {} | undefined; }) => {
    return (
        <Text style={[styles.instructionText, styleProp !== undefined && styleProp]}>{children}</Text>
    )
}

export default InstructionComponent

const styles = StyleSheet.create({
    instructionText: {
        fontFamily: "open-sans",
        color: Colors.accent500,
        fontSize: 24,
    }
});
