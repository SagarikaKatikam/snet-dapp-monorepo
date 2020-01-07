export const useStyles = MUITheme => ({
  registrationHeaderContainerg: { backgroundColor: MUITheme.palette.text.offWhiteColor },
  loginHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexBasis: "100%",
    maxWidth: "71%",
    margin: "0 auto",
    padding: "30px 0",
    "& h1": {
      width: 230,
      margin: 0,
      "& span": {
        "&:before": { color: MUITheme.palette.text.purple },
      },
      "& img": { width: "100%" },
    },
    "& p": {
      margin: 0,
      color: MUITheme.palette.text.mediumShadeGray,
      fontSize: "16px",
    },
    "& span": {
      display: "inline-block",
      color: MUITheme.palette.text.primary,
      fontWeight: 600,
      textDecoration: "none",
    },
    "@media (max-width:750px)": { width: "75%" },
  },
  loginHeaderLink: {
    textAlign: "right",
    "& span": {
      color: MUITheme.palette.text.primary,
      fontSize: 16,
      fontWeight: 600,
      "&:hover": {
        cursor: "pointer",
        fontWeight: 600,
        textDecoration: "underline",
      },
    },
    "@media (max-width:750px)": {
      maxWidth: "100%",
      flexBasis: "100%",
      textAlign: "left",
    },
  },
});
