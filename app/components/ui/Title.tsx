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
    borderWidth: 2,
    borderColor: "white",
    padding: 12
  }
});