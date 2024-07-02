const fromUTCToDateTimeLocalInputFormat = (dateStr) => {
  let offset = new Date().getTimezoneOffset();
  let offsetms = offset * 60 * 1000;
  let faketimestamp = Date.parse(new Date(dateStr)) - offsetms;
  let neededFormat = new Date(faketimestamp).toISOString().slice(0, -1);
  return neededFormat;
}

export default fromUTCToDateTimeLocalInputFormat;