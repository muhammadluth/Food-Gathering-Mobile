const initialState = {
  addCart: [],
  isLoading: false,
  isFulfilled: false,
  isRejected: false,
};

const addCart = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_CART_FULFILLED':
      return {
        ...state,
        addCart: action.payload,
      };
    default:
      return state;
  }
};

export default addCart;
