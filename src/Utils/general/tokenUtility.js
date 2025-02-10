export const checkTokenValidity = (time) => {
  const currentTimestamp = Math.floor(Date.now() / 1000);

  // Check if expiry is in the future
  return time > currentTimestamp;
};
