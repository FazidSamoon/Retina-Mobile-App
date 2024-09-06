import { NavigatorScreenParams } from '@react-navigation/native';

export type RootScreensParamsList = {
    Login: undefined;
    Registration: undefined;
    QuickSetup: undefined;
    Splash: undefined;
    OnboardingScreen: undefined;
    Auth: NavigatorScreenParams<AuthScreensParamList>;
};

export type AuthScreensParamList = {
    Home: undefined;
    Profile: undefined;
    Settings: undefined;
    Notifications: undefined;
    Chat: undefined;
    ChatRoom: { userId: string };
    MealsRecommend: undefined;
    ExerciseRecommend: undefined;
    RecommendHome: undefined;
};