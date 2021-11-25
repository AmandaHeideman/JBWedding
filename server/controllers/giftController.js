const GiftModel = require('../models/GiftsModel');
const GuestGiftModel = require('../models/GuestGiftsModel');
const { getUserId } = require("../auth");

const getAllGifts = async (req, res) => {
  try {
    const allGifts = await GiftModel.find();
    res.status(200).json(allGifts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const newGift = (req, res, next) => {
  let title = req.body.title || "test";
  let purchased = false;
  let nonPurchasable = req.body.nonPurchasable || false;
  const newGift = new GiftModel({
    title, 
    purchased,
    nonPurchasable
  });
  newGift
    .save()
    .catch((err) => {
      res.status(400).json({ msg: err.message });
    })
    .then(res.json({ Added: newGift.title }));
}

const newGuestGift = (req, res, next) => {
  const { title } = req.body;
  const newGift = new GuestGiftModel({
    title
  });
  newGift
    .save()
    .catch((err) => {
      res.status(400).json({ msg: err.message });
    })
    .then(res.json({ Added: newGift.title }));
}

const getGuestGifts = async (req, res) => {
  try {
    const allGuestGifts = await GuestGiftModel.find();
    res.status(200).json(allGuestGifts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

const updateWishlist = async (req, res, next) => {
  const { title, purchased } = req.body;
  const userId = getUserId(req);
  console.log("title: ", title, " purchased: ", purchased);
  try {
      GiftModel.findOneAndUpdate(
        { title }, 
        { $set: { 
          purchased: purchased,
          boughtBy: userId
        } }
        )
        .catch((err) => res.status(500).json({ message: err.message }));
    
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

module.exports = { getAllGifts, newGift, updateWishlist, newGuestGift, getGuestGifts };