import { StyleSheet, View, Pressable, Text } from 'react-native';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons";


export default function Button({ label, theme, onPress, children }) {
  if (theme === "primary") {
    return (
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.circle}
          onPress={onPress}
        >
            <Text style={[styles.circleLabel, { color: "#ffffff" }]}>{label}</Text>
          {children}
        </Pressable>
      </View>
    );
  }
  return (
    <View style={styles.buttonContainer}>
      <Pressable style={styles.circle} onPress={onPress}>
        <Text style={styles.circleLabel}>{label}</Text>
        {children}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 200,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    flexDirection: 'column',
    padding: 3,
  },
  circle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'orange',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleLabel: {
    color: '#ffffff',
    fontSize: 30,
  },
});
