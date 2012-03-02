What is SmashBomb?
==================

* Keyboard mashing as input.
* Data collection.
* Data reporting.
* Responsive.
* Fast!
* Fun!
* OpenSource.
* Extensible.

Epicenter
---------

* Chaos.
    * Keyboard mashing as input.
* Anonymity.
    * No authentication.
* Transparency.
    * Report we know about you.
* Order.
    * Report trends.

Configuration
-------------

* encoding: UTF-8 Strings
* timezone: UTC Timestamps

Installation
------------

1. Install [node.js](http://nodejs.org/)
   * Go to [http://nodejs.org/](http://npmjs.org/), click the download link and follow instructions for your platform.
1. Install [npm](http://npmjs.org/)
   * curl http://npmjs.org/install.sh | sh
1. git clone git://github.com/richard-flosi/smashbomb.git; cd smashbomb/; npm install -d

Dependencies
------------

* [node](https://github.com/joyent/node)
   Node.js is a platform built on Chrome's JavaScript runtime for easily building fast, 
   scalable network applications. Node.js uses an event-driven, non-blocking I/O model that makes it 
   lightweight and efficient, perfect for data-intensive real-time applications that run across 
   distributed devices.
* [npm](https://github.com/isaacs/npm)
   npm is a package manager for node. You can use it to install and publish your node programs.
   It manages dependencies and does other cool stuff.
* [express](https://github.com/visionmedia/express)
   High performance, high class web development for Node.js
* [node-jqtpl](https://github.com/kof/node-jqtpl)
   This is a port of jQuery's Template Engine to nodejs
* [bootstrap](https://github.com/twitter/bootstrap/)
   Simple and flexible HTML, CSS, and Javascript for popular user interface components and interactions.

Run
---

   node app.js

Browser Report
--------------
A report on what the users browser is telling us about them:

* IP Address
* Headers: Language-Accept, etc.
* Allows: Cookies, Javascript, etc.

Interface
---------

* Text input, no submit button.
* You have 5 seconds to complete your smash.
    * Fuse on bomb indicates time remaining.
* If you stop typing for more than 1 second, your smash is considered complete.

Validation
----------

* Min 6 characters.
    * We are considering a max input, but it will not be an initial concern.
* Not a word.
    * Requires a dictionary for each supported language.
* Limit of 2 consecutive repeats of a character.
* No pasted text.

Storage
-------

* Couchdb? Mongodb?
    * http://kkovacs.eu/cassandra-vs-mongodb-vs-couchdb-vs-redis
    * http://www.slideshare.net/gabriele.lana/couchdb-vs-mongodb-2982288
    * http://www.mongodb.org/display/DOCS/Comparing+Mongo+DB+and+Couch+DB
    * http://www.bytemuse.com/2011/06/getting-started-with-node-js-express-and-couchdb/
    * http://www.ianwootten.co.uk/2011/02/07/blog-rolling-with-couchdb-express-and-node-js
    * http://howtonode.org/express-mongodb
    * http://blog.mongodb.org/post/812003773/node-js-and-mongodb
    * CouchApps:
        * http://webcache.googleusercontent.com/search?q=cache:http://couchapp.org/page/list-of-couchapps
        * http://webcache.googleusercontent.com/search?q=cache:http://couchapp.org/

Results
-------
Live search after min characters? Or
Once the use has started smashing listen for them to stop for 1 second and submit request.

* Length of smash
* Timestamp of each keystroke
* Keyboard detection?
* Typing speed
* Related smashes by similar characters? Related content?
* Link to subscribe to this smash's RSS feed.
* Permalink for the smash.
* SubString/SubSmash results.
    * recursive smash results for all smashes that are a 
        substring of the current smash.
* Anagrams
    * Internet Anagram Server: http://wordsmith.org/anagram/
    * Anagram List: http://www.anagramlist.com/
    * Function.
    * Run on client side.
    * Can make addition requests to AnagramSearch.


Reports & Statistics
--------------------
Reports and statistics on aggregate data.
Bot that reports to the PanicRoom.
RSS Feed?

What is the PanicRoom?
======================
Chatroom with anonymous user chats and bot reports of 
SmashBomb activity and reports.

SmashRSS
========

* Subscribe to changes


AnagramSearch
=============

* Excepts smashes as input.
* Searches content of smashes for matches.
    * Allow for plugging-in other search engines too?
* Returns search results.


SmashPrint/SmashTouch
=====================
Print as in fingerprint.
For touchscreens.
See: http://support.cloud9ide.com/entries/20714998-touch-enable-interface

SmashBeats
==========
Music/instrument interface for touchscreen.
For touchscreens only?

