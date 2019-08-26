import React, { memo } from 'react';
import { Grid } from '@material-ui/core';

const styles = {
  footer: {
    maxWidth: 300,
  },
}

const Footer = memo(() => <Grid container component="footer" style={styles.body}></Grid>);

export default Footer;
