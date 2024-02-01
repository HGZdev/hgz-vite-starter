import styled from "styled-components";

const AvatarContainer = styled("div")`
  position: relative;
`;

const Avatar = styled("img")`
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.5));
`;

const FancyAvatar = () => {
  return (
    <AvatarContainer>
      <Avatar
        // alt="Favicon"
        src="/../assets/favicon.ico"
        // sx={{width: 250, height: 250}}
      />
    </AvatarContainer>
  );
};

export default FancyAvatar;
