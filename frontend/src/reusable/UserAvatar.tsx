import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { getImage } from "../utils/urlUtils";

const UserAvatar = () => {

  const { profilePictureUrl } = useSelector((state: RootState) => state.auth);

  return (
    <Avatar style={!profilePictureUrl ? { backgroundColor: "#87d068" } : {}} src={profilePictureUrl ? getImage(profilePictureUrl) : null} size={40}>
      <UserOutlined />
    </Avatar>
  );
};

export default UserAvatar;
