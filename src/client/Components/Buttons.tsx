import React, {ReactNode, ButtonHTMLAttributes} from "react";
import {useLogout} from "../../_server/queries";
import {useNavigate} from "react-router-dom";
import {Link, LinkProps} from "react-router-dom";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  to?: string;
  href?: string;
}

export const Button: React.FC<ButtonProps> = ({className, ...props}) => {
  const cmpProps: ButtonHTMLAttributes<HTMLButtonElement> = {
    ...props,
    className: `btn btn-sm  ${className}`,
  };

  if (props.to) return <Link {...(cmpProps as LinkProps)} />;
  if (props.href)
    return (
      <a {...(cmpProps as React.AnchorHTMLAttributes<HTMLAnchorElement>)} />
    );
  return <button type="button" {...cmpProps} />;
};

export const ButtonPrimary: React.FC<ButtonProps> = ({className, ...props}) => (
  <Button
    {...props}
    className={`btn-primary shadow-md shadow-gray-300 ${className}`}
  />
);

export const ButtonSecondary: React.FC<ButtonProps> = ({
  className = "",
  ...props
}) => (
  <Button
    {...props}
    className={`btn-secondary shadow-md shadow-gray-300 ${className} `}
  />
);

export const NavButton: React.FC<ButtonProps> = ({
  className = "",
  ...props
}) => (
  <ButtonSecondary
    {...props}
    className={`btn-ghost shadow-none ${className} `}
  />
);

export const LogoutButton: React.FC<ButtonProps> = ({...props}) => {
  const [logout] = useLogout();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <NavButton {...props} onClick={handleLogout} aria-label="Logout Button">
      Logout
    </NavButton>
  );
};
