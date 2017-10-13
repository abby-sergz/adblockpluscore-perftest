let fs = require("fs");
let path = require("path");

let result = {};
result.memoryInitial = process.memoryUsage();

let data = fs.readFileSync(path.join(__dirname, "data", "easylist.txt"), "utf-8").split(/[\r\n]+/).slice(1);

function toMB(bytes)
{
  return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}

let {Filter} = require("filterClasses");
global.gc();

let startTime = process.hrtime()
for (let line of data)
  Filter.fromText(line);
let [seconds, nanos] = process.hrtime(startTime);
result.time = seconds + nanos / 1000000000;

data = null;
global.gc();
result.memoryFinal = process.memoryUsage();
result.diff = {
  memory: result.memoryFinal  .heapUsed + result.memoryFinal  .external -
          result.memoryInitial.heapUsed - result.memoryInitial.external,
  rss: result.memoryFinal.rss - result.memoryInitial.rss
};

try
{
  let memoryLayout = require("compiled").getMemoryLayout();
  result.memEmscriptenUsed = memoryLayout.dynamic_top;
}
catch (e)
{
  // Not Emscripten
}

console.log(JSON.stringify(result));
