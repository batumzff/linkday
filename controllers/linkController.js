const Link = require('../models/Link');

const getLinks = async (req, res, next) => {
  try {
    const links = await Link.find({ 
      userId: req.user._id 
    }).sort({ order: 1, createdAt: 1 });

    res.json({
      success: true,
      links
    });
  } catch (error) {
    next(error);
  }
};

const createLink = async (req, res, next) => {
  try {
    const { title, url, description, icon } = req.body;

    if (!title || !url) {
      return res.status(400).json({
        success: false,
        message: 'Title and URL are required'
      });
    }

    const linkCount = await Link.countDocuments({ userId: req.user._id });

    const link = await Link.create({
      userId: req.user._id,
      title,
      url,
      description,
      icon,
      order: linkCount
    });

    res.status(201).json({
      success: true,
      message: 'Link created successfully',
      link
    });
  } catch (error) {
    next(error);
  }
};

const updateLink = async (req, res, next) => {
  try {
    const { title, url, description, icon, isActive } = req.body;
    const { id } = req.params;

    const link = await Link.findOne({ _id: id, userId: req.user._id });

    if (!link) {
      return res.status(404).json({
        success: false,
        message: 'Link not found'
      });
    }

    const updateData = {};
    if (title) updateData.title = title;
    if (url) updateData.url = url;
    if (description !== undefined) updateData.description = description;
    if (icon !== undefined) updateData.icon = icon;
    if (isActive !== undefined) updateData.isActive = isActive;

    const updatedLink = await Link.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Link updated successfully',
      link: updatedLink
    });
  } catch (error) {
    next(error);
  }
};

const deleteLink = async (req, res, next) => {
  try {
    const { id } = req.params;

    const link = await Link.findOne({ _id: id, userId: req.user._id });

    if (!link) {
      return res.status(404).json({
        success: false,
        message: 'Link not found'
      });
    }

    await Link.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Link deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

const reorderLinks = async (req, res, next) => {
  try {
    const { linkIds } = req.body;

    if (!Array.isArray(linkIds)) {
      return res.status(400).json({
        success: false,
        message: 'linkIds must be an array'
      });
    }

    const bulkOps = linkIds.map((linkId, index) => ({
      updateOne: {
        filter: { _id: linkId, userId: req.user._id },
        update: { order: index }
      }
    }));

    await Link.bulkWrite(bulkOps);

    res.json({
      success: true,
      message: 'Links reordered successfully'
    });
  } catch (error) {
    next(error);
  }
};

const incrementClick = async (req, res, next) => {
  try {
    const { linkId } = req.params;

    const link = await Link.findById(linkId);

    if (!link || !link.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Link not found'
      });
    }

    await Link.findByIdAndUpdate(linkId, {
      $inc: { clicks: 1 }
    });

    res.json({
      success: true,
      message: 'Click recorded',
      redirectUrl: link.url
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getLinks,
  createLink,
  updateLink,
  deleteLink,
  reorderLinks,
  incrementClick
};