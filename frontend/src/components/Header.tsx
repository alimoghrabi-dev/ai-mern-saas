import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Logo from "./shared/Logo";
import { useAuth } from "@/context/AuthContext";
import NavigationLinks from "./shared/NavigationLinks";

const Header = () => {
  const auth = useAuth();

  return (
    <AppBar
      className="border-b border-gray-500/[0.2]"
      sx={{
        position: "sticky",
        backgroundColor: "hsl(var(--background))",
      }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Logo />
        <div>
          {auth?.isLoggedIn ? (
            <div className="space-x-2">
              <NavigationLinks
                to="/"
                variantBg="ghost"
                text="Logout"
                textColor="white"
                onClick={() => auth?.logout()}
              />
              <NavigationLinks
                to="/chat"
                variantBg="default"
                text="Go To Chat"
                textColor="white"
              />
            </div>
          ) : (
            <div className="space-x-2">
              <NavigationLinks
                to="/signin"
                variantBg="ghost"
                text="Sign In"
                textColor="white"
              />
              <NavigationLinks
                to="/signup"
                variantBg="default"
                text="Sign Up"
                textColor="white"
                onClick={() => auth?.logout()}
              />
            </div>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
