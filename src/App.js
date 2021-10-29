import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Zoom from '@material-ui/core/Zoom';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
// import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
import { addInfo, clearInfo } from './actions/infoAction';
import { useDispatch, useSelector } from 'react-redux';
import TableComponents from './components/TableComponents'
import Alert from '@material-ui/lab/Alert';


const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1),
  },
  '& .MuiTextField-root': {
    margin: theme.spacing(1),
    width: '25ch',
  },
  table: {
    width: 250,
  },

}));

function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default function BackToTop(props) {
  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();

  const [formData, setFormData] = React.useState({
    fName: "",
    lName: "",
    email: "",
    error: "",
    success: ""
  })

  const { fName, lName, email, error, success } = formData
  const dispatch = useDispatch()

  const infoList = useSelector((state) => state.info)

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = e => {
    e.preventDefault();

    if (!fName || !lName || !email) {
      setFormData({
        error: "Please fill the information",
        fName: "",
        lName: "",
        email: ""
      })
      // return false
    } else {

      dispatch(addInfo(fName, lName, email))
      setFormData({
        success: "User Added",
        fName: "",
        lName: "",
        email: "",
        error: ""
      })
    }

    setSpacing(2)

    setTimeout(() => {
      setFormData({
        success: "",
        fName: "",
        lName: "",
        email: "",
        error: ""
      })
    }, 3000);
  }

  const onClear = e => {
    e.preventDefault();
    dispatch(clearInfo())
    setFormData({
      success: "User List Cleared",
      fName: "",
      lName: "",
      email: "",
      error: ""
    })

    setTimeout(() => {
      setFormData({
        success: "",
        fName: "",
        lName: "",
        email: "",
        error: ""
      })
    }, 3000);
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar>
        <Toolbar>
          <Typography variant="h6">Tortalabz</Typography>
        </Toolbar>
      </AppBar>
      <Toolbar id="back-to-top-anchor" />
      <br />
      <Container>

        {error &&
          <Alert severity="error">{error}</Alert>
        }

        {success &&
          <Alert severity="success">{success}</Alert>
        }
        <br />
        <Box my={2}>
          <form className={classes.form} >
            <Grid item xs={12}>
              <Grid container justifyContent="center" spacing={spacing}>
                <Grid item>
                  <TextField
                    id="outlined-password-input"
                    label="Name"
                    type="text"
                    name="fName"
                    onChange={onChange}
                    value={fName}
                    variant="outlined"
                    required
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id="outlined-password-input"
                    label="LastName"
                    type="text"
                    name="lName"
                    onChange={onChange}
                    variant="outlined"
                    value={lName}
                    required
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id="outlined-password-input"
                    label="Email Id"
                    type="text"
                    name="email"
                    onChange={onChange}
                    variant="outlined"
                    value={email}
                    required
                  />
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Box>
        {/* <p className="text-white text-center">{JSON.stringify(formData)}</p> */}

        <Box my={2}>
          <center>
            <Grid item xs={12}>
              <Grid container justifyContent="center" spacing={spacing}>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={onSubmit}
                  >
                    Add
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={onClear}
                  >
                    Delete all data
                  </Button>
                </Grid>

              </Grid>
            </Grid>
          </center>
        </Box>

        <Box my={1}>
          <Grid item xs={12}>
            <Grid item>
              <TableComponents data={infoList} />
            </Grid>
          </Grid>
        </Box>
      </Container>

      <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  );
}
