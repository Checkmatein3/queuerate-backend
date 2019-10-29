import React, { Component } from 'react';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Route, Switch, Link } from "react-router-dom";
import { withRouter } from 'react-router-dom'
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import { connect } from 'react-redux'
import { fetchCategories } from '../APIs/Category'
import AddCategory from '../Components/AddCategory'
import CategoryView from "../Components/CategoryView/CategoryView";
import { logout } from "./Firebase"
import AllView from '../Components/AllView';
import EditCategory from '../Components/EditCategory/EditCategory';
import Divider from '@material-ui/core/Divider';
import UncategorizedView from '../Components/UncategorizedView';
import { get_uuid } from "../Utility/Firebase"

import './Navbar.css';

class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { fetchCategories } = this.props
    fetchCategories(get_uuid())
  }

  handleLogout = (event) => {
    logout();
    event.preventDefault();
  }

  render() {
    const { history, classes, categories } = this.props

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            {/* <Typography variant="h6" noWrap>
            Clipped drawer
          </Typography> */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="logout"
              onClick={this.handleLogout}
            >
              Log Out
            </Button>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.toolbar} />
          <List>
            <ListItem button
              // key={index}
              onClick={() => history.push('/')}>
              <ListItemText primary={'All'} />
            </ListItem>
            {categories.map((obj, index) => (
              <ListItem button
                key={index}
                onClick={() => history.push('/category/' + obj.id)}>
                <ListItemText primary={obj.category_name} />
              </ListItem>
            ))}
            <Divider />
            <ListItem button
              // key={index}
              onClick={() => history.push('/uncategorized')}>
              <ListItemText primary={'Uncategorized'} />
            </ListItem>
          </List>
          <ListItem className="add-button-box" >
            <Fab
              size="small"
              color="secondary"
              aria-label="add"
              className={classes.margin}
              onClick={() => history.push('/addCategory')}
            >
              <AddIcon />
            </Fab>
          </ListItem>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route
              exact
              path="/category/:categoryID"
              component={CategoryView}
            />
            <Route
              exact
              path="/category/:categoryID/edit"
              render={(props) => <EditCategory {...props}  uuid={get_uuid()} updateParentCategory={(uuid) => this.props.fetchCategories(uuid)} />}
            />
            <Route
              exact
              path="/addCategory"
              component={AddCategory} />
            <Route
              exact
              path="/uncategorized"
              component={UncategorizedView} />
            <Route
              exact
              path="/"
              component={AllView} />
          </Switch>
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  categories: state.category ? state.category.categories : []
})

const mapDispatchToProps = (dispatch) => ({
  fetchCategories: (uuid) => dispatch(fetchCategories(uuid))
})


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
