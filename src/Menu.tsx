import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "./styles/menu.scss";

const ITEM_HEIGHT = 48;

export type PropsMenuType = {
    onRemove: () => void;
    children: React.ReactNode;
};
export const LongMenu = React.memo((props: PropsMenuType) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? "long-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon/>
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    "aria-labelledby": "long-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                className="menMui"
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: "20ch",
                        borderRadius: "10px",
                        boxShadow: "2px 1px 10px rgba(107, 147, 249, 0.25)",
                        padding: "0px",
                    },
                }}
            >
                {props.children}
            </Menu>
        </div>
    );
})
