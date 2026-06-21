const SocialMedia = require('../models/SocialMedia');

function generateEmbedUrl(url, platform) {
  const trim = (s) => s.replace(/\/+$/, '');

  switch (platform) {
    case 'youtube': {
      const m = url.match(
        /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
      );
      if (m) return `https://www.youtube.com/embed/${m[1]}`;
      return url;
    }
    case 'tiktok': {
      const m = url.match(/tiktok\.com\/@[\w.-]+\/video\/(\d+)/);
      if (m) return `https://www.tiktok.com/embed/v2/${m[1]}`;
      if (url.includes('tiktok.com')) return url;
      return url;
    }
    case 'instagram': {
      const m = url.match(
        /instagram\.com\/(?:p|reel|tv)\/([a-zA-Z0-9_-]+)/
      );
      if (m) return `https://www.instagram.com/p/${m[1]}/embed`;
      return url;
    }
    case 'facebook': {
      return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}`;
    }
    default:
      return url;
  }
}

const listFeatured = async (req, res) => {
  try {
    const videos = await SocialMedia.find({ isActive: true, isFeatured: true }).sort({ order: 1 });
    res.json({ videos });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const listAll = async (req, res) => {
  try {
    const videos = await SocialMedia.find({ isActive: true }).sort({ order: 1 });
    res.json({ videos });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const adminList = async (req, res) => {
  try {
    const videos = await SocialMedia.find().sort({ order: 1 });
    res.json({ videos });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const create = async (req, res) => {
  try {
    const body = { ...req.body };
    body.embedUrl = generateEmbedUrl(body.url, body.platform);
    const maxOrder = await SocialMedia.findOne().sort({ order: -1 }).select('order');
    body.order = (maxOrder?.order ?? -1) + 1;
    const video = await SocialMedia.create(body);
    res.status(201).json({ video });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const body = { ...req.body };
    if (body.url && body.platform) {
      body.embedUrl = generateEmbedUrl(body.url, body.platform);
    }
    const video = await SocialMedia.findByIdAndUpdate(req.params.id, body, { new: true });
    if (!video) return res.status(404).json({ error: 'Video not found' });
    res.json({ video });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const video = await SocialMedia.findByIdAndDelete(req.params.id);
    if (!video) return res.status(404).json({ error: 'Video not found' });
    res.json({ message: 'Video deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const reorder = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids)) return res.status(400).json({ error: 'ids must be an array' });
    for (let i = 0; i < ids.length; i++) {
      await SocialMedia.findByIdAndUpdate(ids[i], { order: i });
    }
    res.json({ message: 'Reorder successful' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { listFeatured, listAll, adminList, create, update, remove, reorder };
