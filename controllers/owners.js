const Owner = require("../models/owner");
const Dog = require("../models/dog");

module.exports = {
    new: newOwner,
    create,
    show
};

function newOwner(req,res){
    res.render("owners/newOwner", {title: "Add details", errorMsg: ""});
}

async function create(req,res){
    const ownerData = {...req.body};
    ownerData.pet == !!ownerData.pet;

    for(let key in ownerData){
        if (ownerData[key] === "") delete ownerData[key];
    }

    try {
        const createdOwner = await Owner.create(ownerData);
        res.redirect("/owners/" + createdOwner._id + "/dogs/new");
    } catch (err){
        console.log(err);
        res.render("owners/newOwner", {errorMsg: err.message});
    }

}

async function show(req, res) {
    try {
        const owner = await Owner.findById(req.params.id);
        const dogs = await Dog.find({ owner: owner._id });
        res.render('owners/show', { owner, dogs });
    } catch (err) {
        console.log(err);
        res.redirect('/');
    }
}