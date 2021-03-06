import React from "react";
import Typography from "@material-ui/core/Typography";
import FolderIcon from "@material-ui/icons/Folder";
import PropTypes from "prop-types";

import SNETButton from "shared/dist/components/SNETButton";
import { useStyles } from "./styles";

const FileStats = props => {
  const { uploadSuccess, show } = props;
  const classes = useStyles();

  if (!show) {
    return null;
  }

  return (
    <div className={classes.imgUploaderContainer}>
      <div className={classes.uploadDetails}>
        <div className={uploadSuccess ? classes.successfullUpload : classes.uploadStatusContainer}>
          <FolderIcon />
          <Typography className={uploadSuccess ? classes.uploaded : classes.uploadStatus}>
            {uploadSuccess ? "Files Uploaded Successfully" : "No Files Uploaded"}
          </Typography>
        </div>
        <div>
          <Typography className={classes.title}>File Name:</Typography>
          <Typography className={classes.value} />
        </div>
        <div>
          <Typography className={classes.title}>Items:</Typography>
          <Typography className={classes.value} />
        </div>
        <div>
          <Typography className={classes.title}>Uploaded:</Typography>
          <Typography className={classes.value} />
        </div>
        <div>
          <Typography className={classes.title}>Size:</Typography>
          <Typography className={classes.value} />
        </div>
        <div>
          <Typography className={classes.title}>User:</Typography>
          <Typography className={classes.value} />
        </div>
        <div className={classes.uploadBtns}>
          <SNETButton children="download files" color="primary" variant="text" />
          <SNETButton children="delete files" color="red" variant="text" />
        </div>
      </div>
    </div>
  );
};

FileStats.prototypes = {
  show: PropTypes.bool,
  uploadSuccess: PropTypes.func,
};

export default FileStats;
