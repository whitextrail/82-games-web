import React, { memo } from 'react';
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  Fab,
  Button,
  Card,
  List,
  ListItem,
  ListSubheader,
} from '@material-ui/core';
import {
  EqualizerSharp,
  HistorySharp,
} from '@material-ui/icons';
import avatar from '../../../../assets/img/avatar.png';
import background from '../../../../assets/img/background.png';
import trophy from '../../../../assets/svg/trophy.svg';
import * as svg from '../../../../assets/svg/index';
import { primaryColor } from '../../../../styles/constants';

const styles = {
  container: {
    height: '100%',
    paddingTop: 2,
    backgroundImage: `url(${background})`,
  },
  paper: {
    height: '100%',
    paddingTop: 25,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  avatar: {
    height: 125,
    width: 125,
  },
  list: {
    width: '100%',
    position: 'relative',
    overflow: 'auto',
    height: '100%',
    paddingRight: 7.5,
    paddingLeft: 7.5,
  },
  listItem: {
    paddingTop: 0,
    paddingBottom: 10,
  },
  card: {
    borderRadius: 3,
    width: '100%',
    height: 85,
    padding: 0,
    backgroundColor: 'rgba(255,255,255,0.8)'
  },
};

const GameListItem = ({
  game,
  // season,
  points,
  steals,
  rebounds,
  trophies,
  numberTrophies,
  teamOne,
  teamTwo,
}) => (
  <ListItem disableGutters style={styles.listItem}>
    <Card style={styles.card}>
      <Grid container justify="center" alignItems="center">
        <Grid container justify="center" alignItems="center" direction="column" style={{ width: '40%' }}>
          <Grid container justify="center" alignItems="center" style={{ height: 40, marginBottom: 3 }}>
            <img height={40} width={40} srcSet={svg[teamOne]} alt="trophy_icon" />
            <Typography style={{ fontSize: 12, marginLeft: 2, marginRight: 2 }}>({game})</Typography>
            <img height={40} width={40} srcSet={svg[teamTwo]} alt="trophy_icon" />
          </Grid>
        </Grid>
        <Grid container justify="center" alignItems="center" style={{ width: '30%' }}>
          <Grid container justify="center" alignItems="center" direction="column" style={{ width: '33%' }}>
            <Typography style={{ fontSize: 22, fontWeight: 600, color: '#4cbb17' }}>{points}</Typography>
            <Typography style={{ fontSize: 12 }}>PTS</Typography>
            {/* <StarSharp style={{ fontSize: 18, color: '#4cbb17' }}  /> */}
          </Grid>
          <Grid container justify="center" alignItems="center" direction="column" style={{ width: '33%' }}>
            <Typography style={{ fontSize: 22, fontWeight: 600, color: primaryColor }}>{steals}</Typography>
            <Typography style={{ fontSize: 12 }}>STL</Typography>
          </Grid>
          <Grid container justify="center" alignItems="center" direction="column" style={{ width: '33%' }}>
            <Typography style={{ fontSize: 22, fontWeight: 600 , color: '#0060ff' }}>{rebounds}</Typography>
            <Typography style={{ fontSize: 12 }}>RBD</Typography>
          </Grid>
        </Grid>
        <Grid container justify="center" alignItems="center" direction="column" style={{ width: '30%' }}>
          <Grid container justify="center" alignItems="center" style={{ height: 33 }}>
            {
              numberTrophies.map((value, key) => (
                <img key={key} srcSet={trophy} alt="trophy_icon" />
              ))
            }
          </Grid>
          <Typography style={{ fontSize: 12 }}>{trophies}/1,000</Typography>
        </Grid>
      </Grid>
    </Card>
  </ListItem>
);

const AccountProfile = memo(() => {
  return (
    <Grid item xs={12} style={styles.container}>
      <Paper square style={styles.paper}>
        <Grid container justify="center" alignItems="center" style={{ height: '40%' }}>
          <Grid container alignItems="center" direction="column" style={{ height: 265 }}>
            <Grid container justify="center" alignItems="center" style={{ height: 125 }}>
              <Fab variant="round" style={{ backgroundColor: '#FFF', width: 130, height: 130 }}>
                <Avatar src={avatar} style={styles.avatar} />
              </Fab>
            </Grid>
            <Grid container alignItems="center" style={{ marginTop: 10, height: 40 }} direction="column">
              <Typography variant="body1" style={{ color: '#FFF', fontWeight: 600 }}>kphed</Typography>
              <Typography variant="body2" style={{ color: '#FFF' }}>Pro</Typography>
            </Grid>
            <Grid container justify="center" alignItems="center" style={{ marginTop: 5, height: 100 }}>
              <Button variant="contained" size="large" style={{ backgroundColor: 'white', width: 110, borderRadius: '30px', marginRight: 10 }}>
                <Typography variant="body1">#47</Typography>
                <EqualizerSharp style={{ marginLeft: 5, marginRight: -5, color: '#0060ff' }} />
              </Button>
              <Button variant="contained" size="large" style={{ backgroundColor: primaryColor, width: 110, borderRadius: '30px', }}>
                <Typography variant="body1" style={{ color: 'white' }}>7,331</Typography>
                <img style={{ marginLeft: 5, marginRight: -5 }} srcSet={trophy} alt="trophy_icon" />
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid container justify="center" alignItems="center" style={{ height: '60%', padding: '0px 10px 20px 10px' }}>
          <Grid container direction="column" style={{ backgroundColor: 'rgba(255,255,255,0.5)' }}>
            <Grid container justify="center" alignItems="center" style={{ height: '15%', backgroundColor: 'white' }}>
              <Paper square style={{ height: '100%', width: '100%', }}>
                <Grid container justify="center" alignItems="center">
                  <Typography variant="body1">Game History</Typography>
                  <HistorySharp style={{ color: '#333', marginLeft: 5 }} />
                </Grid>
              </Paper>
            </Grid>
            <Grid container justify="center" alignItems="center">
              <List disablePadding style={styles.list} subheader={<li />}>
                <ListSubheader disableSticky style={{ paddingBottom: 0 }}>S2018-2019</ListSubheader>
                <GameListItem
                  game="82"
                  season="S18-19"
                  points={10}
                  steals={0}
                  rebounds={2}
                  trophies={729}
                  numberTrophies={[0,1]}
                  teamOne="Brooklyn_1"
                  teamTwo="Milwaukee_28"
                />
                <GameListItem
                  game="81"
                  season="S18-19"
                  points={20}
                  steals={2}
                  rebounds={0}
                  trophies={242}
                  numberTrophies={[0]}
                  teamOne="Brooklyn_1"
                  teamTwo="Oklahoma_27"
                />
                <GameListItem
                  game="80"
                  season="S18-19"
                  points={6}
                  steals={2}
                  rebounds={1}
                  trophies={952}
                  numberTrophies={[0,1,2]}
                  teamOne="Brooklyn_1"
                  teamTwo="San_Antonio_24"
                />
                <GameListItem
                  game="79"
                  season="S18-19"
                  points={12}
                  steals={2}
                  rebounds={0}
                  trophies={200}
                  numberTrophies={[0]}
                  teamOne="Brooklyn_1"
                  teamTwo="Indiana_8"
                />
              </List>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
});

export default AccountProfile;
