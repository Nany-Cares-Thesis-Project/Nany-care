import React from "react";
import { Router, Scene } from "react-native-router-flux";
import  {EducationLevel,HowManyKidsCanHandle, Place} from "./Home"
import SignUp from "./signup.js";
import Login from "./Login.js";

const Routes = () => (
  <Router>
    <Scene key="root">
      <Scene key="home" component={EducationLevel} title="EducationLevel" initial={true} />
      <Scene key="home" component={HowManyKidsCanHandle} title="HowManyKidsCanHandle" initial={true} />
      <Scene key="home" component={Place} title="Place" initial={true} />
      <Scene key="SignUp" component={SignUp} title="SignUp" />
      <Scene key="Login" component={Login} title="Login" />
    </Scene>
  </Router>
);
export default Routes;
// if (state.isLoading) {
//   // We haven't finished checking for the token yet
//   return <SplashScreen />;
// }

// return (
//   <Stack.Navigator>
//     {state.userToken == null ? (
//       // No token found, user isn't signed in
//       <Stack.Screen
//         name="SignIn"
//         component={SignInScreen}
//         options={{
//           title: 'Sign in',
//           // When logging out, a pop animation feels intuitive
//           // You can remove this if you want the default 'push' animation
//           animationTypeForReplace: state.isSignout ? 'pop' : 'push',
//         }}
//       />
//     ) : (
//       // User is signed in
//       <Stack.Screen name="Home" component={HomeScreen} />
//     )}
//   </Stack.Navigator>
// );
