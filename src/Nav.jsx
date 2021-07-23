import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import DisplayProducts from './components/ProductSelectionPage/ProduceProductSelection/displayProduct';
import Store from './components/Store/Store';
import Landing from './components/Home/Landing';
import Signup from './components/SignUp/Signup';
import SocialSignUp from './components/SignUp/SocialSignUp';
import AuthAdminRoute from './auth/AuthAdminRoute';
import AuthAdminLoginRoute from './auth/AuthAdminLoginRoute';
import AdminSocialSignup from './components/Admin/AdminSocialSignup';
import AdminSignup from './components/Admin/AdminSignup';
import AdminLogin from './components/LogIn/AdminLogin';
import Admin from './components/Admin/Admin';
import ProfileInfo from './components/Profile-Info/ProfileInfo';
import TermsAndConditions from './components/TermsAndConditions/TermsAndConditions';
import MobilePaypalCheckout from './mobile/MobilePaypalCheckout';
import ReactGA from 'react-ga';
import Sweeptakes from "./components/Sweeptakes/Sweeptakes";
import Sweeptakes2 from "./components/Sweeptakes/Sweeptakes2";
import Sweeptakes3 from "./components/Sweeptakes/Sweeptakes3";
import Sweeptakes4 from "./components/Sweeptakes/Sweeptakes4";

// Nav here will take all the adress from children page to this and give
// it to the switch route
const GA_TRCKING_CODE = process.env.REACT_APP_GA_TRACKING_CODE;

ReactGA.initialize(GA_TRCKING_CODE);
function Nav(authLevel, isAuth) {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);
  return (
    <Switch>
      {/* {isAuth ?   <Route exact path="/store" component={Store} />:<Route exact path="/" component={Landing} />} */}
      <Route exact path="/" component={Landing} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/socialsignup" component={SocialSignUp} />
      <Route exact path="/products" component={DisplayProducts} />
      <Route exact path="/store" component={Store} />
      <Route exact path="/profile-info" component={ProfileInfo} />
      <Route
        exact
        path="/terms-and-conditions"
        component={TermsAndConditions}
      />

      <Route
            exact
            path="/sweeptakes"
            component={Sweeptakes}
        />
        <Route
            exact
            path="/sweeptakes2"
            component={Sweeptakes2}
        />
        <Route
            exact
            path="/sweeptakes3"
            component={Sweeptakes3}
        />
        <Route
            exact
            path="/sweeptakes4"
            component={Sweeptakes4}
        />

      <Route path="/payment/paypal:props" component={MobilePaypalCheckout} />
      <AuthAdminRoute
        path="/admin"
        component={Admin}
        auth={isAuth}
        authLevel={authLevel}
      />
      <AuthAdminLoginRoute
        path="/adminlogin"
        component={AdminLogin}
        auth={isAuth}
      />
      <AuthAdminLoginRoute
        path="/socialsignup"
        component={AdminSocialSignup}
        auth={isAuth}
      />
      <AuthAdminLoginRoute
        path="/signup"
        component={AdminSignup}
        auth={isAuth}
      />
      <Route path="*">
        <Redirect to="/" />
      </Route>
    </Switch>
  );
}

export default Nav;
