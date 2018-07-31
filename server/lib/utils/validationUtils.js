/* eslint-disable no-useless-escape */

const validateFields = (request, response, keys, callback) => {
  const body = {
    ...request.body,
  };

  if (Object.keys(body).length < keys.length) {
    response.status(400);
    response.json({ message: 'Email or password missing' });
    return;
  }

  let error;
  const format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  Object.keys(body).filter(key => key !== 'social' && key !== 'reminders').forEach((key) => {
    if (!body[key]) {
      error = () => {
        response.status(400);
        response.json({ message: `${key} is empty` });
      };
      return;
    }

    if (key === 'username' && format.test(body.username)) {
      error = () => {
        response.status(400);
        response.json({ message: 'Username cannot have special characters' });
      };
      return;
    }

    if (key === 'email' && !re.test(body.email)) {
      error = () => {
        response.status(400);
        response.json({ message: 'Invalid email' });
      };
    }
  });

  const cb = error || callback;

  cb();
};

const validateNotification = (data, keys) => {
  const dataKeys = Object.keys(data);
  let response;

  keys.forEach((key) => {
    if (dataKeys.indexOf(key) < 0) {
      response = {
        message: `${key} is missing`,
      };
    }
  });

  return response;
};


module.exports = {
  validateFields,
  validateNotification,
};
