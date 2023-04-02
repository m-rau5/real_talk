import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import NavBar from "scenes/navBar";
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
//import { PostAdd } from "@mui/icons-material";
import PostsWidget from "scenes/widgets/PostsWidget";
//import Ad from "scenes/widgets/Ad";
import FriendsListWidget from "scenes/widgets/FriendsListWidget";

const HomePage = () => {
  const isNonMobileScreen = useMediaQuery("(min-width:1000px)");
  const { _id, pic } = useSelector((state) => state.user);

  return (
    <Box>
      <NavBar />
      <Box
        width="100%"
        padding="2rem 5%"
        display={isNonMobileScreen ? "flex" : "block"}
        gap="0.5rem"
        justifyContent={"space-between"}
      >
        <Box flexBasis={isNonMobileScreen ? "25%" : undefined}>
          <UserWidget userId={_id} pic={pic} />
        </Box>
        <Box
          flexBasis={isNonMobileScreen ? "45%" : undefined}
          mt={isNonMobileScreen ? undefined : "2rem"}
        >
          <MyPostWidget pic={pic} />
          <PostsWidget userId={_id} />
        </Box>
        {isNonMobileScreen && (
          <Box flexBasis="25%">
            {/*<Ad />*/}
            <FriendsListWidget userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
