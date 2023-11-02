import { call } from "./axios";

export const uploadProfilePhoto = async (file: File) => {
  try {
    const data = new FormData();
    data.append("image", file);
    const res = await call.postImage(data);
    return res.data;
  } catch (err) {
    console.log(err, "ERROR");
  }
};

export const getProfile = async () => {
  try {
    const res = await call.get("profile");
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
