import {useState, useEffect} from 'react';
import Axios from 'axios';

function Orders() {

  const [currentUser, setCurrentUser] = useState();
  const [isLoading, setLoading] = useState(true);
  const loggedInUserID = localStorage.currentUserID
  console.log(loggedInUserID)
  useEffect(() => {
    Axios.get(`http://localhost:4000/users/getUser?id=${loggedInUserID}`).then((response) => {
      setCurrentUser(response.data); 
      setLoading(false);
    });
  }, []);

  if (isLoading){
    return <div className='orders'></div>;
  }
  return (
    <div className='orders'>
      <h1>{currentUser.data.email}</h1>
    </div>
  );
}

export default Orders;
