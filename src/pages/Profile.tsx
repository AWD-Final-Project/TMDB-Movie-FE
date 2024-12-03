import { useEffect, useState } from "react";
import { Container, Typography, Box, CircularProgress } from "@mui/material";
import axiosClient from "../configs/axios";

const Profile = () => {
  const [profile, setProfile] = useState<{
    email: string;
    username: string;
    fullname: string;
    address: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <CircularProgress />;

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>
          Profile
        </Typography>
        {profile ? (
          <div>
            <Typography variant="h6">Email: {profile.email}</Typography>
            <Typography variant="h6">Username: {profile.username}</Typography>
            <Typography variant="h6">Fullname: {profile.fullname}</Typography>
            <Typography variant="h6">Address: {profile.address}</Typography>
          </div>
        ) : (
          <Typography color="error">Failed to load profile.</Typography>
        )}
      </Box>
    </Container>
  );
};

export default Profile;
