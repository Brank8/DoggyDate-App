const Owner = require("../models/owner");
const Dog = require("../models/dog");
const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')

const {clConfig} = require('../config/cloudinary')
cloudinary.config(clConfig)

module.exports = {
    new: newDog,
    create,
    edit,
    update: updateDog,
    delete: deleteDog
};

async function newDog (req, res) {
    const owner = await Owner.findById(req.params.id)
    res.render('dogs/new', {owner, errorMsg: ""})
}

async function create(req, res) {
    const dogData = {...req.body}
    const owner = await Owner.findById(req.params.id)
    dogData.owner = owner._id
    dogData.hasAkcCertification = !!dogData.hasAkcCertification
    const result = await streamUpload(req)
    dogData.pictures = result.url
    const createdDog = await Dog.create(dogData)
    try {
    
        res.redirect("/owners/" + dogData.owner)
    } catch(err) {
        console.log(err)
        console.log(req.file);
        console.log(req.body);
        res.render('dogs/new', {owner, errorMsg: err.message })
        
    }
}

async function edit(req, res){
    try {
        const dog = await Dog.findById(req.params.dogId);
        const owner = await Owner.findById(req.params.ownerId);
        res.render('dogs/edit', { dog, owner }); 
    } catch (err) {
        console.log(err);
    }
}

async function updateDog(req,res){
    try {
        let updates = {};
        for (let key in req.body) {
            if (req.body[key] !== '' && req.body[key] !== null) {
                updates[key] = req.body[key];
            }
        }
        const updatedDog = await Dog.findByIdAndUpdate(req.params.dogId, updates, {new: true})
        res.redirect('/owners/' + req.params.ownerId)
    } catch(err) {
        console.log(err)
        res.redirect('/')
    }

}

async function deleteDog(req,res){
    try {
        await Dog.findByIdAndDelete(req.params.dogId) 
        res.redirect("/owners/" + req.params.ownerId)
    } catch(err) {
        console.log(err)
        res.redirect('/')
    }
}

function streamUpload (req){
    return new Promise(function (resolve, reject){
        let stream = cloudinary.uploader.upload_stream( function(error, result){
            if(result){
                resolve(result)
            }else{
                reject(error)
            }
        });
        streamifier.createReadStream(req.file.buffer).pipe(stream)
    })
}