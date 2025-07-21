
import * as React from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Snackbar, Button, TextField, Box, Typography, Paper, useMediaQuery, CircularProgress } from '@mui/material';
import { styled, useTheme, createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';


const defaultTheme = createTheme({
  palette: {
    primary: { main: '#f9881fff' },
    secondary: { main: '#22223B' },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
});

const GlassCard = styled(Paper)(({ theme }) => ({
  background: 'rgba(253, 253, 253, 0.85)',
  borderRadius: 24,
  boxShadow: '0 8px 32px 0 rgba(31,38,135,0.15)',
  padding: theme.spacing(3, 2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  maxWidth: 400,
  margin: 'auto',
  [theme.breakpoints.down('sm')]: {
    maxWidth: '95vw',
    padding: theme.spacing(2, 1),
  },
}));

export default function Authentication() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [error, setError] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [formState, setFormState] = React.useState(0); // 0: login, 1: register
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { handleRegister, handleLogin } = React.useContext(AuthContext);

  const handleAuth = async () => {
    setLoading(true);
    setError("");
    try {
      if (formState === 0) {
        await handleLogin(username, password);
      }
      if (formState === 1) {
        let result = await handleRegister(name, username, password);
        setUsername("");
        setMessage(result);
        setOpen(true);
        setError("");
        setFormState(0);
        setPassword("");
      }
    } catch (err) {
      let message = err?.response?.data?.message || "Something went wrong";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          minHeight: '100vh',
          width: '100vw',
          background: `linear-gradient(120deg, #985935ff 0%, #29293B 100%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: `url(/logo3.png) no-repeat right bottom/contain`,
            opacity: 0.08,
            zIndex: 0,
          }}
        />
        <GlassCard elevation={8}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
            <Box sx={{
              background: 'linear-gradient(135deg, #FF9839 60%, #22223B 100%)',
              borderRadius: '50%',
              width: 64,
              height: 64,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 1,
              boxShadow: '0 4px 16px 0 rgba(31,38,135,0.10)'
            }}>
              <LockOutlinedIcon sx={{ color: '#fff', fontSize: 36 }} />
            </Box>
            <Typography variant="h5" fontWeight={700} color="secondary.main" gutterBottom>
              {formState === 0 ? 'Sign In to Videocall' : 'Create your account'}
            </Typography>
          </Box>
          <Box component="form" noValidate sx={{ width: '100%' }}>
            {formState === 1 && (
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Full Name"
                name="name"
                value={name}
                autoFocus
                onChange={(e) => setName(e.target.value)}
                sx={{ mb: 2 }}
              />
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              value={username}
              autoFocus={formState === 0}
              onChange={(e) => setUsername(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              sx={{ mb: 2 }}
            />
            {error && <Typography color="error" sx={{ mb: 1 }}>{error}</Typography>}
            <Button
              type="button"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 1, mb: 2, borderRadius: 2, fontWeight: 600, fontSize: '1.1rem', letterSpacing: 1 }}
              onClick={handleAuth}
              disabled={loading}
              endIcon={loading && <CircularProgress size={20} color="inherit" />}
            >
              {formState === 0 ? "Login" : "Register"}
            </Button>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <Button
                variant={formState === 0 ? 'contained' : 'text'}
                color={formState === 0 ? 'primary' : 'secondary'}
                onClick={() => setFormState(0)}
                sx={{ borderRadius: 2, fontWeight: 500 }}
              >
                Sign In
              </Button>
              <Button
                variant={formState === 1 ? 'contained' : 'text'}
                color={formState === 1 ? 'primary' : 'secondary'}
                onClick={() => setFormState(1)}
                sx={{ borderRadius: 2, fontWeight: 500 }}
              >
                Sign Up
              </Button>
            </Box>
          </Box>
        </GlassCard>
        <Snackbar
          open={open}
          autoHideDuration={4000}
          message={message}
          onClose={() => setOpen(false)}
        />
      </Box>
    </ThemeProvider>
  );
}