import React from "react";
import { FaDiscord } from "react-icons/fa";
import { UncontrolledAlert } from "reactstrap";
import { gaEvent } from "utils/gaEvent";
import { multiRoomUser } from "utils/permissions/multiRoomUser";

const AlertInfo = ({ page, label }) => {
  return multiRoomUser() === false && (
    <UncontrolledAlert color="primary">
      <FaDiscord size="23px" className="mb-1 mr-2" />
      <span className="discord-text">Join grup Discord untuk update info live dan fitur baru</span>
      <a
        href={process.env.REACT_APP_DISCORD_LINK}
        target="_blank"
        rel="noreferrer"
        onClick={() => gaEvent(page, "Discord Link Click", label)}
      >
        <b className="mx-1 discord-text">
          JOIN DISINI
        </b>
      </a>
    </UncontrolledAlert>
  );
};

export default AlertInfo;
