import { StyleSheet, View, Pressable, Text } from 'react-native';
import useTheme from '../Hooks/useTheme';


export default function Button({ label, theme, onPress, children }) {
  const { color: colors } = useTheme()

  if (theme === "primary") {
    return (
        <Pressable
          style={[styles.circle, {backgroundColor: colors.buttoncolor}]}
          onPress={onPress}
        >
            <Text style={[styles.circleLabel, { color: colors.textcolor }]}>{label}</Text>
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
            <Text style={[styles.circleLabel, { color: colors.textcolor }]}>{label}</Text>
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
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 30,
  },
});
