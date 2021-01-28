import React, { useState } from "react";
// import data from "../data.json";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles((theme) => ({
  root: {
    //  padding: "10px",
  },
  title: {
    flexGrow: 1,
    display: "none",
    color: "white",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  paper: {
    flexGrow: 1,
    width: "100%",
    flexDirection: "row",
  },
  articles: {
    flexGrow: 1,
    width: "100%",
    display: "none",
    color: "white",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  AppBar: {
    background: theme.secondary,
  },
  list: {
    flexGrow: 1,

    justifyContent: "center",
    alignContent: "center",
    margin: "10px",
    padding: "10px",
    maxHeight: "30%",
  },
  listContent: {
    overflow: "auto",
    height: "calc(100vh - 100px - 60px)",
    maxHeight: "calc(100vh - 100px - 20px)",
  },
  button: {
    color: "white",
    // background: "#0965ed",
    borderRadius: "10px",
    paddingLeft: "10px",
    paddingRight: "10px",
    padding: "6px",
    borderWidth: "2px",
    borderColor: "white",
  },
  listHeader: {
    padding: "10px",
    background: "#9b9c9e",
  },
  listHeaderItem: {
    justifyContent: "center",
    alignContent: "center",
    marginLeft: "36px",
  },
  listItem: {
    justifyContent: "center",
    alignContent: "center",
    margin: "10px",
  },
}));
const ArticleList = (props) => {
  const classes = useStyles();
  const [articleList, setArticleList] = useState({ filterList: props.data });
  const creatArticleBox = (article, index) => {
    return (
      <Paper elevation={3} key={index}>
        <ListItem>
          <ListItemText className={classes.listItem}>
            {article.title}
          </ListItemText>
          <ListItemText className={classes.listItem}></ListItemText>
          <ListItemText className={classes.listItem}>
            {new Date(article.date).toDateString()}
          </ListItemText>
          <ListItemText className={classes.listItem}></ListItemText>
          <ListItemText className={classes.listItem}>
            {article.upVotes}
          </ListItemText>
        </ListItem>
      </Paper>
    );
  };
  const filterMostRecent = () => {
    let list = articleList.filterList.sort(function (a, b) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    setArticleList((prevState) => ({
      ...prevState,
      filterdList: list,
    }));
    return list;
  };
  const filterMostUpvoted = () => {
    let list = articleList.filterList.sort(
      (a, b) => parseFloat(b.upVotes) - parseFloat(a.upVotes)
    );
    setArticleList((prevState) => ({
      ...prevState,
      filterdList: list,
    }));
    return list;
  };
  console.log("daa", articleList);
  return (
    <div className={classes.root}>
      <AppBar className={classes.AppBar} position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h4" noWrap>
            Article List
          </Typography>
          <div>
            <Button onClick={() => filterMostUpvoted()}>
              <Typography className={classes.button} variant="button" noWrap>
                Most UpVotes
              </Typography>
            </Button>

            <Button onClick={() => filterMostRecent()}>
              <Typography className={classes.button} variant="button" noWrap>
                Most Recent
              </Typography>
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <List className={classes.list}>
        <Paper>
          <ListItem className={classes.listHeader}>
            <ListItemText className={classes.listHeaderItem}>
              Title
            </ListItemText>
            <ListItemText className={classes.listHeaderItem}></ListItemText>
            <ListItemText className={classes.listHeaderItem}>Date</ListItemText>
            <ListItemText className={classes.listHeaderItem}></ListItemText>

            <ListItemText className={classes.listHeaderItem}>
              UpVotes
            </ListItemText>
          </ListItem>
        </Paper>
        <div className={classes.listContent}>
          {articleList.filterList.map((article, index) => {
            return creatArticleBox(article, index);
          })}
        </div>
      </List>
    </div>
  );
};
export default ArticleList;
