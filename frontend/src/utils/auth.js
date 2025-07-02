const BASE_URL = "https://ststas.dev/mesto/api";

// функция получения ответа и преобразования его в объект
function getRes(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}
// функция отправки fetch запроса
function request(url, options) {
  return fetch(`${BASE_URL}/${url}`, options).then(getRes);
}
// функция отправки данных для регистрации пользователя
export const register = (email, password) => {
  return request(`signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });
};
// функция отправки данных для авторизации пользователя
export const authorize = (email, password) => {
  return request(`signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });
};

export const logout = () => {
  return request(`signout`, {
    method: "DELETE",
    credentials: "include",
  });
};

// функция отправки данных для проверки валидности токена
export const checkToken = () => {
  return request(`users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
};
