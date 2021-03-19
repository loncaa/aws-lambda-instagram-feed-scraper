'use strict'
const axios = require('axios');
const AWS = require('aws-sdk');
AWS.config.logger = console;

const s3 = new AWS.S3();

function uploadFileToS3(uploadParams){
    return new Promise((resolve, reject) => {
        s3.upload(uploadParams, (err,result) => {
            if(err){
                return reject(err);
            }
            resolve(result);
        })
    })
}

function generateS3Payload(bufferedData){
    return {
        Bucket: process.env['BUCKET_NAME'],
        Key: 'nikbenfeed.json',
        ACL: 'public-read',
        Body: bufferedData,
        ContentType: 'application/json',
        ContentEncoding: 'base64'
    }
}

exports.handler = async (event, _) => {
    console.log('Lambda started');

    const token = process.env['IG_TOKEN'];
    const requestURL = `https://graph.instagram.com/me/media?access_token=${token}&fields=media_url,media_type,caption,permalink`;
    
    const response = await axios.get(requestURL)
    .then(async response => {
        const media = response.data;
        var buf = Buffer.from(JSON.stringify(media));

        const uploadParams = generateS3Payload(buf);
        const result = await uploadFileToS3(uploadParams);

        return {
            statusCode: 200,
            body: { status: 'success', result: result }
        }
    })
    .catch(error => {
        console.log(error, error.message);
        
        return {
            statusCode: 200,
            body: { status: 'failed', message: error.message }
        } 
    })

    return response;
};