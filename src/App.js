import Header from "./components/Header"
import Content from "./components/Content"
import Footer from "./components/Footer"
import Missing from "./components/Missing"
import Login from "./components/Login"
import {Route, Switch} from "react-router-dom"


function App() {
  return (
    <div className="App">
      <Header />


      <Switch>
        <Route path="/" exact>
          <Content />
        </Route>

        
        <Route path="/login" exact>
            <Login />
        </Route>
        

        <Route path="*" component={Missing}/>

      </Switch>
     
     
      <Footer />
    </div>
  );
}

export default App;
