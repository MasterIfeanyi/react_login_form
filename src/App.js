import Header from "./components/Header"
import Content from "./components/Content"
import Footer from "./components/Footer"
import Missing from "./components/Missing"
import Welcome from "./components/Welcome"
import Login from "./components/Login"
import { Route, Switch } from "react-router-dom"
import {DataProvider} from './context/DataContext'


function App() {
  return (
    <div className="App">
      <DataProvider>
        <Header />
        
          <Switch>
           
            <Route path="/" exact>
              <Content />
            </Route>

            
            <Route path="/login" exact>
                <Login />
            </Route>
            
           <Route path="/welcome" exact component={Welcome}/>

            <Route path="*" component={Missing}/>

          </Switch>
        
        
          <Footer />
      </DataProvider>
    </div>
  );
}

export default App;
