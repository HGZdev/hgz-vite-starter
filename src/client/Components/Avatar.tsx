import styled from "styled-components";

const Img = styled("img")`
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.5));
`;

export const Avatar = ({
  className = "w-60 rounded-full",
}: {
  className?: string;
}) => {
  return (
    <div className="avatar">
      <div className={className}>
        <Img alt="avatar" src="./assets/favicon.png" />
      </div>
    </div>
  );
};

export const MiniAvatar = ({
  className = "w-12 rounded-full",
}: {
  className?: string;
}) => {
  return (
    <div className="avatar">
      <div className={className}>
        <img alt="avatar" src="./assets/favicon.png" />
      </div>
    </div>
  );
};
