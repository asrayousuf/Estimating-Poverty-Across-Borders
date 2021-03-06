import React, { Component } from "react";
import { Route, 
  Switch, 
  // Redirect 
} from "react-router-dom";

import Header from "components/Header/Header";
//import Footer from "components/Footer/Footer";
import Sidebar from "components/Sidebar/Sidebar";


import dashboardRoutes from "routes/dashboard.jsx";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.state = {
      _notificationSystem: null
    };
  }
  componentDidMount() {
  }
  componentDidUpdate(e) {
    if (
      window.innerWidth < 993 &&
      e.history.location.pathname !== e.location.pathname &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
    }
    if (e.history.action === "PUSH") {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.mainPanel.scrollTop = 0;
    }
  }
  render() {
    return (
      <div className="wrapper">
       <Header {...this.props} />
          <Switch>
            {dashboardRoutes.map((prop, key) => {
              return (
                <Route path={prop.path} component={prop.component} key={key} />
              );
            })}
          </Switch>
       {/* <Footer /> */}
      </div>
    );
  }
}

export default Dashboard;
