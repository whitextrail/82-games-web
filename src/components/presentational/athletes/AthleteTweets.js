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
  Divider,
  Card,
  CircularProgress,
} from '@material-ui/core';

const styles = {
  card: {
    maxHeight: 400,
  },
  list: {
    width: '100%',
    maxHeight: '100%',
    overflow: 'auto',
    backgroundColor: '#FFF',
  },
  text: {
    display: 'inline',
  }
};

const AthleteTweets = memo(({
  allTweetIds,
  byTweetId,
}) => (
  allTweetIds.length
    ? (
      <Card raised component={Grid} item xs={11} style={styles.card}>
        <List style={styles.list}>
          {
            allTweetIds.map((tweetId) => {
              const {
                id,
                text,
                userHandle,
                userFullname,
                userProfileImageUrl,
              } = byTweetId[tweetId];

              return (
                <Fragment key={id}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt={userFullname} src={userProfileImageUrl} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={userHandle}
                      secondary={
                        <Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            style={styles.text}
                            color="textPrimary"
                          >
                            {userFullname}
                          </Typography>
                          {text}
                        </Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </Fragment>
              );
            })
          }
        </List>
      </Card>
    )
    : <CircularProgress />
));

export default AthleteTweets;
