import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, View, useWindowDimensions } from "react-native";
import GuessLogItem from "../components/game/GuessLogItem";
import NumberContainer from "../components/game/NumberContainer";
import Card from "../components/ui/Card";
import InstructionComponent from "../components/ui/InstructionComponent";
import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";

function generateRandomBetween(min: number, max: number, exclude: number): number {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

let minBoundary: number = 1;
let maxBoundary: number = 100;

const GameScreen = ({ userNumber, setGameIsOver, setGuessRounts }: { userNumber: number; setGameIsOver: (state: boolean) => void; setGuessRounts: (num: number) => void; }) => {
  const initialGuess = generateRandomBetween(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState<number>(initialGuess);
  const [guessNumbers, setGuessNumbers] = useState<number[]>([initialGuess]);
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    if (currentGuess === userNumber)
      setGameIsOver(true);

    return () => {
      setGuessRounts(guessNumbers.length);
      // minBoundary = 1;
      // maxBoundary = 100;
    }
  }, [currentGuess, userNumber, setGameIsOver]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  function handleGuessHandler(direction: "lower" | "greater") {
    if ((direction === "lower" && currentGuess < userNumber) || (direction === "greater" && currentGuess > userNumber)) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [{ text: "Sorry!", style: "cancel" }])
      return;
    }

    if (direction === "lower")
      maxBoundary = currentGuess;
    else
      minBoundary = currentGuess + 1;

    const newRandNumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess);

    setCurrentGuess(newRandNumber);
    setGuessNumbers((prevNumbers) => ([newRandNumber, ...prevNumbers]))
  }

  let content = <>
    <NumberContainer>{currentGuess}</NumberContainer>
    <Card>
      <InstructionComponent styleProp={styles.instructionText}>Greater or Lower?</InstructionComponent>
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonContainer}>
          <PrimaryButton onPressHandler={() => handleGuessHandler("greater")}>
            <Ionicons name="add" size={24} color="white" /> Greater
          </PrimaryButton>
        </View>
        <View style={styles.buttonContainer}>
          <PrimaryButton onPressHandler={() => handleGuessHandler("lower")}>
            <Ionicons name="remove" size={24} color="white" /> Lower
          </PrimaryButton>
        </View>
      </View>
    </Card>
  </>;

  if (width > 500) {
    content = <>
      {/* <InstructionComponent styleProp={styles.instructionText}>Greater or Lower?</InstructionComponent> */}
      <View style={styles.buttonContainerWide}>
        <View style={styles.buttonContainer}>
          <PrimaryButton onPressHandler={() => handleGuessHandler("greater")}>
            <Ionicons name="add" size={24} color="white" /> Greater
          </PrimaryButton>
        </View>
        <NumberContainer>{currentGuess}</NumberContainer>
        <View style={styles.buttonContainer}>
          <PrimaryButton onPressHandler={() => handleGuessHandler("lower")}>
            <Ionicons name="remove" size={24} color="white" /> Lower
          </PrimaryButton>
        </View>
      </View>
    </>;
  }

  return (
    <View style={styles.screen}>
      <Title text="Opponent's Guess" />
      {content}
      <View style={styles.listContainer}>
        {/* {guessNumbers.map((number, index) => (<Text key={index}>{number}</Text>))} */}
        <FlatList data={guessNumbers} renderItem={(itemData) => <GuessLogItem guessNumber={itemData.item} numberRound={guessNumbers.length - itemData.index} />} keyExtractor={(_, index) => index.toString()} />
      </View>
    </View>
  )
}

export default GameScreen

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    alignItems: "center"
  },
  buttonsContainer: {
    flexDirection: "row"
  },
  buttonContainer: {
    flex: 1,
  },
  instructionText: {
    marginBottom: 12
  },
  listContainer: {
    flex: 1,
    padding: 16
  },
  buttonContainerWide: {
    flexDirection: "row",
    alignItems: "center"
  }
});
