import * as Calendar from "expo-calendar";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getDefaultCalendarSource() {
    const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
    const defaultCalendars = calendars.filter((each) => each.source.name === "Default");
    return defaultCalendars[0].source;
  }
  
  export async function createCalendar() {
    const defaultCalendarSource =
      Platform.OS === "ios"
        ? await getDefaultCalendarSource()
        : { isLocalAccount: true, name: "Expo Calendar" };
  
    const newCalendarID = await Calendar.createCalendarAsync({
      title: "Expo Calendar",
      color: "blue",
      entityType: Calendar.EntityTypes.EVENT,
      sourceId: defaultCalendarSource.id,
      source: defaultCalendarSource,
      name: "internalCalendarName",
      ownerAccount: "personal",
      accessLevel: Calendar.CalendarAccessLevel.OWNER,
    });
    
    console.log(`Your new calendar ID is: ${newCalendarID}`);
    return newCalendarID;
  }
  
  export async function getStoredCalendarId() {
    try {
      const calendarId = await AsyncStorage.getItem("ACE_Calendar");
      if (calendarId) {
        console.log("Calendar ID from AsyncStorage:", calendarId);
        return calendarId;
      } else {
        console.log("Calendar ID not found, creating a new one.");
        const newCalendarId = await createCalendar();
        await AsyncStorage.setItem("ACE_Calendar", newCalendarId);
        return newCalendarId;
      }
    } catch (error) {
      console.log("Error accessing AsyncStorage:", error);
      return null;
    }
  }
  
  export const storeCalendarId = async (value) => {
    try {
      await AsyncStorage.setItem("ACE_Calendar", value);
    } catch (e) {
      console.log(e);
    }
  };