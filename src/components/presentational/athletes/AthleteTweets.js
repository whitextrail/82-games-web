import React, {
  memo,
  Fragment,
} from 'react';
import {
  Grid,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Card,
  CardHeader,
  CircularProgress,
  Paper,
} from '@material-ui/core';
import { LinkSharp } from '@material-ui/icons';
import moment from 'moment-timezone';
import { Link } from 'react-router-dom';
import twitter from '../../../assets/svg/twitter.svg';
import { primaryColor } from '../../../styles/constants';

const styles = {
  container: {
    height: 390,
    maxHeight: 390,
  },
  list: {
    width: '100%',
    maxHeight: '100%',
    overflow: 'auto',
    backgroundColor: '#FFF',
    paddingLeft: 8,
    paddingRight: 8,
  },
  text: {
    fontSize: 12,
  },
  link: {
    textDecoration: 'none',
  },
  cardHeader: {
    height: 50,
    maxHeight: 50,
    width: '100%',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: primaryColor,
  },
};

const formatDateTime = (dateTime) => {
  const ms = moment().diff(dateTime);

  console.log('ms', ms);

  switch(ms) {
    case ms < 60000:
      return moment().diff(dateTime, 'seconds', true);
    case ms < 360000:
      return moment().diff(dateTime, 'minutes', true);
    case ms < 8640000:
      return moment().diff(dateTime, 'hours', true);
    default:
      return moment().diff(dateTime, 'days', true);
  };
};

const AthleteTweets = memo(({
  twitterHandle,
  allTweetIds,
  byTweetId,
}) => (
  <Grid container justify="center" alignItems="center" style={styles.container}>
    <Card raised component={Grid} container alignItems="center" direction="column" item xs={11} style={{ height: 350 }}>
      <Paper component={Grid} container justify="center" alignItems="center" item xs={12} style={styles.cardHeader}>
        <a href={`https://twitter.com/${twitterHandle}`} target="_blank" rel="noopener noreferrer" style={styles.link}>
          <Typography variant="body2" color="secondary"  style={{ fontSize: '#FFF' }}>@{twitterHandle}</Typography>
        </a>
        <img src={twitter} alt="Twitter Logo" style={{ marginLeft: 10, height: 20 }} />
      </Paper>
      {
        allTweetIds.length
          ? (
              <List style={styles.list} disablePadding>
                {
                  allTweetIds.map((tweetId) => {
                    const {
                      id,
                      text,
                      dateTime,
                      userFullname,
                      userProfileImageUrl,
                    } = byTweetId[tweetId];

                    return (
                      <ListItem key={id} disableGutters style={{ paddingTop: 4, paddingBottom: 4 }}>
                        <Card raised>
                          <CardHeader
                            avatar={(
                              <Avatar alt={userFullname} src={userProfileImageUrl} />
                            )}
                            title={userFullname}
                            subheader={formatDateTime(dateTime)}
                          />
                          <ListItemText
                            secondary={(
                              <Typography
                                component="span"
                                variant="body2"
                                style={styles.text}
                              >
                                {text}
                              </Typography>
                            )}
                          />
                        </Card>
                      </ListItem>
                    );
                  })
                }
              </List>
          )
          : <CircularProgress />
        }
      </Card>
    </Grid>
));

export default AthleteTweets;
