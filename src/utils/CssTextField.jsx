import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/styles/withStyles';
import appColors from '../styles/AppColors';

const CssTextField = withStyles({
  root: {
    backgroundColor: '#fcfcfb',
    // marginTop: '10px',
    // display: 'flex',
    // alignItems: 'center',
    '& label.Mui-focused': {
      border: '3px solid' + appColors.secondary,
      color: appColors.secondary,
    },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        border: '3px solid' + appColors.secondary,
      },
    },
    '&:hover': {
      backgroundColor: '#fff',
    },
    '&focused': {
      backgroundColor: '#fff',
    },
  },
})(TextField);

export default CssTextField;
