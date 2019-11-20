import Axios from 'axios';
import {API_BASEURL} from 'react-native-dotenv';

const instance = Axios.create({
  baseURL: API_BASEURL,
});

export default instance;
