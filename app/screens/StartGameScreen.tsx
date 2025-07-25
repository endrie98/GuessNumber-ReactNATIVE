import { useState } from "react";
import { Alert, StyleSheet, TextInput, View } from "react-native";
import Card from "../components/ui/Card";
import InstructionComponent from "../components/ui/InstructionComponent";
import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";
import Colors from "../constants/Colors";

const StartGameScreen = ({ pickedNumberHandlre }: { pickedNumberHandlre: (numPick: number) => void; }) => {
    const [enteredNumber, setEnteredNumber] = useState<string>("");

    function numberInputHandler(enteredText: string) {
        setEnteredNumber(enteredText);
    }

    function resteInputHandler() {
        setEnteredNumber("");
    }

    function confirmInputHandler() {
        const chosenNumber = Number(enteredNumber);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert("Invalid number!", "Number has to be a number between 1 and 99.", [{ text: "Okay", style: "destructive", onPress: resteInputHandler }]);
            return;
        }

        pickedNumberHandlre(chosenNumber);
    }

    return (
        <View style={styles.rootContainer}>
            <Title text="Guess My Number" />
            <Card>
                <InstructionComponent styleProp={undefined}>Enter a number</InstructionComponent>
                <TextInput
                    style={styles.numberInpunt}
                    maxLength={2}
                    keyboardType="number-pad"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={enteredNumber}
                    onChangeText={numberInputHandler}
                />
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPressHandler={resteInputHandler}>Reset</PrimaryButton>
                    </View>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPressHandler={confirmInputHandler}>Confirm</PrimaryButton>
                    </View>
                </View>
            </Card>
        </View>
    )
}

export default StartGameScreen

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        marginTop: 100,
        alignItems: "center"
    },
    numberInpunt: {
        height: 50,
        width: 50,
        fontSize: 32,
        borderBottomColor: Colors.accent500,
        borderBottomWidth: 2,
        color: Colors.accent500,
        marginVertical: 8,
        fontWeight: "bold",
        textAlign: "center"
    },
    buttonsContainer: {
        flexDirection: "row"
    },
    buttonContainer: {
        flex: 1
    }
});
