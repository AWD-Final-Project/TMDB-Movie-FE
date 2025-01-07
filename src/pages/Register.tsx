import {
  Alert,
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import axiosClient from "../configs/axios";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Basic validation
    if (!formData.username || !formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      await axiosClient.post("/user/register", formData);
      setSuccess(
        "User registered successfully. Please check your email for verification."
      );
      await axiosClient.post("/verify/send-activate-email", {
        email: formData.email,
      });
      setIsVerifying(true);
    } catch (err: any) {
      setError(err.response?.data?.message || "Error registering user");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);
      await axiosClient.post("/verify/confirm-activate-otp", {
        email: formData.email,
        otp: otp,
      });
      setIsVerifying(false);
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" className="pt-16">
      {isVerifying ? (
        <>
          <Typography
            variant="h4"
            className="text-3xl"
            align="center"
            gutterBottom
          >
            Enter verification code
          </Typography>
          <form onSubmit={handleVerify}>
            <Box mb={2}>
              <TextField
                label="OTP code"
                variant="outlined"
                fullWidth
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="h-10"
              fullWidth
            >
              {loading ? <ClipLoader color="white" /> : "Verify"}
            </Button>
          </form>
        </>
      ) : (
        <>
          <Typography
            variant="h4"
            className="text-3xl"
            align="center"
            gutterBottom
          >
            Register new account
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box mb={2}>
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </Box>
            <Box mb={2}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                type="email"
              />
            </Box>
            <Box mb={2}>
              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
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
              {loading ? <ClipLoader color="white" /> : "Register"}
            </Button>
          </form>
          {error && (
            <Alert severity="error" style={{ marginTop: "20px" }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" style={{ marginTop: "20px" }}>
              {success}
            </Alert>
          )}
        </>
      )}
    </Container>
  );
};

export default Register;
