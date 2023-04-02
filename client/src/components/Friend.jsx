import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import { useEffect } from "react";

const Friend = ({ friendId, name, subtitle, userPic }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friendsList);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  //   const test = () => {
  //     if (_id === "63a4879c6a73c8736c76e8cd") {
  //       console.log(`${friendId} \n ${friends}`);
  //     }
  //   };

  const updateFriend = async () => {
    if (friendId !== _id) {
      const response = await fetch(
        `http://localhost:3001/users/${_id}/${friendId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      dispatch(setFriends({ friends: data }));
    }
  };
  const isFriend = friends.find((friend) => friend._id === friendId);
  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPic} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0); //refresh page after going to friend page
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      <IconButton
        onClick={() => updateFriend()}
        sx={
          friendId !== _id
            ? { backgroundColor: primaryLight, p: "0.6rem" }
            : {
                backgroundColor: primaryLight,
                p: "0.6rem",
                display: { sm: "none" },
              }
        }
      >
        {isFriend ? (
          <PersonRemoveOutlined sx={{ color: primaryDark }} />
        ) : (
          <PersonAddOutlined sx={{ color: primaryDark }} />
        )}
      </IconButton>
    </FlexBetween>
  );
};

export default Friend;
