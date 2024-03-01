import { StyleSheet, View, Pressable, Text } from 'react-native';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons";


export default function Button({ label, theme, onPress, children }) {
  if (theme === "primary") {
    return (
        <Pressable
          style={styles.circle}
          onPress={onPress}
        >
            <Text style={[styles.circleLabel, { color: "#ffffff" }]}>{label}</Text>
          {children}
        </Pressable>
    );
  }
  else if (theme === "secondary") {
    return (
        <Pressable
          style={styles.smallCircle}
          onPress={onPress}
        >
            <Text style={[styles.circleLabel, { color: "#ffffff" }]}>{label}</Text>
          {children}
        </Pressable>
    );
  }
  return (
    <View style={styles.buttonContainer}>
      <Pressable style={styles.smallCircle} onPress={onPress}>
        <Text style={styles.circleLabel}>{label}</Text>
        {children}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
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
  smallCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
