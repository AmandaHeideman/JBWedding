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
  let purchased = false;
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

const updateWishlist = async (req, res, next) => {
  const { purchased } = req.body;
  try {
    const allGifts = await GiftModel.find();
    allGifts.map((gift, index) => {
      title=gift.title
      GiftModel.findOneAndUpdate(
        { title }, 
        { $set: { 
          purchased: purchased[index]
        } }
        )
        .catch((err) => res.status(500).json({ message: err.message }));
    })
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

module.exports = { getAllGifts, newGift, updateWishlist };