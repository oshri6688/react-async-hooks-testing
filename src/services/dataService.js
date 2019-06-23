export const getData = () => {
  return new Promise(reslove => {
    setTimeout(() => {
      reslove("My Data");
    }, 3000);
  });
};
