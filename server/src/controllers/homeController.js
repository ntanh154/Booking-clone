import db from "../models/index";
import CRUDService from "../services/CRUDService";

let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();

    return res.send(data);
  } catch (error) {}
};

let getAboutPage = (req, res) => {
  return res.render("about/aboutPage.ejs");
};

let getCRUD = (req, res) => {
  return res.render("crud.ejs");
};

let postCRUD = async (req, res) => {
  let message = await CRUDService.createNewUser(req.body);
  let data = await CRUDService.getAllUser();

  return res.render("displayCRUDPage.ejs", { data });
};

let displayGetCRUD = async (req, res) => {
  let data = await CRUDService.getAllUser();

  return res.render("displayCRUDPage.ejs", { data });
};

let getEditCRUD = async (req, res) => {
  let userId = req.query.id;
  if (userId) {
    let userData = await CRUDService.getUserInfoById(userId);
    return res.render("editCRUD.ejs", {
      user: userData,
    });
  } else {
    return res.send("User not found!");
  }
};
let putCRUD = async (req, res) => {
  let data = await req.body;
  let allUsers = await CRUDService.updateUserData(data);
  return res.render("displayCRUDPage.ejs", { data: allUsers });
};

let deleteCRUD = async (req, res) => {
  let id = req.query.id;
  if (id) {
    let allUsers = await CRUDService.deleteUserInfoById(id);
    return res.render("displayCRUDPage.ejs", { data: allUsers });
  } else {
    return res.send("User delete not found!");
  }
};

module.exports = {
  getHomePage: getHomePage,
  getAboutPage: getAboutPage,
  getCRUD: getCRUD,
  postCRUD: postCRUD,
  displayGetCRUD: displayGetCRUD,
  getEditCRUD: getEditCRUD,
  putCRUD: putCRUD,
  deleteCRUD: deleteCRUD,
};
