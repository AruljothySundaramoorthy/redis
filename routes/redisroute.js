// const express = require('express');
const redisroute = require('express').Router()

const rediscontoller = require('../controllers/rediscontroller');

/**
 * @typedef response
 * @property {object} data
 * @property {boolean} error
 * @property {boolean} exception
 *
 */

/**
     * @typedef savedata
     * @group RedisData
     * @property {string} key
     * @property {string} value
     *
     */

/**
 * RedisData - Add Redis data
 * @route POST /addredisdata
 * @group RedisData
 * @param {savedata.model} body.body.required
 * @produces application/json application/xml
 * @consumes application/json application/xml
 * @returns {response.model} 200 - {"data": true}
 * @returns {response.model} 400 - Bad request 
 * @returns {response.model} 500 - Server Error 
 */

redisroute.post(
    `/addredisdata`,
    rediscontoller.saveRedisData
);

/**
 * RedisData - Remove all redis information
 * @route GET /clean
 * @group RedisData 
 * @produces application/json application/xml
 * @consumes application/json application/xml
 * @returns {response.model} 200 - {"data": true}
 * @returns {response.model} 400 - Bad request  
 * @returns {response.model} 500 - Server Error 
 */
redisroute.get(`/clean`, rediscontoller.CleanRedis);

/**
 * RedisData - BuildMockdata
 * @route GET /buildmockdata
 * @group RedisData  
 * @produces application/json application/xml
 * @consumes application/json application/xml
 * @returns {response.model} 200 - {"data": true}
 * @returns {response.model} 400 - Bad request  
 * @returns {response.model} 500 - Server Error 
 */
redisroute.get(`/buildmockdata`, rediscontoller.buildmockdata);
/**
 * RedisData - Get Redis Keys
 * @route GET /getallkeys
 * @group RedisData 
 * @produces application/json application/xml
 * @consumes application/json application/xml
 * @returns {response.model} 200 - {"data": true}
 * @returns {response.model} 400 - Bad request  
 * @returns {response.model} 500 - Server Error 
 */
redisroute.get(`/getallkeys`, rediscontoller.getAllKeys);


/**
 * RedisData - Get Redis Data by Keys
 * @route GET /data/{key}
 * @group RedisData 
 * @param {string} key.path.required
 * @produces application/json application/xml
 * @consumes application/json application/xml
 * @returns {response.model} 200 - {"data": true}
 * @returns {response.model} 400 - Bad request  
 * @returns {response.model} 500 - Server Error 
 */
redisroute.get(`/data/:key`, rediscontoller.getRedisDayaByKeys);

/**
 * Users - Get User Info
 * @route GET /users
 * @group Users 
 * @produces application/json application/xml
 * @consumes application/json application/xml
 * @returns {response.model} 200 - {"data": true}
 * @returns {response.model} 400 - Bad request  
 * @returns {response.model} 500 - Server Error 
 */
redisroute.get(`/users`, rediscontoller.getUsersList);
/**
 * Users - Get User Info with access controle
 * @route GET /users/acl
 * @group Users 
 * @produces application/json application/xml
 * @consumes application/json application/xml
 * @returns {response.model} 200 - {"data": true}
 * @returns {response.model} 400 - Bad request  
 * @returns {response.model} 500 - Server Error 
 */
redisroute.get(`/users/acl`, rediscontoller.getUsersListwithACL);
/**
 * Users - Add user
 * @route POST /user/adduser/{username}
 * @group Users
 * @param {string} username.path.required
 * @produces application/json application/xml
 * @consumes application/json application/xml
 * @returns {response.model} 200 - {"data": true}
 * @returns {response.model} 400 - Bad request 
 * @returns {response.model} 500 - Server Error 
 */

redisroute.post(
    `/user/adduser/:username`,
    rediscontoller.createNewUser
);

module.exports = redisroute; 