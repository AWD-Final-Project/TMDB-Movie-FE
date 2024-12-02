import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Alert,
  Link,
} from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import axiosClient from "../configs/axios";
import { ClipLoader } from "react-spinners";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      const response = await axiosClient.post("/user/login", formData);
      login(response.data.accessToken);
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Container maxWidth="sm" className="pt-16">
      <Typography variant="h4" className="text-3xl" align="center" gutterBottom>
        Login to your account
      </Typography>
      <form onSubmit={handleLogin}>
        <Box mb={2}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={formData.email}
            onChange={handleChange}
            required
            name="email"
            type="email"
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            value={formData.password}
            onChange={handleChange}
            required
            name="password"
            type="password"
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="h-10"
          fullWidth
        >
          {loading ? <ClipLoader color="white" /> : "Login"}
        </Button>
      </form>
      <Link href={import.meta.env.VITE_API_URL + "user/google/auth"}>
        <Button variant="outlined" className="mt-4 h-10" fullWidth>
          Log in with Google
        </Button>
      </Link>
      {error && (
        <Alert severity="error" style={{ marginTop: "20px" }}>
          {error}
        </Alert>
      )}
    </Container>
  );
};

export default Login;
