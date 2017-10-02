export default class RedisMiddleware {
  constructor(app, redis) {
    this.app = app;
    this.redisClient = redis;
  }

  cacheCheck(req, res, next, self) {
    const key = self.generateCacheKey(req.path, req.query.age, req.query.page);
    self.redisClient.get(key, (err, data) => {
      if (err) {
        throw err;
      } else {
        // Check cached data is exist.
        if (data != null) {
          // Send cached data.
          console.log(`Response is sent from cache with key: ${key}`);
          res.status(200).send(JSON.parse(data));
        } else {
          // If there is no cached data then let leave the caching to the
          // final controller function.
          console.log(`Response is not sent from cache with key: ${key}`);
          next();
        }
      }
    });
  }

  /**
   * This function will create a key for making the request uniq.
   * 
   * @param {*Url path} path 
   * @param {*User age} age 
   * @param {*Url page} page 
   */
  generateCacheKey(path, age, page) {
    return `${path}_${age}_${page}`;
  }
}