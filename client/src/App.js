import './App.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import * as pages from './pages/index.js'


function App() {
  return (
    
    <BrowserRouter>
      <div className="App">
          <Switch>
            <Route exact path="/" component={pages.Landing} />
            <Route exact path={'/home'} component={pages.Home} />
            <Route exact path={'/detail'} component={pages.Detail} />
            <Route exact path={'/form'} component={pages.Form} />
          </Switch>
      </div>
    </BrowserRouter>
      
  );
}

export default App;
