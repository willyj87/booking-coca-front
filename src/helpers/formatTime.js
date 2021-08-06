import moment from 'moment';

const formatTime = (time) => {
  const today = moment().format();
  return new Date(`${today.toString().split('T')[0]}T${time}Z`);
};
export default formatTime;
