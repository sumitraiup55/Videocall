
import React, { useContext, useState } from 'react';
import withAuth from '../utils/withAuth';
import { useNavigate } from 'react-router-dom';
import { Button, IconButton, TextField, Box, Typography, Paper } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import { AuthContext } from '../contexts/AuthContext';

function HomeComponent() {
  let navigate = useNavigate();
  const [meetingCode, setMeetingCode] = useState("");
  const { addToUserHistory } = useContext(AuthContext);

  let handleJoinVideoCall = async () => {
    if (!meetingCode) return;
    await addToUserHistory(meetingCode);
    navigate(`/${meetingCode}`);
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      width: '100vw',
      background: 'linear-gradient(120deg, #FF9839 0%, #22223B 100%)',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1.5rem 2.5rem',
        background: 'rgba(34,34,59,0.15)',
        backdropFilter: 'blur(4px)',
      }}>
        <Typography variant="h4" fontWeight={700} letterSpacing={1}>LiveLink</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton onClick={() => navigate("/history")} sx={{ color: '#fff' }}>
            <RestoreIcon />
          </IconButton>
          <Typography>History</Typography>
          <Button onClick={() => {
            localStorage.removeItem("token");
            navigate("/auth");
          }} sx={{ color: '#fff', border: '1px solid #fff', borderRadius: 2, ml: 2 }}>
            Logout
          </Button>
        </Box>
      </Box>
      <Box sx={{
        flex: 1,
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        justifyContent: 'center',
        gap: { xs: 4, md: 10 },
        px: { xs: 2, md: 8 },
        py: { xs: 4, md: 0 },
      }}>
        <Paper elevation={8} sx={{
          background: 'rgba(255,255,255,0.90)',
          borderRadius: 4,
          p: { xs: 3, md: 5 },
          minWidth: 300,
          maxWidth: 400,
          mb: { xs: 4, md: 0 },
        }}>
          <Typography variant="h5" fontWeight={700} color="#22223B" mb={2}>
            Join a Video Call
          </Typography>
          <Typography color="#22223B" mb={3}>
            Enter your meeting code to join instantly.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              onChange={e => setMeetingCode(e.target.value)}
              id="outlined-basic"
              label="Meeting Code"
              variant="outlined"
              size="medium"
              sx={{ flex: 1, background: '#fff', borderRadius: 2 }}
            />
            <Button
              onClick={handleJoinVideoCall}
              variant='contained'
              size='large'
              sx={{
                background: 'linear-gradient(90deg, #FF9839 60%, #22223B 100%)',
                color: 'white',
                borderRadius: 2,
                fontWeight: 700,
                px: 3,
                boxShadow: '0 2px 8px 0 rgba(31,38,135,0.10)'
              }}
            >
              Join
            </Button>
          </Box>
        </Paper>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img srcSet='/logo3.png' alt="" style={{ width: '30vw', maxWidth: 350, borderRadius: 20, boxShadow: '0 4px 24px 0 rgba(31,38,135,0.10)' }} />
        </Box>
      </Box>
    </Box>
  );
}

export default withAuth(HomeComponent);