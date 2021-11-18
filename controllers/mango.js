var mango = require("../models/mango");

// for a specific mango.
exports.mango_detail = function (req, res) {
  res.send("NOT IMPLEMENTED: mango detail: " + req.params.id);
};

// Handle mango delete form on DELETE.
exports.mango_delete = function (req, res) {
  res.send("NOT IMPLEMENTED: mango delete DELETE " + req.params.id);
};
// Handle mango update form on PUT.
exports.mango_update_put = function (req, res) {
  res.send("NOT IMPLEMENTED: mango update PUT" + req.params.id);
};

// List of all mangos
exports.mango_list = async function (req, res) {
  try {
    themangos = await mango.find();
    res.send(themangos);
  } catch (err) {
    res.status(500);
    res.send(`{"error": ${err}}`);
  }
};

// VIEWS
// Handle a show all view
exports.mango_view_all_Page = async function (req, res) {
  try {
    themangos = await mango.find();
    res.render("mango", { title: "mango Search Results", results: themangos });
  } catch (err) {
    res.status(500);
    res.send(`{"error": ${err}}`);
  }
};

// Handle mango create on POST.
exports.mango_create_post = async function (req, res) {
  console.log(req.body);
  let document = new mango();
  // We are looking for a body, since POST does not have query parameters.
  // Even though bodies can be in many different formats, we will be picky
  // and require that it be a json object
  // {"mango_type":"goat", "cost":12, "size":"large"}
  document.types = req.body.types;
  document.taste = req.body.taste;
  document.cost = req.body.cost;
  try {
    let result = await document.save();
    res.send(result);
  } catch (err) {
    res.status(500);
    res.send(`{"error": ${err}}`);
  }
};

// for a specific mango.
exports.mango_detail = async function (req, res) {
  console.log("detail" + req.params.id);
  try {
    result = await mango.findById(req.params.id);
    res.send(result);
  } catch (error) {
    res.status(500);
    res.send(`{"error": document for id ${req.params.id} not found`);
  }
};

//Handle mango update form on PUT.
exports.mango_update_put = async function (req, res) {
  console.log(`update on id ${req.params.id} with body 
${JSON.stringify(req.body)}`);
  try {
    let toUpdate = await mango.findById(req.params.id);
    // Do updates of properties
    if (req.body.types) toUpdate.types = req.body.types;
    if (req.body.taste) toUpdate.taste = req.body.taste;
    if (req.body.cost) toUpdate.cost = req.body.cost;
    let result = await toUpdate.save();
    console.log("Sucess " + result);
    res.send(result);
  } catch (err) {
    res.status(500);
    res.send(`{"error": ${err}: Update for id ${req.params.id} 
failed`);
  }
};

// Handle mango delete on DELETE.
exports.mango_delete = async function (req, res) {
  console.log("delete " + req.params.id);
  try {
    result = await mango.findByIdAndDelete(req.params.id);
    console.log("Removed " + result);
    res.send(result);
  } catch (err) {
    res.status(500);
    res.send(`{"error": Error deleting ${err}}`);
  }
};

// Handle a show one view with id specified by query
exports.mango_view_one_Page = async function (req, res) {
  console.log("single view for id " + req.query.id);
  try {
    result = await mango.findById(req.query.id);
    res.render("mangodetail", { title: "mango detail", toShow: result });
  } catch (err) {
    res.status(500);
    res.send(`{'error': '${err}'}`);
  }
};

// Handle building the view for creating a mango.
// No body, no in path parameter, no query.
// Does not need to be async
exports.mango_create_Page = function (req, res) {
  console.log("create view");
  try {
    res.render("mangocreate", { title: "mango Create" });
  } catch (err) {
    res.status(500);
    res.send(`{'error': '${err}'}`);
  }
};

// Handle building the view for updating a mango. 
// query provides the id 
exports.mango_update_Page =  async function(req, res) { 
    console.log("update view for item "+req.query.id) 
    try{ 
        let result = await mango.findById(req.query.id) 
        res.render('mangoupdate', { title: 'mango Update', toShow: result }); 
    } 
    catch(err){ 
        res.status(500) 
        res.send(`{'error': '${err}'}`); 
    } 
}; 

// Handle a delete one view with id from query 
exports.mango_delete_Page = async function(req, res) { 
    console.log("Delete view for id "  + req.query.id) 
    try{ 
        result = await mango.findById(req.query.id) 
        res.render('mangodelete', { title: 'mango Delete', toShow: 
result }); 
    } 
    catch(err){ 
        res.status(500) 
        res.send(`{'error': '${err}'}`); 
    } 
}; 