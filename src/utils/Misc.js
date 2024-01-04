import config from "../config.json";
const convertTime = (time) => {
  let hours = time.getHours(),
    minutes = time.getMinutes();
  let suf = "AM";
  if (hours >= 12) {
    hours -= 12;
    suf = "PM";
  }
  if (hours == 0) hours = 12;
  return `${hours < 10 ? "0" : ""}${hours}:${
    minutes < 10 ? "0" : ""
  }${minutes} ${suf}`;
};

const getFileURL = (name) => {
  return `${config.FILE_SERVER}/getFile?id=${name}`;
};

const getVideoURL = (name) => {
  return `${config.FILE_SERVER}/videos/video/${name}`;
};

export { convertTime, getFileURL, getVideoURL };
