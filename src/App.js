import { useSelector } from "react-redux";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import CommunityUpload from "./screens/CommunityUpload";
import GalleryPost from "./screens/GalleryPost";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Community from "./screens/Nav/community";
import Company from "./screens/Nav/company";
import Gallery from "./screens/Nav/gallery";
import Magazine from "./screens/Nav/magazine";
import Promotion from "./screens/Nav/promotion";
import Rental from "./screens/Nav/rental";
import Service from "./screens/Nav/service";
import Posts from "./screens/Posts";
import Profile from "./screens/Profile";
import Signup from "./screens/Signup";
import GalleryUpload from "./screens/GalleryUpload";
import Search from "./screens/Search";

function App() {
  const isLoggedIn = useSelector(state => state.userReducer.isLoggedIn);
  //console.log(isLoggedIn)
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/signup' component={Signup} />
        <Route path='/login' component={Login} />
        <Route path='/posts' component={Posts} />
        <Route path='/company' component={Company} />
        <Route path='/gallery' component={Gallery} />
        <Route path='/community' component={Community} />
        <Route path='/rental' component={Rental} />
        <Route path='/promotion' component={Promotion} />
        <Route path='/magazine' component={Magazine} />
        <Route path='/gallerypost/:id' component={GalleryPost} />
        <Route path='/search' component={Search} />
        {isLoggedIn ? <Route path='/service' component={Service} /> : <Redirect to='/login' />}
        {isLoggedIn ? <Route path='/upload' component={GalleryUpload} /> : <Redirect to='/login' />}
        {isLoggedIn ? <Route path='/communityupload' component={CommunityUpload} /> : <Redirect to='/login' />}
        {isLoggedIn ? <Route path='/user/:id' component={Profile} /> : <Redirect to="/login" />}
      </Switch>
    </Router>
  );
}

export default App;
