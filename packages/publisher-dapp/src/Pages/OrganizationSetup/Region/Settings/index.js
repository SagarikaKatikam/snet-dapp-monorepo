import React, { useRef, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Chip from "@material-ui/core/Chip";
import InfoIcon from "@material-ui/icons/Info";

import { useStyles } from "./styles";
import AdvanceSettings from "./AdvanceSettings";
import SNETButton from "shared/dist/components/SNETButton";
import SNETTextfield from "shared/dist/components/SNETTextfield";
import StyledDropdown from "shared/dist/components/StyledDropdown";
import { useDispatch } from "react-redux";
import { organizationActions } from "../../../../Services/Redux/actionCreators";
import { keyCodes } from "shared/dist/utils/keyCodes";

const Settings = ({ classes, groups, group, groupIndex, foundInBlockchain }) => {
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const [localEndpoints, setLocalEndpoints] = useState("");
  const dispatch = useDispatch();
  const etcdEndpointsRef = useRef(null);

  const { name, paymentAddress, paymentConfig } = group;

  const handlePaymentAddressChange = event => {
    const { value } = event.target;
    const updatedGroups = [...groups];
    updatedGroups[groupIndex] = { ...group, paymentAddress: value };
    dispatch(organizationActions.setGroups(updatedGroups));
  };

  const updateEndpointsInGroup = (groupsToBeUpdated, updatedEndpoints) => {
    groupsToBeUpdated[groupIndex] = {
      ...group,
      paymentConfig: {
        ...group.paymentConfig,
        paymentChannelStorageClient: {
          ...group.paymentConfig.paymentChannelStorageClient,
          endpoints: updatedEndpoints,
        },
      },
    };
    return groupsToBeUpdated;
  };

  const handleKeyEnterInTags = () => {
    const updatedEndpoints = [...group.paymentConfig.paymentChannelStorageClient.endpoints];
    const endpointsEntered = localEndpoints.split(",");
    let updatedGroups = [...groups];

    endpointsEntered.forEach(endpoint => {
      endpoint = endpoint.replace(/\s/g, "");
      if (!endpoint) return;
      const index = updatedEndpoints.findIndex(el => el === endpoint);

      if (index === -1) {
        updatedEndpoints.push(endpoint);
      }
      updatedGroups = updateEndpointsInGroup(updatedGroups, updatedEndpoints);
    });
    dispatch(organizationActions.setGroups(updatedGroups));
    etcdEndpointsRef.current.value = "";
  };

  const handleAddEndpoints = event => {
    if (event.keyCode !== keyCodes.enter) {
      return setLocalEndpoints(event.target.value);
    }
    event.preventDefault();
    event.stopPropagation();
    handleKeyEnterInTags();
  };

  const handleDeleteEndpoints = endpoint => {
    const updatedEndpoints = [...group.paymentConfig.paymentChannelStorageClient.endpoints];
    let updatedGroups = [...groups];
    const index = updatedEndpoints.findIndex(el => el === endpoint);

    updatedEndpoints.splice(index, 1);
    updatedGroups = updateEndpointsInGroup(updatedGroups, updatedEndpoints);
    dispatch(organizationActions.setGroups(updatedGroups));
  };

  return (
    <div className={classes.settingsContainer}>
      <div className={classes.dropDownBtn}>
        <StyledDropdown
          name="id"
          value={name}
          inputLabel="Groups / Region"
          labelTxt="Groups / Region"
          list={[{ value: name, label: name }]}
        />
      </div>
      <Typography variant="subtitle1">Groups / Region Settings</Typography>
      <div className={classes.grayBoxContainer}>
        <Grid container className={classes.grayBox}>
          <Grid item xs={12} sm={12} md={12} lg={12} className={classes.regionNameIdContainer}>
            <div>
              <Typography className={classes.header}>Region Name</Typography>
              <Typography className={classes.value}>{name}</Typography>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <SNETTextfield
              icon
              name="paymentAddress"
              value={paymentAddress}
              onChange={handlePaymentAddressChange}
              label="Payment Address"
              description={
                <p>
                  The ethereum address to which all payments will be processed for this group. See Payment Address
                  section{" "}
                  <a
                    href="http://dev.singularitynet.io/docs/ai-developers/organization-setup/"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    here{" "}
                  </a>
                  and creating ethereum identity{" "}
                  <a
                    href="http://dev.singularitynet.io/docs/ai-developers/ethereum-identity/"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    page
                  </a>
                </p>
              }
              disabled={foundInBlockchain}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <SNETTextfield
              icon
              name="id"
              label="ETCD Endpoint"
              description={
                <p>
                  Enter all the ETCD end points that will be used. Details{" "}
                  <a
                    href="http://dev.singularitynet.io/docs/ai-developers/etcd/"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    here
                  </a>
                </p>
              }
              onKeyUp={handleAddEndpoints}
              inputRef={etcdEndpointsRef}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} className={classes.cardContainer}>
            <div className={classes.infoIconContainer}>
              <InfoIcon />
            </div>
            <Card className={classes.card}>
              {paymentConfig.paymentChannelStorageClient.endpoints.map(endpoint => (
                <Chip
                  className={classes.chip}
                  key={endpoint}
                  label={endpoint}
                  color="primary"
                  onDelete={() => handleDeleteEndpoints(endpoint)}
                />
              ))}
            </Card>
          </Grid>
          <AdvanceSettings
            show={showAdvancedSettings}
            groups={groups}
            groupIndex={groupIndex}
            group={group}
            foundInBlockchain={foundInBlockchain}
          />
          <Grid item xs={12} sm={12} md={12} lg={12} className={classes.btnContainer}>
            <SNETButton
              children={showAdvancedSettings ? "hide advanced settings" : "show advanced setting"}
              variant="text"
              color="primary"
              onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default withStyles(useStyles)(Settings);
