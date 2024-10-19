import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./RootNavigator";
import ErrorBoundary from "react-native-error-boundary";
import AUthNavigator from "./AuthNavigator";
import { Provider } from "react-redux";
import store from "../store/store";

const queryClient = new QueryClient();

const getErrorBoundary = (error: any): boolean => {
    if (
        error &&
        error.response &&
        error.response.status &&
        error.response.status >= 500
    ) {
        return true;
    }
    return false;
};

// queryClient.setDefaultOptions({
//     queries: {
//         /* 500 errors will be thrown to the error boundary */
//         useErrorBoeundary: getErrorBoundary,
//     },
//     mutations: {
//         /* 500 errors will be thrown to the error boundary */
//         useErrorBoundary: getErrorBoundary,
//     },
// });

const Navigators = () => (
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  </QueryClientProvider>
);

export default Navigators;
