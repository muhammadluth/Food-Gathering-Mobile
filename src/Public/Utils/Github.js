import axios from "axios";

const github = axios.create({
  baseURL: process.env.REACT_APP_GITHUB_API
});
export default github;
