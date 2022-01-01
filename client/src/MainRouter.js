import React from "react";
import { Route, Switch } from "react-router-dom";

import Signin from "./components/Signin.js";
import Signup from "./components/Signup";
import Landing from "./pages/Landing";
import Home from "./pages/Home.js";
import PrivateRoute from "./PrivateRoute.js";
import Header from "./components/Header.js";
import EditPost from "./components/EditPost.js";
import Menu from "./Menu.js";

const MainRouter = () => {
  return (
    <div>
      <Menu />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin" component={Signin} />
        <PrivateRoute exact path="/home" component={Home} />
        <PrivateRoute exact path="/posts/:postId" component={EditPost} />
      </Switch>
    </div>
  );
};

export default MainRouter;
