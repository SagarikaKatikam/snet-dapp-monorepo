"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useStyles = void 0;

var _styles = require("@material-ui/styles");

var useStyles = (0, _styles.makeStyles)(function (MUITheme) {
  return {
    forgotPwdMainContainer: {
      height: "calc(100vh - 126px)",
      backgroundColor: MUITheme.palette.background.mainContent
    },
    forgotPwdContent: {
      textAlign: "center",
      "& h2": {
        margin: 0,
        fontSize: "36px",
        color: MUITheme.palette.text.darkGrey
      },
      "& p": {
        margin: "17px 0 0",
        color: MUITheme.palette.text.darkGrey,
        fontSize: "22px"
      },
      "@media (max-width:527px)": {
        width: "75%",
        margin: "0 auto",
        flexBasis: "90%"
      }
    },
    forgotPwdForm: {
      boxSizing: "border-box",
      width: 410,
      padding: "40px 20px 30px",
      margin: "45px auto 0",
      boxShadow: "0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.14), 0 1px 3px 0 rgba(0,0,0,0.2)",
      "& button": {
        width: "100%"
      },
      "& p": {
        marginBottom: 10
      },
      "@media (max-width:527px)": {
        width: "100%"
      }
    },
    textField: {
      width: "100%",
      margin: "0 0 10px 0"
    }
  };
});
exports.useStyles = useStyles;