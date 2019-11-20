import Http from '../../Utils/Http';
import Axios from 'axios';

export const getMenu = test => {
  console.log('action ' + test);
  return {
    type: 'GET_MENU',
    payload: new Promise((resolve, reject) => {
      const {search = ''} = test;
      Axios.get(
        `https://point-of-sales-restfull-api-v1.herokuapp.com/api/v1/product?search=${search}`,
      )
        .then(result => resolve(result))
        .catch(error => reject(error));
    }),
  };
};
