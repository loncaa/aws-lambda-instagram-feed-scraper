# AWS Lambda - Instagram Feed Scraper
Proxy server for fetching user Instagram feed data.  

## S3 CORS Configuration Notes

```
[
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "GET"
        ],
        "AllowedOrigins": [
            "*"
        ],
        "ExposeHeaders": [],
        "MaxAgeSeconds": 3000
    }
]
```
