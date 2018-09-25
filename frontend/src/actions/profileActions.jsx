import axios from "axios";

// Create Profile
export const postProfile = profileData => {
  axios.post("/api/profile", profileData).then(function(response) {
    console.log(response);
  });
};

// Get current profile
export const getProfile = () => {
  axios.get("/api/profile").then(function(response) {
    console.log(response);
  });
};
