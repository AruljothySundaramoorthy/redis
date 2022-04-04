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

module.exports = redisroute; 