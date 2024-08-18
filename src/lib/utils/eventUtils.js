import * as Calendar from "expo-calendar";
import isEmail from "validator/lib/isEmail";
import { Platform } from "react-native";
import Toast from "react-native-root-toast";
import { extractShortCode } from "./utils";

const getTitle = (match) => {
    return extractShortCode(match?.t1) + " vs " + extractShortCode(match?.t2);
};

const setReminder = async (match) => {
    const timeInOneHour = new Date(); //new Date(match?.dateTimeGMT);
    console.log(timeInOneHour);
    timeInOneHour.setHours(timeInOneHour.getHours() + 5);
    try {
        //const calendar = await Calendar.getDefaultCalendarAsync({endDate});
        const newReminder = {
            title: getTitle(match),
            location: "",
            startDate: new Date(match?.dateTimeGMT),
            dueDate: new Date(match?.dateTimeGMT),
            notes: getTitle(match),
        };

        await Calendar.createReminderAsync(null, newReminder);
        Toast.show("Reminder saved successfully", {
            duration: Toast.durations.LONG,
        });
    } catch (e) {
        console.log(e);
        Toast.show("Reminder could not be saved", {
            duration: Toast.durations.LONG,
        });
    }
};

async function getGmailCalendarId() {
    const calendars = await Calendar.getCalendarsAsync();

    // Filter calendars to find the one associated with Gmail
    const gmailCalendar = calendars.find(
        (calendar) =>
            calendar.source.name === calendar.title &&
            calendar.title === calendar.name &&
            isEmail(calendar.name)
    );

    if (gmailCalendar) {
        return gmailCalendar.id;
    } else {
        console.log("No Gmail calendar found.");
        return "1";
    }
}

const setMatchEvent = async (match) => {
    try {
        const calendarId = await getGmailCalendarId();
        await Calendar.createEventAsync(calendarId, {
            title: getTitle(match),
            location: "",
            startDate: new Date(match?.dateTimeGMT),
            endDate: new Date(match?.dateTimeGMT),
            notes: getTitle(match),
        });
        Toast.show("Reminder saved successfully", {
            duration: Toast.durations.LONG,
        });
    } catch (e) {
        console.log(e);
        Toast.show("Reminder could not be saved", {
            duration: Toast.durations.LONG,
        });
    }
};
const getEventPermissionNSet = async (date) => {
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    if (status === "granted") {
        await setMatchEvent(date);
    }
};
const getReminderPermissionNSet = async (date) => {
    const { status } = await Calendar.requestRemindersPermissionsAsync();
    const { status: calendarStatus } =
        await Calendar.requestCalendarPermissionsAsync();
    console.log(status, calendarStatus);
    if (status === "granted" && calendarStatus === "granted") {
        await setReminder(date);
    }
};

const setEventOrPermission = async (date) => {
    if (Platform.OS === "android") {
        await getEventPermissionNSet(date);
    } else {
        await getReminderPermissionNSet(date);
    }
};

export default setEventOrPermission;
