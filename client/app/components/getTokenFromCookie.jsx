import Cookies from 'js-cookie';

export const getTokenFromCookie = Cookies.get('token')

// const getUsernameFromCookie = () => {
//   const instance = axios.create({
//     baseURL: 'http://localhost:8000/user/profile',
//     timeout: 1000,
//     headers: {'Authorization': `Bearer ${getTokenFromCookie}`}
//   });
  
//   instance.get('/path')
//   .then(response => {
//       return response.data;
//   })
// }

