'use strict';

const { HttpParser } = require("./parser");

class FreeList {
  constructor(name, max, ctor) {
    this.name = name;
    this.ctor = ctor;
    this.max = max;
    this.list = [];
  }

  alloc() {
    return this.list.length > 0 ?
      this.list.pop() :
      ReflectApply(this.ctor, this, arguments);
  }

  free(obj) {
    if (this.list.length < this.max) {
      this.list.push(obj);
      return true;
    }
    return false;
  }
}

const parsers = new FreeList('parsers', 1000, function parsersCb(mode) {
  const parser = new HttpParser(mode);
  return parser;
});

function freeParser(parser) {
    if (parser) {
        parser.free()
    }
}

// Character code ranges for valid HTTP tokens

module.exports = {
    FreeList,
    freeParser,
    parsers,
};