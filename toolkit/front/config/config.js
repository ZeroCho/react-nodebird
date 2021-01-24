const prod = process.env.NODE_ENV === 'production';
module.exports = {
  backendUrl: prod ? 'https://api.sorayeon.shop' : 'http://localhost:3065',
  imageUrl: prod ? null : 'http://localhost:3065/images',
};
