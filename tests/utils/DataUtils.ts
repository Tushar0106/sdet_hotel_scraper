export function getFutureDates() {
  const today = new Date();

  const checkIn = new Date(today);
  checkIn.setDate(today.getDate() + 30);

  const checkOut = new Date(checkIn);
  checkOut.setDate(checkIn.getDate() + 5);

  return { checkIn, checkOut };
}