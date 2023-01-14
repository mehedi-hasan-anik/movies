export const getData = (page: any) => {
  const result = fetch(
    `https://parseapi.back4app.com/classes/SWAPI_Film?count=${page}&limit=2`,
    {
      method: "GET",
      headers: {
        "X-Parse-Application-Id": "mq0PEJRCanvLk71FtAZmFOLgcEHcl6ZLtru4TzCX",
        "X-Parse-REST-API-Key": "gPccvX8c01sVUbVXbSLipca44K4HN7RxkL5CT9Zv",
      },
    }
  )
    .then((res) => res.json())
    .then((data: any) => {
      return data;
    });

  return result;
};
