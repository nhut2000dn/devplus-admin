import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import { Routes } from "../routes";

// pages
import Upgrade from "./Upgrade";
import DashboardOverview from "./dashboard/DashboardOverview";
import Transactions from "./Transactions";
import Settings from "./Settings";
import BootstrapTables from "./tables/BootstrapTables";
import Signin from "./Signin";
import Signup from "./Signup";
import ForgotPassword from "./examples/ForgotPassword";
import ResetPassword from "./examples/ResetPassword";
import Lock from "./examples/Lock";
import NotFoundPage from "./NotFound";
import ServerError from "./examples/ServerError";

// documentation pages
import DocsOverview from "./documentation/DocsOverview";
import DocsDownload from "./documentation/DocsDownload";
import DocsQuickStart from "./documentation/DocsQuickStart";
import DocsLicense from "./documentation/DocsLicense";
import DocsFolderStructure from "./documentation/DocsFolderStructure";
import DocsBuild from "./documentation/DocsBuild";
import DocsChangelog from "./documentation/DocsChangelog";

// components
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Preloader from "../components/Preloader";

import Accordion from "./components/Accordion";
import Alerts from "./components/Alerts";
import Badges from "./components/Badges";
import Breadcrumbs from "./components/Breadcrumbs";
import Buttons from "./components/Buttons";
import Forms from "./components/Forms";
import Modals from "./components/Modals";
import Navs from "./components/Navs";
import Navbars from "./components/Navbars";
import Pagination from "./components/Pagination";
import Popovers from "./components/Popovers";
import Progress from "./components/Progress";
import Tables from "./components/Tables";
import Tabs from "./components/Tabs";
import Tooltips from "./components/Tooltips";
import Toasts from "./components/Toasts";

import Admin from "../components/AdminPage";

import Cookies from "universal-cookie";
const cookies = new Cookies();

const RouteWithLoader = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Route
      {...rest}
      render={(props) => (
        <>
          {" "}
          <Preloader show={loaded ? false : true} /> <Component {...props} />{" "}
        </>
      )}
    />
  );
};

const RouteWithSidebar = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const localStorageIsSettingsVisible = () => {
    return localStorage.getItem("settingsVisible") === "false" ? false : true;
  };

  const [showSettings, setShowSettings] = useState(
    localStorageIsSettingsVisible
  );

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    localStorage.setItem("settingsVisible", !showSettings);
  };

  // get cookie from browser if logged in
  const token = cookies.get("TOKEN");
  const history = useHistory();

  const logoutHandle = () => {
    cookies.remove("TOKEN", { path: "/" });
    cookies.remove("email", { path: "/" });
    cookies.remove("avatar", { path: "/" });
    cookies.remove("id", { path: "/" });
    history.push("/sign-in");
  }

  // return route if there is a valid token set in the cookie
  if (token) {
    return (
      <Route
        {...rest}
        render={(props) => (
          <>
            <Preloader show={loaded ? false : true} />
            <Sidebar />
  
            <main className="content">
              <Navbar logoutHandle={logoutHandle} />
              <Component {...props} />
              <Footer
                toggleSettings={toggleSettings}
                showSettings={showSettings}
              />
            </main>
          </>
        )}
      />
    );
  } else {
    // return the user to the landing page if there is no valid token set
    return (
      <Redirect
        to={{
          pathname: "/sign-in",
        }}
      />
    );
  }
};

