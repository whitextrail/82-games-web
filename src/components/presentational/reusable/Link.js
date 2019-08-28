import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const styles = {
  link: {
    color: 'inherit',
    textDecoration: 'none',
  },
};

const ReusableLink = React.memo(({
  to,
  children,
}) => <Link to={to} style={styles.link}>{children}</Link>);

ReusableLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default ReusableLink;
