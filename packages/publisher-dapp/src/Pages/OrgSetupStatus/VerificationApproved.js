import React from "react";
import StatusBanner from "./StatusBanner";
import { useHistory } from "react-router-dom";
import { GlobalRoutes } from "../../GlobalRouter/Routes";
import { useSelector } from "react-redux";

import orgSetupApprovedImg from "shared/dist/assets/images/orgSetupApproved.png";

const VerificationApproved = () => {
  const { email, ownerEmail } = useSelector(state => ({
    email: state.user.email,
    ownerEmail: state.organization.owner,
  }));
  const history = useHistory();

  const handleOrgSetup = () => {
    history.push(GlobalRoutes.ORGANIZATION_SETUP.path);
  };

  const handleInviteSetup = () => {
    history.push(GlobalRoutes.INVITE_MEMBERS.path);
  };

  const shouldInviteMembersBeEnabled = () => email === ownerEmail;

  return (
    <StatusBanner
      title="Congratulations! Your organization entity is approved."
      img={orgSetupApprovedImg}
      description="Setup your company details and publish your organization entity to the blockchain.  After that you will be ready to create and publish your new services to the AI Marketplace.  You can also invite team members to help setup and manage your AI services more efficiently."
      actions={[
        { children: "organization setup", variant: "contained", color: "primary", onClick: handleOrgSetup },
        {
          children: "Invite Team",
          variant: "outlined",
          color: "primary",
          onClick: handleInviteSetup,
          disabled: !shouldInviteMembersBeEnabled(),
        },
      ]}
    />
  );
};

export default VerificationApproved;
