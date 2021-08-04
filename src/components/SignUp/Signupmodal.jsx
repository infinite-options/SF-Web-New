import React from 'react';
// import axios from 'axios';
import { Box } from '@material-ui/core';
// import { withRouter } from 'react-router';
// import Paper from '@material-ui/core/Paper';
import CssTextField from '../../utils/CssTextField';
// import appColors from '../../styles/AppColors';
// import SocialLogin from '../LogIn/SocialLogin';
// import { useHistory } from 'react-router-dom';
// import { useState } from 'react';


const Signupmodal=()=>{
return(
<>
            <Box display="flex" mb={1}>
              <CssTextField
                // value={this.state.firstName}
                // onChange={this._firstNameChange}
                label="First Name"
                variant="outlined"
                size="small"
                fullWidth
              />
              <Box m={0.5} />
              <CssTextField
                // value={this.state.lastName}
                // onChange={this._lastNameChange}
                label="Last Name"
                variant="outlined"
                size="small"
                fullWidth
              />
            </Box>
            <Box mb={1}>
              <CssTextField
                // value={this.state.phone}
                // onChange={this._phoneChange}
                label="Phone"
                variant="outlined"
                size="small"
                fullWidth
              />
            </Box>
            <Box mb={1}>
              <CssTextField
                // value={this.state.address}
                // onChange={this._addressChange}
                label="Address"
                variant="outlined"
                size="small"
                fullWidth
              />
            </Box>
            <Box display="flex" mb={1}>
              <CssTextField
                // value={this.state.unit}
                // onChange={this._unitChange}
                label="Unit"
                variant="outlined"
                size="small"
                fullWidth
              />
              <Box m={0.5} />
              <CssTextField
                // value={this.state.city}
                // onChange={this._cityChange}
                label="City"
                variant="outlined"
                size="small"
                fullWidth
              />
              <Box m={0.5} />
              <CssTextField
                // value={this.state.state}
                // onChange={this._stateChange}
                label="State"
                variant="outlined"
                size="small"
                fullWidth
              />
            </Box>
            <CssTextField
              //   value={this.state.zip}
              //   onChange={this._zipChange}
              label="Zip code"
              variant="outlined"
              size="small"
              fullWidth
            />
            <br />
            <br />
          </>

)

}

export default Signupmodal;