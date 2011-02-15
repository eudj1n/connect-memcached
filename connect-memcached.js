/*!
 * Connect - Memcached
 * Copyright(c) 2011 eudj1n <eudjin@gmail.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var Store = require('connect').session.Store
  , nMemcached = require('nMemcached');

/**
 * Initialize Memcached with the given `options`.
 *
 * @param {Object} options
 * @api public
 */

var MemcacheStore = module.exports = function MemcacheStore(options) {
  	
  	options = options || {};
  	this.client = new nMemcached(options.memcache_host + ":" + options.memcache_port);
	Store.call(this, options);
};

/**
 * Inherit from `Store`.
 */

MemcacheStore.prototype.__proto__ = Store.prototype;

/**
 * Attempt to fetch session by the given `hash`.
 *
 * @param {String} hash
 * @param {Function} fn
 * @api public
 */

MemcacheStore.prototype.get = function(hash, fn){

  this.client.get(hash, function(err, data){
		fn(err, data
        	? JSON.parse(data.toString())
        	: data);
	});
};

/**
 * Commit the given `sess` object associated with the given `hash`.
 *
 * @param {String} hash
 * @param {Session} sess
 * @param {Function} fn
 * @api public
 */

MemcacheStore.prototype.set = function(hash, sess, fn){

    var ttl = 3600,
    	sess = JSON.stringify(sess);   
    
    this.client.set(hash, sess, ttl, function(err, result){
    	
    	if(err) fn && fn(err);
      	fn && fn.apply(this, arguments);
    });
};

/**
 * Destroy the session associated with the given `hash`.
 *
 * @param {String} hash
 * @api public
 */

MemcacheStore.prototype.destroy = function(hash, fn){
  this.client.del(hash, fn);
};

/**
 * Fetch number of sessions.
 *
 * @param {Function} fn
 * @api public
 */

MemcacheStore.prototype.length = function(fn){
	this.client.stats( function( err, result ){
		return result[0].bytes;
	});
};

/**
 * Clear all sessions.
 *
 * @param {Function} fn
 * @api public
 */

MemcacheStore.prototype.clear = function(fn){
  this.client.flush(fn);
};
