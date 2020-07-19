import { enableES5, produce } from 'immer';

export default (...args) => {
  enableES5();
  return produce(...args);
};
