const SERVER_URL = 'https://30.javascript.pages.academy/kekstagram';

const ServerRoute = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const HttpMethod = {
  GET: 'GET',
  POST: 'POST'
};

const ErrorText = {
  GET: 'Не удалось загрузить данные ',
  SEND: 'Не удалось отправить данные',
};

const request = async(url, method = HttpMethod.GET, body = null) => {
  const response = await fetch(url, {method, body});
  if (! response.ok) {
    throw new Error(ErrorText[method]);
  }

  return response.json();
};

const loadPictures = async () => { // Почему здесь возникает ошибка
  return request(SERVER_URL + ServerRoute.GET_DATA);
};

const sendPicture = async (pictureData) => {
  return request(
    SERVER_URL + ServerRoute.SEND_DATA,
    HttpMethod.POST,
    pictureData
  );
}

export { loadPictures, sendPicture };
