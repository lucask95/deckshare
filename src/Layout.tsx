import {
  Container,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import Head from "next/head";
import React from "react";
import Link from "./Link";

interface Props {
  titleAddition?: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    body: {
      width: "100%",
      minHeight: "100vh",
      background: "linear-gradient(#4b79a1, #283e51)",
    },
    main: {
      flex: 1,
    },
    rootContainer: {
      backgroundColor: "white",
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
      [theme.breakpoints.up("sm")]: {
        width: theme.breakpoints.values.sm,
      },
      [theme.breakpoints.up("md")]: {
        width: theme.breakpoints.values.md,
      },
      [theme.breakpoints.up("lg")]: {
        width: theme.breakpoints.values.lg,
      },
    },
    footer: {
      borderTop: "2px solid black",
      padding: 20,
    },
  })
);

const Layout: React.FC<Props> = ({ titleAddition, children }) => {
  const classes = useStyles();

  return (
    <div className={classes.body}>
      <Head>
        <title>
          {`MTG Deck Builder${titleAddition ? " - " + titleAddition : ""}`}
        </title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Container className={classes.rootContainer}>
        <main className={classes.main}>{children}</main>

        <footer className={classes.footer}>
          <Typography variant='caption'>
            Website by{" "}
            <Link href='https://lucask95.github.io/'>Lucas Keller</Link>
          </Typography>
        </footer>
      </Container>
    </div>
  );
};

export default Layout;
