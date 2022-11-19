import * as dayjs from 'dayjs';
import * as yup from 'yup';

import { Box, Button, Container, Drawer, Grid, Stack, TextField, Typography } from '@mui/material/';
import { alpha, styled } from '@mui/material/styles';

import DashboardIcon from '@mui/icons-material/Dashboard';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import MailIcon from '@mui/icons-material/Mail';
import NavigationSection from '../NavigationBar';
import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useStyles from './styles';
import { withStyles } from 'tss-react/mui';
import { yupResolver } from '@hookform/resolvers/yup';

let validationSchema = yup.object().shape({
  message: yup.string().required(),
  date: yup.string()
});

const NAV_WIDTH = 280;

const navConfig = [
  {
    title: 'dashboard',
    icon: <DashboardIcon />,
    path: '/dashboard'
  },
  {
    title: 'send message',
    icon: <MailIcon />,
    path: '/send-message'
  },
  {
    title: 'upload file',
    icon: <FileUploadIcon />,
    path: '/file-upload'
  }
];

const account = {
  displayName: 'S. Wageesha',
  role: 'Manager'
};

const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
  backgroundColor: '#f9fafb'
});

const Main = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '95vh',
  backgroundColor: '#f9fafb',
  paddingTop: 50,
  //   paddingBottom: theme.spacing(10),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2)
}));

const StyledAccount = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12)
}));

const CssTextField = withStyles(TextField, () => ({
  root: {
    '& .MuiInputLabel-root': {
      color: '#034d09'
    },
    '& .MuiTextField-root': {
      color: '#544f4f'
    },
    '& .MuiFormHelperText-root': {
      color: '#ff6161'
    },
    '& label.Mui-focused': {
      color: '#034d09'
    },
    '& .MuiInputBase-input': {
      color: '#544f4f'
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#034d09'
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#034d09'
      },
      '&:hover fieldset': {
        borderColor: '#35abe6'
      },
      '&.Mui-focused fieldset': {
        borderColor: '#35abe6'
      }
    }
  },
  input: {
    color: '#544f4f'
  }
}));

export const MessageSend = () => {
  const { classes } = useStyles();
  let navigate = useNavigate();
  var now = dayjs().format('MMMM D, YYYY h:mm A');
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const onSubmitHandler = (data) => {
    console.log({ data });

    axios
      .post('https://localhost:3000/api/v1/message/MessageSend', {
        sendBy: 'token',
        msgContent: data.message,
        sendDate: now
      })
      .then((response) => {
        console.log('response: ' + response);
        reset();
        navigate('/dashboard');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const renderContent = (
    <>
      <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
      </Box>

      <Box sx={{ mb: 3, mx: 2 }}>
        <StyledAccount>
          <Box>
            <Typography variant="subtitle2" sx={{ color: '#FFFFFF', fontWeight: '600' }}>
              {account.displayName}
            </Typography>

            <Typography variant="caption" sx={{ color: '#cd6afd', fontWeight: '600' }}>
              {account.role}
            </Typography>
          </Box>
        </StyledAccount>
      </Box>

      <NavigationSection data={navConfig} />

      <Box sx={{ flexGrow: 1 }} />

      {/* <Box sx={{ px: 2.5, pb: 3, mt: 10, textAlign: 'center' }}>
        <Typography
          align="center"
          variant="caption"
          marginTop={5}
          className={classes.copyrightText}>
          © Jikoo.com. All rights reserved.
        </Typography>
      </Box> */}
    </>
  );

  const onLogout = () => {
    console.log('test');
    navigate('/');
  };

  return (
    <StyledRoot>
      <Box
        component="nav"
        sx={{
          flexShrink: { lg: 0 },
          width: { lg: NAV_WIDTH }
        }}>
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: '#544f4f',
              borderRightStyle: 'dashed',
              borderColor: '#CCCCCC'
            }
          }}>
          {renderContent}
        </Drawer>
      </Box>
      <Main>
        <Container maxWidth="xl">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            marginBottom={4}>
            <Typography
              variant="h4"
              sx={{ fontSize: '1.5rem', fontWeight: '700', color: 'rgb(33, 43, 54)' }}>
              Send Message
            </Typography>
            <Button variant="contained" sx={{ fontWeight: '600' }} onClick={onLogout}>
              Logout
            </Button>
          </Stack>
          <Grid container spacing={3}>
            <Grid
              item
              xs={6}
              sx={{
                bgcolor: '#FFFFFF',
                padding: '20px',
                mt: 3,
                borderRadius: '5px',
                boxShadow: '1px 1px 5px #a8a8a8'
              }}>
              <form onSubmit={handleSubmit(onSubmitHandler)}>
                <Grid item xs={12}>
                  <CssTextField
                    fullWidth
                    {...register('date')}
                    disabled
                    name="date"
                    id="date"
                    label="Date"
                    defaultValue={now}
                    variant="outlined"
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <CssTextField
                    fullWidth
                    multiline
                    {...register('message')}
                    id="message"
                    name="message"
                    label="Message"
                    variant="outlined"
                    margin="normal"
                    rows={8}
                    helperText={errors.message?.message}
                  />
                </Grid>
                <Grid item xs={12} mt={3}>
                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    sx={{
                      backgroundColor: '#09547a',
                      padding: '10px',
                      fontWeight: '600',
                      '&:hover': { backgroundColor: '#35abe6' }
                    }}>
                    Submit
                  </Button>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </Container>
      </Main>
    </StyledRoot>
  );
};
