import './App.css';
import axios from 'axios';
import { 
  useEffect, 
  useState 
} from 'react';
import Header from './components/header';
import Routes from './Routes';

//const link =   'http://localhost:8000/'
const link = 'https://sellobjects.herokuapp.com/'

export default function App() 
{ 
  const [is_auth, setAuth] = useState(false);
  const [result, setResult] = useState({});

  function signIn() {window.open(`${link}accounts/steam/login/`)}

  function exit_acc() 
  {axios.get(`${link}accounts/logout/`,
  {withCredentials: true}).then(() => 
    { 
      setAuth(false); 
      setResult({}); 
      localStorage.clear();
    }).catch(() => 
    {
      setAuth(false);
      setResult({});
    })
  }

  useEffect(() =>{getInfo()},[])
    async function getInfo() 
    {const skin = await axios.get(`${link}api/owner/`, 
      {withCredentials: true})
        setResult(skin.data);
        setAuth(true);
      if (skin.status > 300) setAuth(false)
   }

  return (
    <>
      <Header 
        signIn={signIn}
        exit_acc={exit_acc} 
        logged_in={is_auth} 
        account={result}
      />
      <Routes 
        default_link={link} 
        logged_in={is_auth} 
        account={result}
      />
    </>
  );
}