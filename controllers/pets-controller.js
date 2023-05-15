const cloudinary = require('cloudinary').v2;
const multerUpload = require('../middleware/multer');
const DB = require('../db');
const HttpError = require('../models/http-error');
const savedPetsController = require('./saved_pets-controller');
const PetModel = require('../models/pets');

const petsDB = new DB(PetModel);
const uploader = cloudinary.uploader;

//create
const createPet = async (req, res, next) => {
  try {
    const obj = req.body;
    if (!req.file) {
      throw new HttpError('We need the file, bro', 400);
    }
    const file = multerUpload.dataUri(req).content;
    const result = await uploader.upload(file);
    const newPet = await petsDB.add({ ...obj, image: result.url });
    res.status(201).json({ newPet });
  } catch (error) {
    console.error(error)
    next(error);
  }
};

//read
const getAllPets = async (req, res, next) => {
    try {
      const allPets = await PetModel.find({});
      if (!allPets.length) {
        throw new HttpError('Could not find any pets', 404);
      }
      res.json({ pets: allPets });
    } catch (error) {
      console.error(error)
      next(error);
    }
  };

const getPetById = async (req, res, next) => {
  try {
    const pet = await petsDB.getById(req.params.petId);
    if (!pet) {
      throw new HttpError('Could not find a pet for the provided id', 404);
    }
    res.json({ pet });
  } catch (error) {
    console.error(error)
    next(error);
  }
};

const getPetsByuserId = async (req, res, next) => {
  try {
    const petArray = await petsDB.getByUserId(req.params.userId);
    if (petArray.length === 0) {
      throw new HttpError('Could not find a pet for the provided user id', 404);
    }
    res.json({ petArray });
  } catch (error) {
    console.error(error)
    next(error);
  }
};

const getPetsByFilter = async (req, res, next) => {
  try {
    console.log(req.query);
    const { type, name, status, height, weight } = req.query;

    let constructedQuery = { type };

    if (name) {
      constructedQuery.name = { $regex: name, $options: 'i' };
    }
    if (status !== 'undefined') {
      constructedQuery.status = status;
    }
    if (height !== 'undefined') {
      constructedQuery.height = { $lte: parseInt(height) };
    }
    if (weight !== 'undefined') {
      constructedQuery.weight = { $lte: parseInt(weight) };
    }

    const queryResult = await petsDB.findMany(constructedQuery);
    res.send({ petsArray: queryResult });
  } catch (error) {
    console.error(error)
    next(error);
  }
};
const updatePetById = async (req, res, next) => {
    try {
        const _id = req.params.petId;
        const { type, name, status, breed, height, weight, color, bio, hypoall, dietno } = req.body;
        const updatedPet = await petsDB.update(_id);
        if (!updatedPet) {
            throw new HttpError('Could not find a pet for the provided id', 404);
        }

        let doc = updatedPet.doc;

        if (req.file) {
          file = multerUpload.dataUri(req).content;
          const response = await uploader.upload(file);
          doc.image = response.url;
        }

        doc.type = type;
        doc.name = name;
        doc.status = status;
        doc.breed = breed;
        doc.height = height;
        doc.weight = weight;
        doc.color = color;
        doc.bio = bio;
        doc.hypoall = hypoall;
        doc.dietno = dietno;
        await updatedPet.save();
        res.json({ updatedPet: doc });
    } catch (error) {
      console.error(error)
      next(new HttpError('Could not update. Please try again.', 404));
    }
};

const adoptByUserId = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const { status, _id } = req.body;
        await savedPetsController.delPetFromUserSavedPetsOnAdoptOrFoster(userId, _id);
        if (status === 'Adopted') {
            throw new HttpError('Too late for this one, son');
        }
        if (status === 'Available' || status === 'Fostered') {
            const adoptedPet = await petsDB.update(_id);
            if (!adoptedPet) {
                throw new HttpError('Could not find a pet for the provided id', 404);
            }
            let doc = adoptedPet.doc;
            doc.status = "Adopted";
            doc.userId = userId;
            await adoptedPet.save();
            res.status(200).json({ pet: doc });
        }
    } catch (error) {
        console.error(error)
        next(new HttpError(error.message, 404));
    }
};

const fosterByUserId = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const { status, _id } = req.body;
        await savedPetsController.delPetFromUserSavedPetsOnAdoptOrFoster(userId, _id);
        if (status === 'Adopted' || status === 'Fostered') {
            throw new HttpError('Too late for this one, son');
        }
        if (status === 'Available') {
            const fosteredPet = await petsDB.update(_id);
            if (!fosteredPet) {
                throw new HttpError('Could not find a pet for the provided id', 404);
            }
            let doc = fosteredPet.doc;
            doc.status = "Fostered";
            doc.userId = userId;
            await fosteredPet.save();
            res.status(200).json({ pet: doc });
        }
    } catch (error) {
      console.error(error)
      next(new HttpError(error.message, 404));
    }
};

const returnPet = async (req, res, next) => {
    try {
      const { status, _id } = req.body;
      if (status !== 'Fostered' && status !== 'Adopted') {
        throw new HttpError('Invalid status', 400);
      }
      const unavailablePet = await petsDB.update(_id);
      if (!unavailablePet) {
        throw new HttpError('Could not find a pet for the provided id', 404);
      }
      if (req.userData.userId !== unavailablePet.doc.userId) {
        throw new HttpError('You cannot return someone else\'s pet.', 403);
      }
      const doc = unavailablePet.doc;
      doc.status = 'Available';
      doc.userId = '';
      try {
        await unavailablePet.save();
      } catch (error) {
        throw new HttpError('Could not update. Please try again.', 500);
      }
      res.status(200).json({ pet: doc });
    } catch (error) {
      console.error(error)
      next(error);
    }
  };
  
  exports.createPet = createPet;
  exports.getAllPets = getAllPets;
  exports.getPetById = getPetById;
  exports.getPetsByUserId = getPetsByuserId;
  exports.getPetsByFilter = getPetsByFilter;
  exports.updatePetById = updatePetById;
  exports.adoptByUserId = adoptByUserId;
  exports.fosterByUserId = fosterByUserId;
  exports.returnPet = returnPet;