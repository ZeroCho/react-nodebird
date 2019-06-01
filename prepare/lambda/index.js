const AWS = require('aws-sdk');
const sharp = require('sharp');

const s3 = new AWS.S3();

exports.handler = (event, context, callback) => {
  const Bucket = event.Records[0].s3.bucket.name;
  const Key = event.Records[0].s3.object.key;
  console.log('Key', Key);
  const filename = Key.split('/')[Key.split('/').length - 1];
  s3.getObject({ Bucket, Key }, (err, data) => {
    if (err) {
      console.error(err);
      return callback(err);
    }
    return sharp(data.Body).resize(800).toBuffer()
      .then((buffer) => {
        return s3.putObject({
          Bucket,
          Key: `thumb/${filename}`,
          Body: buffer,
        }, (err) => {
          if (err) {
            console.error(err);
            return callback(err);
          }
          return callback(null, `thumb/${filename}`);
        });
      });
  });
};
