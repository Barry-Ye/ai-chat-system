import React from "react";
import {
    Avatar,
    IconButton,
    Menu,
    MenuItem,
    ListItemIcon,
    Divider,
} from "@mui/material";
import {
    Settings as SettingsIcon,
    Logout as LogoutIcon,
    AccountCircle as AccountCircleIcon,
    ArrowDropDown as ArrowDropDownIcon,
} from "@mui/icons-material";

interface PropTypes {
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ProfileMenu({ setIsLogin }: PropTypes) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleClose();
        setIsLogin(false)
        console.log("User logged out");
        // your logout logic here
    };

    return (
        <div>
            <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2, display: "flex", alignItems: "center", gap: 1 }}
            >
                <Avatar
                    sx={{
                        width: 40,
                        height: 40,
                        border: "2px solid #fff", // white border
                    }}
                    className="!bg-gray-600 text-white"
                >
                    A
                </Avatar>
                <ArrowDropDownIcon className="text-gray-400" />
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                PaperProps={{
                    sx: {
                        borderRadius: 2, // rounded corners
                        minWidth: 200,
                        bgcolor: "#1f2937", // dark gray background
                        color: "white",
                        boxShadow:
                            "0px 4px 20px rgba(0, 0, 0, 0.3)", // shadow
                        p: 1,
                    },
                }}
            >
                <MenuItem className="hover:bg-gray-700 rounded-md px-3 py-2">
                    <ListItemIcon>
                        <AccountCircleIcon fontSize="small" className="text-white" />
                    </ListItemIcon>
                    Profile
                </MenuItem>
                <MenuItem className="hover:bg-gray-700 rounded-md px-3 py-2">
                    <ListItemIcon>
                        <SettingsIcon fontSize="small" className="text-white" />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <Divider sx={{ borderColor: "gray" }} />
                <MenuItem
                    onClick={handleLogout}
                    className="hover:bg-gray-700 rounded-md px-3 py-2"
                >
                    <ListItemIcon>
                        <LogoutIcon fontSize="small" className="text-white" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>

        </div>
    );
}
