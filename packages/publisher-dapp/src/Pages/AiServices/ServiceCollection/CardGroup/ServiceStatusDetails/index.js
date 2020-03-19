import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import SNETButton from "shared/dist/components/SNETButton";
import AlertBox, { alertTypes } from "shared/dist/components/AlertBox";
import Revenue from "./Revenue";
import Usage from "./Usage";
import Pricing from "./Pricing";
import Changelog from "./Changelog";
import { useStyles } from "./styles";
import { ConfigurationServiceRequest } from "../../../../../Utils/Daemon/ConfigurationService";
import { aiServiceDetailsActions } from "../../../../../Services/Redux/actionCreators";
import { checkIfKnownError } from "shared/dist/utils/error";

const selectState = state => ({ serviceDetails: state.aiServiceList });

const ServiceStatusDetails = props => {
  const { classes, status, groups, editServiceLink, serviceUuid } = props;
  const [activeTab] = useState(2);
  const [alert, setAlert] = useState({});
  const { serviceDetails } = useSelector(selectState);
  let DaemonConfigvalidateAlert = {};
  const dispatch = useDispatch();
  const tabs = [
    { name: "Revenue", activeIndex: 0, component: <Revenue /> },
    { name: "Usage", activeIndex: 1, component: <Usage /> },
    { name: "Pricing", activeIndex: 2, component: <Pricing groups={groups} /> },
    { name: "Changelog", activeIndex: 3, component: <Changelog /> },
  ];

  const configValidation = [
    ["blockchain_enabled", "true"],
    ["ipfs_end_point", "http://ipfs.singularitynet.io:80"],
    ["blockchain_network_selected", "main"],
    ["passthrough_enabled", "true"],
    ["organization_id", "sohit1"],
    ["service_id", "sohit1"],
    ["daemon_end_point", "0.0.0.0:8083"],
    ["passthrough_endpoint", "http://localhost:7003"],
  ];

  const activeComponent = tabs.find(el => el.activeIndex === activeTab);

  // TODO use the appropriate endpoint of the service's daemon
  const validateDaemonConfig = async () => {
    try {
      const serviceEndpoint = "https://example-service-a.singularitynet.io:8083";
      const configurationServiceRequest = new ConfigurationServiceRequest(serviceEndpoint);
      const res = await configurationServiceRequest.getConfiguration();
      res.currentConfigurationMap.forEach(element => {
        configValidation.forEach(element1 => {
          if (element[0] === element1[0]) {
            if (element[1] !== element1[1]) {
              DaemonConfigvalidateAlert = {
                type: alertTypes.ERROR,
                message: element1[0] + " should be " + element1[1],
              };
              setAlert(DaemonConfigvalidateAlert);
            }
          }
        });
      });
      if (DaemonConfigvalidateAlert) {
        const result = serviceDetails.data.filter(({ uuid }) => serviceUuid === uuid);
        if (!result[0]) {
          await dispatch(aiServiceDetailsActions.saveServiceDetails(result[0].orgUuid, serviceUuid, result[0], true));
        } else {
          throw new Error("Unable to Validate , Please try later");
        }
      }
    } catch (error) {
      if (checkIfKnownError(error)) {
        return setAlert({ type: alertTypes.ERROR, message: "something went wrong" });
      }
    }
  };
  return (
    <div className={classes.serviceStatusDetailsMainContainer}>
      <div>
        <div className={classes.statusDetails}>
          <Typography className={classes.property}>status</Typography>
          <Typography className={classes.value}>{status}</Typography>
        </div>
        <div className={classes.tabsContainer}>
          <AppBar position="static" className={classes.tabsHeader}>
            <Tabs value={activeTab}>
              {tabs.map(value => (
                <Tab key={value.name} label={value.name} />
              ))}
            </Tabs>
          </AppBar>
          {activeComponent && activeComponent.component}
        </div>
      </div>
      <div className={classes.serviceStatusActions}>
        <Link to={editServiceLink}>
          <SNETButton children="edit" color="primary" variant="contained" />
        </Link>
        {props.status === "PUBLISHED" ? (
          <div className={classes.configValidButton}>
            <SNETButton children="pause service" color="primary" variant="contained" />
            <SNETButton children="validate daemon" color="primary" variant="contained" onClick={validateDaemonConfig} />
          </div>
        ) : null}
      </div>
      <br />
      <div>
        <AlertBox type={alert.type} message={alert.message} />
      </div>
    </div>
  );
};
export default withStyles(useStyles)(ServiceStatusDetails);
