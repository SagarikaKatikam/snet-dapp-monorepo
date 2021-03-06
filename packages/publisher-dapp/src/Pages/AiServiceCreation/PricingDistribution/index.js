import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";

import { useStyles } from "./styles";
import Region from "./Region";
import UploadProto from "./UploadProto";
import AdvancedFields from "./AdvancedFields";
import Actions from "./Actions";
import AlertBox, { alertTypes } from "shared/dist/components/AlertBox";
import { withStyles } from "@material-ui/styles";
import { aiServiceDetailsActions } from "../../../Services/Redux/actionCreators";

class PricingDistribution extends Component {
  state = {
    alert: { type: alertTypes.ERROR, message: "Lorem ipsum" },
  };

  componentDidMount = async () => {
    await this.props.getFreeCallSignerAddress();
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.pricingContainer}>
        <Grid item sx={12} sm={12} md={12} lg={12} className={classes.box}>
          <Typography variant="h6">Pricing distribution</Typography>
          <div className={classes.wrapper}>
            <Typography className={classes.description}>
              Lorem ipsum dolor sit amet, consectetur et mihi. Accusatores directam qui ut accusatoris. Communiter
              videbatur hominum vitam ut qui eiusdem fore accommodatior maximis vetere communitatemque.
            </Typography>
            <Region />
            <UploadProto />
            <AdvancedFields />
            <AlertBox type={alert.type} message={alert.message} />
          </div>
        </Grid>
        <Actions />
      </Grid>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getFreeCallSignerAddress: (orgId, groupId, serviceId) =>
    dispatch(aiServiceDetailsActions.getFreeCallSignerAddress(orgId, groupId, serviceId)),
});
export default connect(null, mapDispatchToProps)(withStyles(useStyles)(PricingDistribution));
