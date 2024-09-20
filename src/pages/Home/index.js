import { Header } from "../../components/Header";
import background from "../../Assets/background.png";

// Importação do estado para capturar as informações do input
import { useState } from "react";

import './styles.css';
import ItemList from "../../components/ItemList";

function App() {
  const [user, setUser] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [repos, setRepos] = useState(null);

  const handleGetData = async () => {
    const userData = await fetch(`https://api.github.com/users/${ user }`);
    const newUser = await userData.json();
    
    if(newUser.name){
      const { avatar_url, name, login, html_url, bio } = newUser;
      setCurrentUser({ avatar_url, name, login, html_url, bio });

      const reposData = await fetch(`https://api.github.com/users/${user}/repos`);
      const newRepos = await reposData.json();
      if(newRepos.length){
        setRepos(newRepos);
      }
    }
  };

  return (
    <div className="App">
      <Header />
      <div className="conteudo">
        <img src={ background } alt="Logo do GitHub" className="background" />
        <div className="info">
          <div>
            <input 
              name="usuario" 
              value={ user }
              onChange={(event) => setUser(event.target.value)} placeholder="@username" 
            />
            <button onClick={handleGetData}>Buscar</button>
          </div>
          {currentUser?.name ? (<>
            <div className="perfil">
              <img src={ currentUser.avatar_url } alt="Imagem do usuário" className="profile" />
              <div>
                <h3>{ currentUser.name }</h3>
                <span><a href={ currentUser.html_url } target="blank">@{ currentUser.login }</a></span>
                <p>{ currentUser.bio }</p>
              </div>
            </div>
            <hr />
            </>
          ) : null}
          {repos?.length ? (<>
            <div>
              <h4 className="repositorio" >Repositórios</h4>
              {repos.map(repo => (
                <ItemList url_repo={ repo.html_url } title={repo.name} description={repo.decription}/>

              ))}
            </div>
          </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;