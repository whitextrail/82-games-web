import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@material-ui/core';
import { primaryColor } from '../../../styles/constants';

const styles = {
  dialogTitle: {
    backgroundColor: primaryColor,
    color: '#FFF',
  },
  dialogContent: {
    marginTop: 10,
    padding: 25,
  },
  dialogActions: {
    paddingBottom: 10,
  },
};

export default class ReusableDialog extends PureComponent {
  static propTypes = {
    maxWidth: PropTypes.string,
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
  }

  static defaultProps = {
    maxWidth: 'sm',
  }

  static Title = ({ children }) => (
    <DialogTitle disableTypography style={styles.dialogTitle}>
      { children }
    </DialogTitle>
  )

  static Content = ({ children }) => (
    <DialogContent style={styles.dialogContent}>
      <Grid container spacing={4}>
        { React.Children.map(children, child => (
          <Grid item xs={12} key={`dialog-content-child-${child.props.id}`}>
            { child }
          </Grid>
        )) }
      </Grid>
    </DialogContent>
  )

  static Actions = ({ children }) => (
    <DialogActions style={styles.dialogActions}>
      { children }
    </DialogActions>
  )

  static CancelAction = ({ text, onClick, dataTestId }) => (
    <Button onClick={onClick} data-testid={dataTestId} color="secondary" variant="contained">{text}</Button>
  )

  static ConfirmAction = ({ text, onClick, dataTestId }) => (
    <Button onClick={onClick} data-testid={dataTestId} color="primary" variant="contained" style={{ marginLeft: 10 }}>
      {text}
    </Button>
  )

  render = () => (
    <Dialog open fullWidth maxWidth={this.props.maxWidth}>
      { this.props.children }
    </Dialog>
  )
}
