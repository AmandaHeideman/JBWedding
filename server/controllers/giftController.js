const GiftModel = require("../models/GiftsModel");

const getAllGifts = async (req, res) => {
  try {
    const allGifts = await GiftModel.find();
    res.status(200).json(allGifts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const newGift = (req, res, next) => {
  let title = "Elgrill";
  let purchased = 0;
  const newGift = new GiftModel({
    title, 
    purchased
  });
  newGift
    .save()
    .catch((err) => {
      res.status(400).json({ msg: err.message });
    })
    .then(res.json({ Added: newGift.title }));
}

module.exports = { getAllGifts, newGift };