# Connect Memcached
connect-memcached is a memcached session store backed by [node-memcached](https://github.com/3rd-Eden/node-memcached)

## Example

    var connect = require('connect')
	 	  , MemcacheStore = require('./connect-memcached');

    connect.createServer(
      connect.cookieDecoder(),
      express.session({ store: new MemcacheStore({ memcache_host: "127.0.0.1", memcache_port: 11211})})
    );
