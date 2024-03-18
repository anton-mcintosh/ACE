import {
  Modal,
  Alert,
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as Calendar from "expo-calendar";

export default function EditModal({ isVisible, children, onClose, eventId }) {
  const deleteEvent = async () => {
    try {
      await Calendar.deleteEventAsync(eventId.toString());
      Alert.alert("Success", "Event deleted successfully.");
      onClose(); // Close the modal and refresh the events in the parent component
    } catch (e) {
      Alert.alert("Error", "Failed to delete the event.");
      console.error(e);
    }
  };

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.modalContent}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Edit Event</Text>
          <Pressable onPress={onClose}>
            <MaterialIcons name="close" color="#fff" size={22} />
          </Pressable>
        </View>
        <View style={styles.actionButtonContainer}>
          <TouchableOpacity style={styles.deleteButton} onPress={deleteEvent}>
            <Text style={styles.deleteButtonText}>Delete Event</Text>
          </TouchableOpacity>
        </View>
        {children}
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  modalContent: {
    height: "25%",
    width: "100%",
    backgroundColor: "#25292e",
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: "absolute",
    bottom: 0,
  },
  titleContainer: {
    height: "16%",
    backgroundColor: "#464C55",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    color: "#fff",
    fontSize: 16,
  },
  pickerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 50,
    paddingVertical: 20,
  },
  actionButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 60,
    marginBottom: 30,
    paddingHorizontal: 20,
  },

  deleteButton: {
    backgroundColor: "orange", // White background for the delete button
    borderRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    textAlign: "center",
    flex: 1,
  },

  deleteButtonText: {
    color: "#000", // Black text color for the delete button
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
