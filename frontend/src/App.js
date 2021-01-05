import logo from './logo.svg';
import { Router, Route } from "react-router-dom"
import Post from "./components/Post.component";
import Search from "./components/search.component"
import './App.css';

function App() {
  return (
    <div>
      <p>Main</p>
      <Route path="/ilanlar" component={Post}></Route>
      <Route path='/search' component={Search}></Route>
    </div>
  );
}

export default App;
