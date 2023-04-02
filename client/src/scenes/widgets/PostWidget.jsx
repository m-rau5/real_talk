import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  Typography,
  useTheme,
  InputBase,
  Button,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";
const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  pic,
  userPic,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const postIsLiked = Boolean(likes[loggedInUserId]); //if any likes present
  const likesAmount = Object.keys(likes).length; //get the likes amount

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;
  const [value, setValue] = useState("");

  //update like number
  const updateLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPic={userPic}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {pic && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:3001/assets/${pic}`}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={updateLike}>
              {postIsLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likesAmount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>
      </FlexBetween>
      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <FlexBetween gap="1.5rem">
            <InputBase
              size="small"
              placeholder="Comment on this post..."
              onChange={(e) => {
                setValue(e.target.value);
              }}
              value={value}
              sx={{
                width: "70%",
                backgroundColor: palette.neutral.light,
                borderRadius: "2rem",
                m: "0.5rem",
                padding: "0.2rem 1rem 0rem 1rem",
              }}
            />
            <Button
              onClick={() => {
                setValue("");
              }}
              sx={{
                color: palette.background.alt,
                backgroundColor: palette.primary.main,
                borderRadius: "3rem",
              }}
            >
              Post
            </Button>
          </FlexBetween>
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
