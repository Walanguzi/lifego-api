import http from 'k6/http';
import { check } from 'k6';

module.exports.options = {
  vus: 10,
  duration: '10s',
};

module.exports.default = () => {
  const res = http.get('https://api.lifegokenya.com/monitor');
  check(res, {
    success: r => r.status === 200,
  });
};