export default () => (
  <Switch>
    <RouteWithLoader exact path={Routes.Signin.path} component={Signin} />
    <RouteWithLoader exact path={Routes.Signup.path} component={Signup} />
    <RouteWithLoader
      exact
      path={Routes.ForgotPassword.path}
      component={ForgotPassword}
    />
    <RouteWithLoader
      exact
      path={Routes.ResetPassword.path}
      component={ResetPassword}
    />
    <RouteWithLoader exact path={Routes.Lock.path} component={Lock} />
    <RouteWithLoader
      exact
      path={Routes.NotFound.path}
      component={NotFoundPage}
    />
    <RouteWithLoader
      exact
      path={Routes.ServerError.path}
      component={ServerError}
    />

    {/* pages */}
    <RouteWithSidebar
      exact
      path={Routes.DashboardOverview.path}
      component={DashboardOverview}
    />
    <RouteWithSidebar exact path={Routes.Upgrade.path} component={Upgrade} />
    <RouteWithSidebar
      exact
      path={Routes.Transactions.path}
      component={Transactions}
    />
    <RouteWithSidebar exact path={Routes.Settings.path} component={Settings} />
    <RouteWithSidebar
      exact
      path={Routes.BootstrapTables.path}
      component={BootstrapTables}
    />

    {/* components */}
    <RouteWithSidebar
      exact
      path={Routes.Accordions.path}
      component={Accordion}
    />
    <RouteWithSidebar exact path={Routes.Alerts.path} component={Alerts} />
    <RouteWithSidebar exact path={Routes.Badges.path} component={Badges} />
    <RouteWithSidebar
      exact
      path={Routes.Breadcrumbs.path}
      component={Breadcrumbs}
    />
    <RouteWithSidebar exact path={Routes.Buttons.path} component={Buttons} />
    <RouteWithSidebar exact path={Routes.Forms.path} component={Forms} />
    <RouteWithSidebar exact path={Routes.Modals.path} component={Modals} />
    <RouteWithSidebar exact path={Routes.Navs.path} component={Navs} />
    <RouteWithSidebar exact path={Routes.Navbars.path} component={Navbars} />
    <RouteWithSidebar
      exact
      path={Routes.Pagination.path}
      component={Pagination}
    />
    <RouteWithSidebar exact path={Routes.Popovers.path} component={Popovers} />
    <RouteWithSidebar exact path={Routes.Progress.path} component={Progress} />
    <RouteWithSidebar exact path={Routes.Tables.path} component={Tables} />
    <RouteWithSidebar exact path={Routes.Tabs.path} component={Tabs} />
    <RouteWithSidebar exact path={Routes.Tooltips.path} component={Tooltips} />
    <RouteWithSidebar exact path={Routes.Toasts.path} component={Toasts} />

    {/* documentation */}
    <RouteWithSidebar
      exact
      path={Routes.DocsOverview.path}
      component={DocsOverview}
    />
    <RouteWithSidebar
      exact
      path={Routes.DocsDownload.path}
      component={DocsDownload}
    />
    <RouteWithSidebar
      exact
      path={Routes.DocsQuickStart.path}
      component={DocsQuickStart}
    />
    <RouteWithSidebar
      exact
      path={Routes.DocsLicense.path}
      component={DocsLicense}
    />
    <RouteWithSidebar
      exact
      path={Routes.DocsFolderStructure.path}
      component={DocsFolderStructure}
    />
    <RouteWithSidebar
      exact
      path={Routes.DocsBuild.path}
      component={DocsBuild}
    />
    <RouteWithSidebar
      exact
      path={Routes.DocsChangelog.path}
      component={DocsChangelog}
    />

    {/* Our Admin Page */}
    <RouteWithSidebar
      exact
      path={Routes.Sidebar.path}
      component={Admin.Sidebar}
    />
    <RouteWithSidebar
      exact
      path={Routes.CreatingSidebar.path}
      component={Admin.CreatingSidebar}
    />
    <RouteWithSidebar
      exact
      path={Routes.Admission.path}
      component={Admin.Admission}
    />
    <RouteWithSidebar
      exact
      path={Routes.CreatingAdmission.path}
      component={Admin.CreatingAdmission}
    />
    <RouteWithSidebar exact path={Routes.About.path} component={Admin.About} />
    <RouteWithSidebar
      exact
      path={Routes.CreatingAbout.path}
      component={Admin.CreatingAbout}
    />
    <RouteWithSidebar
      exact
      path={Routes.Banner.path}
      component={Admin.Banner}
    />
    <RouteWithSidebar
      exact
      path={Routes.CreatingBanner.path}
      component={Admin.CreatingBanner}
    />
    <RouteWithSidebar
      exact
      path={Routes.Campus.path}
      component={Admin.Campus}
    />
    <RouteWithSidebar
      exact
      path={Routes.Concern.path}
      component={Admin.Concern}
    />
    <RouteWithSidebar
      exact
      path={Routes.CreatingConcern.path}
      component={Admin.CreatingConcern}
    />
    <RouteWithSidebar
      exact
      path={Routes.Footer.path}
      component={Admin.Footer}
    />
    <RouteWithSidebar exact path={Routes.Skill.path} component={Admin.Skill} />
    <RouteWithSidebar
      exact
      path={Routes.Testimonial.path}
      component={Admin.Testimonial}
    />
    <RouteWithSidebar
      exact
      path={Routes.CreatingTestimonial.path}
      component={Admin.CreatingTestimonial}
    />
    <RouteWithSidebar
      exact
      path={Routes.User.path}
      component={Admin.User}
    />
    <RouteWithSidebar
      exact
      path={Routes.CreatingUser.path}
      component={Admin.CreatingUser}
    />
    <RouteWithSidebar
      exact
      path={Routes.UpdateUser.path}
      component={Admin.UpdateUser}
    />
    <RouteWithSidebar
      exact
      path={Routes.UpdateProfile.path}
      component={Admin.UpdateProfile}
    />
    <RouteWithSidebar
      exact
      path={Routes.ChangePassword.path}
      component={Admin.ChangePassword}
    />
    <Redirect to={Routes.NotFound.path} />
  </Switch>
);
