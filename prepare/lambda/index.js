const AWS = require('aws-sdk');
const gm = require('gm').subClass({ imageMagick: true });

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
    gm(data.Body).resize(800, 800, '^').quality(90).toBuffer(ext, async (err, buffer) => {
      if (err) {
        console.error(err);
        return callback(err);
      }
      console.log('resized', `thumb/${filename}`, buffer.length);
      await s3.putObject({
        Bucket,
        Key: `thumb/${filename}`,
        Body: buffer,
      }).promise();
      console.log('put done');
      return callback(null, `thumb/${filename}`);
    });
  } catch (err) {
    console.error(err);
    return callback(err);
  }
};
