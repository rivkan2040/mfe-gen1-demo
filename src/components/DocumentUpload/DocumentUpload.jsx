import React from 'react';
import ReactDOM from 'react-dom';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

const styles = (theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  scannerHost: {
    minHeight: 220,
    border: '1px dashed #ccc',
  },
});

// רכיב legacy שמחבר את Dynamic Web TWAIN (dwt) לסורק המסמכים הפיזי.
// ref מחרוזתי ו-findDOMNode הם דפוסים שה-migration צריך להחליף
// ב-createRef/useRef.
class DocumentUpload extends React.Component {
  componentDidMount() {
    const container = ReactDOM.findDOMNode(this.refs.scannerContainer);
    this.dwtInstance = window.Dynamsoft?.WebTwainEnv?.GetWebTwain(container?.id);
  }

  componentWillUnmount() {
    this.dwtInstance = null;
  }

  handleScan = () => {
    this.dwtInstance?.AcquireImage();
  };

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <div ref="scannerContainer" id="dwt-scanner-container" className={classes.scannerHost} />
        <Button variant="contained" color="primary" onClick={this.handleScan}>
          סרוק מסמך
        </Button>
      </Paper>
    );
  }
}

export default withStyles(styles)(DocumentUpload);
