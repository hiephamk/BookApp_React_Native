import LoginScreen from "@/components/LoginScreen";
import { ClerkProvider } from "@clerk/clerk-expo";
import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import {Stack} from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";


export default function RootLayoutNav() {
  return (
    <ClerkProvider publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <SafeAreaView>
        <SignedIn>
          <Stack ScreenOption={{headerShown:false}}>
            <Stack.Screen name='(tabs)'/>
          </Stack>
        </SignedIn>
        <SignedOut>
          <LoginScreen/>
        </SignedOut>
      </SafeAreaView>
    </ClerkProvider>
  );
}