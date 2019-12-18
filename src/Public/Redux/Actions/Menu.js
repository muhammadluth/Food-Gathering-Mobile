import Http from '../../Utils/Http';

export const getMenu = test => {
  console.log('action ' + test);
  return {
    type: 'GET_MENU',
    payload: new Promise((resolve, reject) => {
      const {search = '', sort = '', type = ''} = test;
      Http.get(`/api/v1/product?sort=${sort}&type=${type}&search=${search}`)
        .then(result => resolve(result))
        .catch(error => reject(error));
    }),
  };
};
