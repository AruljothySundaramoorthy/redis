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
 * @route POST /
 * @group RedisData
 * @param {savedata.model} body.body.required
 * @produces application/json application/xml
 * @consumes application/json application/xml
 * @returns {response.model} 200 - {"data": true}
 * @returns {response.model} 400 - Bad request 
 * @returns {response.model} 500 - Server Error 
 */

redisroute.post(
    `/`,
    rediscontoller.saveRedisData
);

/**
 * RedisData - Get Redis Keys
 * @route GET /
 * @group RedisData 
 * @produces application/json application/xml
 * @consumes application/json application/xml
 * @returns {response.model} 200 - {"data": true}
 * @returns {response.model} 400 - Bad request  
 * @returns {response.model} 500 - Server Error 
 */
redisroute.get(`/`, rediscontoller.getAllKeys);


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
 * RedisData - Get Redis Data by Keys
 * @route GET /{key}
 * @group RedisData 
 * @param {string} key.path.required
 * @produces application/json application/xml
 * @consumes application/json application/xml
 * @returns {response.model} 200 - {"data": true}
 * @returns {response.model} 400 - Bad request  
 * @returns {response.model} 500 - Server Error 
 */
redisroute.get(`/:key`, rediscontoller.getRedisDayaByKeys);

module.exports = redisroute; 