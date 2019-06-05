const AWS = require('aws-sdk');
const Sharp = require('sharp');

const S3 = new AWS.S3({ region: 'ap-northeast-2' });

exports.handler = async (event, context, callback) => {
  const Bucket = event.Records[0].s3.bucket.name;
  const Key = event.Records[0].s3.object.key;
  const filename = Key.split('/')[[Key.split('/').length - 1]];
  const ext = Key.split('.')[[Key.split('.').length - 1]];
  console.log(Bucket, Key, filename, ext);
  const requiredFormat = ext === 'jpg' ? 'jpeg' : ext;

  try {
    const s3Object = await S3.getObject({
      Bucket,
      Key,
    }).promise();
    console.log('original', s3Object.Body.length);

    const resizedImage = await Sharp(s3Object.Body)
      .resize(800, 800, {
        fit: 'inside',
      })
      .toFormat(requiredFormat)
      .toBuffer();

    await S3.putObject({
      Bucket,
      key: `thumb/${filename}`,
      Body: resizedImage,
    }).promise();
    console.log('put');

    return callback(null, `thumb/${filename}`);
  } catch (e) {
    console.error(e);
    return callback(e);
  }
};
