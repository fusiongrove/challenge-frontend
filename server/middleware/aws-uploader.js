import aws from 'aws-sdk';
import config from 'config';

module.exports = {

    s3: null,

    init() {

        aws.config.update({
            region: config.aws.s3.region,
            credentials: {
                accessKeyId: config.aws.accessKeyId,
                secretAccessKey: config.aws.secretAccessKey
            }
        });

        this.s3 = new aws.S3({
            params: {
                Bucket: config.aws.s3.bucket
            }
        });
    },

    upload(data) {

        const params = {
            Bucket: config.CDN_BUCKET_NAME,
            Key: file_key,
            Body: binaryData.data,
            ACL: 'public-read'
        };

        return new Promise((resolve, reject) => {
            this.bucket.putObject(params, (err, data) => {
                if (!err) {
                    const _data = {
                        pic: file_uploaded_url,
                        eTag: data.ETag
                    };
                    resolve(_data)
                } else {
                    reject(err)
                }
            });
        });
    }
};
