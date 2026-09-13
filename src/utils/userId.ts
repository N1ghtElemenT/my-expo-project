import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Crypto from "expo-crypto";

const USER_ID_KEY = "@app_user_id";

export async function getUserId(): Promise<string> {
  let userId = await AsyncStorage.getItem(USER_ID_KEY);
  if (!userId) {
    userId = Crypto.randomUUID();
    await AsyncStorage.setItem(USER_ID_KEY, userId);
  }
  return userId;
}
