import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import { colorEnum } from "../../../utils/enums/statusEnum";

export default function NotificationBell({ count }) {
  function notificationsLabel(count) {
    if (count === 0) {
      return "no notifications";
    }
    if (count > 99) {
      return "more than 99 notifications";
    }
    return `${count} notifications`;
  }

  return (
    <IconButton aria-label={notificationsLabel(count)}>
      <Badge badgeContent={count} sx={{color:colorEnum.default}}>
        <NotificationsRoundedIcon />
      </Badge>
    </IconButton>
  );
}
