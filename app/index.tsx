import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { ImageBackground, SafeAreaView, StyleSheet } from "react-native";
import Colors from "./constants/Colors";
import GameOverScreen from "./screens/GameOverScreen";
import GameScreen from "./screens/GameScreen";
import StartGameScreen from "./screens/StartGameScreen";

export default function Index() {
  const [userNumber, setUserNumber] = useState<null | number>(null);
  const [gameIsOver, setGameIsOver] = useState<boolean>(false);
  const [guessRounts, setGuessRounts] = useState<number>(0);

  function ResetGame() {
    setUserNumber(null);
    setGameIsOver(false);
    setGuessRounts(0);
  }

  const [fontsLoaded] = useFonts({
    'open-sans': require("../assets/fonts/OpenSans-Regular.ttf"),
    'open-sans-bold': require("../assets/fonts/OpenSans-Bold.ttf")
  });

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <LinearGradient colors={[Colors.primary700, Colors.accent500]} style={styles.rootScreen}>
      <ImageBackground
        source={require("../assets/images/background.png")}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaView style={styles.rootScreen}>
          {(userNumber !== null && !gameIsOver) ? <GameScreen userNumber={userNumber} setGameIsOver={setGameIsOver} setGuessRounts={setGuessRounts} /> : gameIsOver ? <GameOverScreen ResetGame={ResetGame} userNumber={userNumber} guessRounts={guessRounts} /> : <StartGameScreen pickedNumberHandlre={setUserNumber} />}
        </SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1
  },
  backgroundImage: {
    opacity: 0.15
  }
});
