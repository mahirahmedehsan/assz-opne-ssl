const SocialMedia = require('../models/SocialMedia');

function generateEmbedUrl(platform, url) {
  if (platform === 'youtube') {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
    if (match) return `https://www.youtube.com/embed/${match[1]}`;
  }
  if (platform === 'tiktok') {
    const match = url.match(/tiktok\.com\/@[\w.-]+\/video\/(\d+)/);
    if (match) return `https://www.tiktok.com/embed/v2/${match[1]}`;
  }
  if (platform === 'instagram') {
    const match = url.match(/instagram\.com\/(p|reel|tv)\/([a-zA-Z0-9_-]+)/);
    if (match) return `https://www.instagram.com/${match[1]}/${match[2]}/embed`;
  }
  if (platform === 'facebook') {
    const match = url.match(/facebook\.com\/.*\/videos\/(\d+)/);
    if (match) return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}`;
  }
  return url;
}

exports.listFeatured = async (req, res) => {
  try {
    const videos = await SocialMedia.find({ isActive: true, isFeatured: true }).sort({ order: 1 }).limit(6);
    res.json({ videos });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.list = async (req, res) => {
  try {
    const videos = await SocialMedia.find({ isActive: true }).sort({ order: 1 });
    res.json({ videos });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.adminList = async (req, res) => {
  try {
    const videos = await SocialMedia.find().sort({ order: 1 });
    res.json({ videos });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { platform, url, title, description, thumbnail, isFeatured, isActive } = req.body;
    const embedUrl = generateEmbedUrl(platform, url);
    const last = await SocialMedia.findOne().sort({ order: -1 });
    const video = await SocialMedia.create({ platform, url, embedUrl, title, description, thumbnail, isFeatured, isActive, order: (last?.order ?? -1) + 1 });
    res.status(201).json({ video });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { platform, url, title, description, thumbnail, isFeatured, isActive } = req.body;
    const embedUrl = generateEmbedUrl(platform, url);
    const video = await SocialMedia.findByIdAndUpdate(req.params.id, { platform, url, embedUrl, title, description, thumbnail, isFeatured, isActive }, { new: true });
    if (!video) return res.status(404).json({ error: 'Video not found' });
    res.json({ video });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const video = await SocialMedia.findByIdAndDelete(req.params.id);
    if (!video) return res.status(404).json({ error: 'Video not found' });
    res.json({ message: 'Video deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.reorder = async (req, res) => {
  try {
    const { ids } = req.body;
    for (let i = 0; i < ids.length; i++) {
      await SocialMedia.findByIdAndUpdate(ids[i], { order: i });
    }
    res.json({ message: 'Reordered' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
