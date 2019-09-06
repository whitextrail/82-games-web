import React, { memo } from 'react';
import {
  Grid,
  Card,
  CardContent,
} from '@material-ui/core';
import {
  // primaryColor,
  // primaryTextColor,
} from '../../../../styles/constants';

const styles = {
  container: {
    height: '100%',
    paddingTop: 7.5,
    paddingRight: 7.5,
    paddingLeft: 7.5,
  },
  card: {
    borderRadius: 3,
    width: '100%',
  },
  cardContent: {
    height: 240,
    padding: 0,
  },
};

const AccountProfile = memo(() => {
  return (
    <Grid item xs={12} style={styles.container}>
      <Card style={styles.card}>
        <CardContent style={styles.cardContent}>

        </CardContent>
      </Card>
    </Grid>
  );
});

export default AccountProfile;
