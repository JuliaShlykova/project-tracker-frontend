const JSONFromForm = (fD) => {
  let obj = {};
  fD.forEach((value, key) => {
    if(!Reflect.has(obj, key)) {
      obj[key] = value;
      return;
    }
    if(!Array.isArray(obj[key])) {
      obj[key] = [obj[key]];
    }
    obj[key].push(value);
  });
  return JSON.stringify(obj);
};

export default JSONFromForm;