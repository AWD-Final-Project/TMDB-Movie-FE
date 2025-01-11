import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Modal,
  Button,
  TextField,
  Divider,
} from "@mui/material";
import axiosClient from "../configs/axios";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import FavoriteList from "../components/profile/FavoriteList";
import WatchList from "../components/profile/WatchList";
import RatingList from "../components/profile/RatingList";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

const Profile = () => {
  const [profile, setProfile] = useState<{
    email: string;
    username: string;
    fullname: string;
    address: string;
  } | null>(null);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(true);
  const [isResetModalOpen, setResetModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosClient.get("/user/profile");
        setProfile(response.data.data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleVerify = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);
      await axiosClient.post("/verify/confirm-reset-pass-otp", {
        email: profile?.email,
        otp: otp,
      });
      setIsVerified(true);
    } catch (error) {
      console.error("Failed to verify OTP:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);
      await axiosClient.post("/verify/reset-password", {
        email: profile?.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });
      setResetModal(false);
      navigate("/login");
    } catch (error) {
      console.error("Failed to reset password:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center">
        <CircularProgress />;
      </div>
    );

  return (
    <Container>
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>
          Profile
        </Typography>
        {profile ? (
          <div>
            <Typography variant="h6">Email: {profile.email}</Typography>
            <Typography variant="h6">Username: {profile.username}</Typography>
            <Modal
              open={isResetModalOpen}
              onClose={() => setResetModal(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                {isVerified ? (
                  <>
                    <Typography
                      variant="h4"
                      className="text-3xl"
                      align="center"
                      gutterBottom
                    >
                      Enter new password
                    </Typography>
                    <form onSubmit={handleReset}>
                      <Box mb={2}>
                        <TextField
                          label="Password"
                          variant="outlined"
                          fullWidth
                          name="password"
                          value={formData.password}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              password: e.target.value,
                            })
                          }
                          required
                        />
                      </Box>
                      <Box mb={2}>
                        <TextField
                          label="Confirm Password"
                          variant="outlined"
                          fullWidth
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              confirmPassword: e.target.value,
                            });
                          }}
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
                        {loading ? <ClipLoader color="white" /> : "Reset"}
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
                )}
              </Box>
            </Modal>
            <Button
              variant="contained"
              className="mt-4"
              onClick={() => {
                axiosClient.post("/verify/send-reset-pass-email", {
                  email: profile?.email,
                });
                setResetModal(true);
              }}
            >
              Reset password
            </Button>
            <Divider className="mt-4" />
            <FavoriteList />
            <Divider />
            <WatchList />
            <Divider />
            <RatingList />
          </div>
        ) : (
          <Typography color="error">Failed to load profile.</Typography>
        )}
      </Box>
    </Container>
  );
};

export default Profile;
