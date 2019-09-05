import React, {
  PureComponent,
  Fragment,
} from 'react';
import { connect } from 'react-redux';
import { CssBaseline } from '@material-ui/core';
import { authenticateUser } from '../../state/actions';
import Header from '../presentational/Header';
import Body from '../presentational/Body';
import { checkSessionAsync } from '../../util/auth';

class App extends PureComponent {
  componentDidMount = () => (
    // Check for Auth0 user session
    checkSessionAsync()
      .then((result) => {
        const { email } = result.idTokenPayload;

        // Session exists, dispatch authenticateUser with credentials
        return this.props.authenticateUserAction({ email });
      })
      // Error checking for user session, ship them off to Auth0
      .catch((err) => {
        console.log(err);
        // TODO: Handle and report error
      })
  );

  render = () => {
    const { isOpen } = this.props.nav;

    return (
      <Fragment>
        <CssBaseline />
        <Header />
        <Body navMenuIsOpen={isOpen} />
      </Fragment>
    );
  }
};

const mapStateToProps = ({
  nav,
  teams,
  games,
  user,
}) => ({
  nav,
  teams,
  games,
  user,
});

export default connect(mapStateToProps, {
  authenticateUserAction: authenticateUser,
})(App);
