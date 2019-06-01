const AWS = require('aws-sdk');
const sharp = require('sharp');

const s3 = new AWS.S3();

exports.handler = (event, context, callback) => {
  const Bucket = event.Records[0].s3.bucket.name;
  const Key = event.Records[0].s3.object.key;
  const filename = Key.split('/')[Key.split('/').length - 1];
  const ext = Key.split('.')[Key.split('.').length - 1];
  console.log('Key', Key, filename, ext);
  s3.getObject({ Bucket, Key }, (err, data) => {
    if (err) {
      console.log(err);
      return callback(err);
    }
    console.log('getObject', data);
    console.log('sharp', sharp, sharp(data.Body));
    sharp(data.Body).resize(800).toBuffer()
      .then((buffer) => {
        console.log('resized', `thumb/${filename}`, buffer.length);
        s3.putObject({
          Bucket,
          Key: `thumb/${filename}`,
          Body: buffer,
        }, (err) => {
          if (err) {
            console.log(err);
            return callback(err);
          }
          console.log('put done');
          return callback(null, `thumb/${filename}`);
        });
      })
      .catch((err) => {
        console.log(err);
        return callback(err);
      });
  });
};
