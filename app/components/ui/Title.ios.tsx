import { StyleSheet, Text } from "react-native";

const Title = ({ text }: { text: string; }) => {
    return (
        <Text style={styles.title}>{text}</Text>
    )
}

export default Title

const styles = StyleSheet.create({
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 24,
    // fontWeight: "bold",
    color: "white",
    textAlign: "center",
    // borderWidth: Platform.OS === "ios" ? 2 : 0,
    // borderWidth: Platform.select({ ios: 2, android: 0 }),
    borderWidth: 2,
    borderColor: "white",
    padding: 12,
    maxWidth: "80%",
  }
});