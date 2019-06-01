const AWS = require('aws-sdk');
const sharp = require('sharp');

const s3 = new AWS.S3();

exports.handler = async (event, context, callback) => {
  const Bucket = event.Records[0].s3.bucket.name;
  const Key = event.Records[0].s3.object.key;
  const filename = Key.split('/')[Key.split('/').length - 1];
  const ext = Key.split('.')[Key.split('.').length - 1];
  console.log('Key', Key, filename, ext);
  try {
    const data = await s3.getObject({ Bucket, Key }).promise();
    console.log('getObject', data);
    console.log('sharp', sharp(data.Body).resize);
    const buffer = await sharp(data.Body).resize(800).toBuffer();
    console.log('resized', `thumb/${filename}`, buffer.length);
    await s3.putObject({
      Bucket,
      Key: `thumb/${filename}`,
      Body: buffer,
    }).promise();
    console.log('put done');
    return callback(null, `thumb/${filename}`);
  } catch (err) {
    console.log(err);
    return callback(err);
  }
};
