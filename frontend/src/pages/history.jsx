import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card, Box, CardActions, CardContent, Button, Typography, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

export default function History() {
  const { getHistoryOfUser } = useContext(AuthContext);
  const [meetings, setMeetings] = useState([]);
  const routeTo = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const history = await getHistoryOfUser();
        setMeetings(history);
      } catch {
        // IMPLEMENT SNACKBAR
      }
    };
    fetchHistory();
  }, []);

  let formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      width: '100vw',
      background: 'linear-gradient(120deg, #FF9839 0%, #22223B 100%)',
      color: 'white',
      p: { xs: 1, md: 4 },
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 3,
      width: '100%',
      maxWidth: 600,
      mx: 'auto',
    }}>
      {meetings.length !== 0 ? meetings.map((e, i) => (
        <Card key={i} sx={{ width: '100%', borderRadius: 3, background: 'rgba(255,255,255,0.95)' }}>
          <CardContent>
            <Typography variant="h6" color="#22223B" fontWeight={700}>
              Meeting Code: {e.meeting_code}
            </Typography>
            <Typography color="#22223B" fontSize={{ xs: '1rem', md: '1.1rem' }}>
              Date: {formatDate(e.createdAt)}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => routeTo(`/${e.meeting_code}`)} sx={{ color: '#FF9839', fontWeight: 600 }}>Rejoin</Button>
          </CardActions>
        </Card>
      )) : (
        <Typography variant="h6" color="#fff" mt={4}>
          No meeting history found.
        </Typography>
      )}
    </Box>
  );
}

// ...existing code...
