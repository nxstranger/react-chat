
const DEFAULT_USER_NAME = 'qwe1';
const DEFAULT_CONTACT_NAME= 'qwe4'

const UseLocalStorage = () => {

    const getUserLocal = () => localStorage.getItem('userLocal') || DEFAULT_USER_NAME;
    const setUserLocal = (username:string) => localStorage.setItem('userLocal', username);
    const getContactLocal = () => localStorage.getItem('contactLocal') || DEFAULT_CONTACT_NAME;
    const setContactLocal = (contactName:string) => localStorage.setItem('contactLocal', contactName);


  return {
      getUserLocal,
      setUserLocal,
      getContactLocal,
      setContactLocal
  }
}

export default UseLocalStorage;
