Adblock Plus Core performance test
==================================

This is an experiment. Don't expect production quality code, it currently expects a Unix-like operating system and default application paths. The point is quickly comparing performance of the `master` (classic) and `emscripten` branches of the [adblockpluscore repository](https://github.com/adblockplus/adblockpluscore).

Requirements
------------
* Node.js 7.0 or higher
* Python 2.7
* Firefox 40 or higher
* [marionette_driver Python module](https://marionette-client.readthedocs.io/en/master/#getting-the-client)
* [jinja2 Python module](http://jinja.pocoo.org/docs/2.9/intro/#installation)

How to use
----------
Check out `master` and `emscripten` branches of the [adblockpluscore repository](https://github.com/adblockplus/adblockpluscore) in two different directories, make sure to run `compile` for the latter (additional requirements of that branch apply). Adjust `CLASSIC_LIB` and `EMSCRIPTEN_LIB` paths at the top of `run_test` script if necessary. Then execute `run_test` script. The script will currently time processing of EasyList filters, ten times for each combination of Node.js vs. Firefox and `master` branch vs. `emscripten` branch. It will then print the median values for execution time and memory usage.
