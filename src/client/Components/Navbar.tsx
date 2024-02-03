import {Link} from "react-router-dom";
import {MiniAvatar} from "./Avatar";
import {NavButton, LogoutButton} from "./Buttons";
import Hamburger from "./Hamburger";

const NavbarMenuDropdown = () => {
  return (
    <div className="dropdown dropdown-bottom dropdown-end p-0">
      <NavButton tabIndex={0} role="button">
        Account
      </NavButton>
      <ul
        tabIndex={0}
        className="menu dropdown-content z-[1] p-2 shadow rounded-box w-52 mt-4"
        data-theme="main"
      >
        <li key={0}>
          <a className="">Just button</a>
        </li>
        <li key={1}>
          <NavButton className="flex justify-start ">Just button</NavButton>
        </li>
        <li key={2}>
          <LogoutButton className="flex justify-start  " />
        </li>
      </ul>
    </div>
  );
};

const NavbarMenuContent = () => {
  return (
    <ul className="menu menu-horizontal items-center gap-4 ">
      <li key={1}>
        <NavButton href="https://www.google.pl">Link button</NavButton>
      </li>
      <li key={2}>
        <NavButton to="/registration">Router link button</NavButton>
      </li>
      <li key={3}>
        <NavButton>Just button</NavButton>
      </li>
      <li key={4}>
        <NavButton>Just button</NavButton>
      </li>
      <li key={5}>
        <NavButton>Just button</NavButton>
      </li>
      <li key={6}>
        <NavButton>Just button</NavButton>
      </li>
      <li key={7}>
        <NavbarMenuDropdown />
      </li>
    </ul>
  );
};

const SidebarMenuContent = () => {
  return (
    <ul className="menu p-2 w-80 min-h-full bg-black bg-opacity-80">
      <label
        htmlFor="Navbar"
        aria-label="open sidebar"
        className="btn btn-square btn-ghost"
      >
        ✕
      </label>
      <span className="divider m-0 px-2 divider-primary"></span>
      <li key={1}>
        <NavButton className="flex justify-start" href="https://www.google.pl">
          Link button
        </NavButton>
      </li>
      <li key={2}>
        <NavButton className="flex justify-start" to="/registration">
          Router link button
        </NavButton>
      </li>
      <li key={3}>
        <NavButton className="flex justify-start">Just button</NavButton>
      </li>
      <li key={4}>
        <NavButton className="flex justify-start">Just button</NavButton>
      </li>
      <span className="divider m-0 px-2 divider-primary"></span>
      <li key={5}>
        <LogoutButton className="flex justify-start " />
      </li>
    </ul>
  );
};

const Navbar = () => {
  return (
    <div
      data-testid="Navbar"
      data-theme="navbar"
      className="flex justify-center bg-primary"
    >
      <div className="drawer max-w-screen-lg">
        <input id="Navbar" type="checkbox" className="drawer-toggle" />
        {/* Navbar */}
        <div className="drawer-content flex flex-col">
          <div className="navbar w-full">
            <div className="flex-none lg:hidden">
              <label
                htmlFor="Navbar"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <Hamburger />
              </label>
            </div>
            <div className="flex-1 px-2 mx-2">
              <Link to="/dashboard">
                <MiniAvatar />
              </Link>
            </div>
            <div className="flex-none hidden lg:block">
              {/* Navbar menu content here */}
              <NavbarMenuContent />
            </div>
          </div>
        </div>
        {/* Sidebar */}
        <div className="drawer-side">
          <label
            htmlFor="Navbar"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          {/* Sidebar content here */}
          <SidebarMenuContent />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
