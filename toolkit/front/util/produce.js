import { enableES5, produce } from 'immer';

const newProduce = (...args) => {
  enableES5();
  return produce(...args);
};

export default newProduce;
