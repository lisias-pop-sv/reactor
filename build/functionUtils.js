function isString(variable) {
  if (typeof variable == 'string')
    return true;
}

function add(arg) {
  return arg + 3;
}

function map(list, iteratee) {
  var i, result = [];
  for(i = 0; i < list.length; i++) {
    result.push(iteratee(list[i]));
  }
  return result;
}

function reduce(list, iteratee, memo) {
  var i;
  if(arguments[2] === undefined) {
    memo = list[0];
    for(i = 1; i < list.length; i++) {
      iteratee(memo, list[i]);
      memo += list[i];
    }
    return memo;
  } else {
    for(i = 0; i < list.length; i++) {
      iteratee(memo, list[i]);
      memo += list[i];
    }
    return memo;
  }
}

function filter(list, predicate) {
  var result = [], i;
  for(i = 0; i < list.length; i++) {
    if(predicate(list[i])) {
      result.push(list[i]);
    }
  }
  return result.length !== 0 ? result : undefined ;
}

function every(list, predicate) {
  var i;
  for(i = 0; i < list.length; i++) {
    if(!predicate(list[i])) {
      return false;
    }
  }
  return true;
}

function some(list, predicate) {
  var i;
  for(i = 0; i < list.length; i++) {
    if(predicate(list[i])) {
      return true;
    }
  }
  return false;
}

function bind(func, object) {
  var args = [].slice.call(arguments, 2);
  return function() {
    return func.apply(object, args.concat([].slice.call(arguments)));
  };
}

function findIndex(array, predicate) {
  var i;
  for(i = 0; i < array.length; i++) {
    if(predicate(array[i])) {
      return i;
    }
  }
}

function zip() {
  var result = [];
  if (arguments.length > 0) {
    var i, j, maxLength = 1;
    for (j = 0; j < maxLength; j++) {
      result.push([]);
      for (i = 0; i < arguments.length; i++) {
        if (arguments[i].length > maxLength) {
          maxLength = arguments[i].length;
        }
        result[j].push(arguments[i][j]);
      }
    }
  }
  return result;
}

function without(array) {
  var i, j, result = array.slice();
  for (j = 1; j < arguments.length; j++) {
    for (i = 0; i < result.length; i++) {
      if (arguments[j] === result[i]) {
        result.splice(i--, 1);
      }
    }
  }
  return result;
}

function difference(array, others) {
  var i, j, result = array;
  others = [].concat.apply([], [].slice.call(arguments, 1), 1);
  for (i = 0; i < array.length; i++) {
    for (j = 0; j < others.length; j++) {
      if (array[i] === others[j]) {
        result.splice([i], 1);
        others.splice([i], 1);
      }
    }
  }
  others = null;
  return result;
}

function flatten(array) {
  var i, j, subArray;
  if (typeof array === 'object') {
    for (i = 0; i < array.length; i++) {
      if (Array.isArray(array[i])) {
        subArray = flatten(array[i]);
        for (j = 0; j < subArray.length; j++) {
          array.splice(i++, 0, subArray[j]);
        }
        array.splice(i--, 1);
      }
    }
    return array;
  } else {
    return [];
  }
}

function union() {
  if (arguments.length > 1) {
    var i, j, result = [];
    for (i = 0; i < arguments.length; i++) {
      result = result.concat(arguments[i]);
    }
    for (i = 0; i < result.length; i++) {
      for (j = i + 1; j < result.length; j++) {
        if (result[i] === result[j]) {
          result.splice(j, 1);
        }
      }
    }
    return result;
  } else if (arguments.length == 1) {
    return arguments[0];
  } else if (arguments.length === 0) {
    return [];
  }
}

function intersection(result) {
  if (arguments.length > 1) {
    var i, j, k, isCommon;
    for (i = 1; i < arguments.length; i++) {
      for (k = 0; k < result.length; k++) {
        isCommon = false;
        for (j = 0; j < arguments[i].length; j++) {
          if (result[k] === arguments[i][j]) {
            isCommon = true;
          }
        }
        if (!isCommon) {
          result.splice(k, 1);
        }
      }
    }
    return result;
  } else if (arguments.length == 1) {
    return arguments[0];
  } else if (arguments.length === 0) {
    return [];
  }
}

function indexOf(array, value, sorted) {
  var start = 0;
  function iterativeSearch(array, value, start) {
    var i;
    for(i = start; i < array.length; i++) {
      if(array[i] === value) {
        return i;
      }
    }
    return -1;
  }
  function binarySearch(array, value) {
    var start = 0, end = array.length - 1;
    while (true) {
      switch (true) {
      case (array[start] === value):
        return start;
      case (end - start == 1 && array[end] === value):
        return end;
      case (end - start == 1 && array[start] !== value && array[end] !== value):
        return -1;
      case (value < array[0] || array[array.length - 1] < value):
        return -1;
      case (value <= array[Math.round((end - start) / 2) + start]):
        end = Math.round((end - start) / 2) + start;
        break;
      case (array[Math.round((end - start) / 2) + start] <= value):
        start = Math.round((end - start) / 2) + start;
        break;
      case ((array[Math.round((end - start) / 2) + start] === value)):
        return Math.round((end - start) / 2) + start;
      }
    }
    return -1;
  }
  switch (typeof sorted) {
  case 'boolean':
    return binarySearch(array, value);
  case 'number':
    start = sorted;
  default:
    return iterativeSearch(array, value, start);
  }
}

function lastIndexOf(array, value, index) {
  var start, i;
  typeof index === 'number' ? start = index : start = array.length - 1;
  for (i = start; 0 <= i; i--) {
    if (array[i] === value) {
      return i;
    }
  }
  return -1;
}

function range(start, stop, step) {
  var s = start, e = stop, i = 1, j, result = [];
  switch (arguments.length) {
  case (3):
    if ((start > stop && step >= 0) || (start < stop && step < 0 )) {
      return [];
    }
    i = step;
    if ((start < stop && step === 0)) {
      s = start;
      i = 1;
    }
    break;
  case (2):
    s = start;
    if (start >= stop) {
      return [];
    }
    break;
  case (1):
    if (start > 0) {
      s = 0;
      e = start;
    } else {
      return [];
    }
    break;
  default:
    s = start;
  }
  for (j = s; Math.abs(j) < Math.abs(e); j += i) {
    result.push(j);
  }
  return result;
}

function compact(array) {
  var i, result = [];
  for (i = 0; i < array.length; i++) {
    if(array[i]) {
      result.push(array[i]);
    }
  }
  return result;
}

function isArray(object) {
  return {}.toString.call(object) === '[object Array]' ? true : false;
}

function isFunction(object) {
  return {}.toString.call(object) === '[object Function]' ? true : false;
}

function rest(array, index) {
  var i, result = [];
  i = (index === false) ? 0 : 1 ;
  for (; i < array.length; i++) {
    result.push(array[i]);
  }
  return result;
}
function last(array, n) {
  var result = array;
  switch (true) {
  case (typeof n === 'undefined' || isNaN(n)):
    return Number(result.length - 1);
  case (typeof Number(n) === 'number'):
    n = result.length - n;
    break;
  default:
    return Number(result.length - 1);
  }
  result.splice(0, n);
  return result;
}

function uniq(array, isSorted, iteratee) {
  if (arguments.length === 0) {
    return [];
  }
  var i = 0, result = array.slice();
  switch (true) {
  case (arguments.length === 3):
    for (i = 0; i < result.length; i++) {
      while (result[i + 1] === result[i]) {
        result.splice(i, 1);
      }
      result[i] = iteratee(result[i]);
    }
    break;
  case (arguments.length === 2 && isSorted === true):
    for (i = 0; i < result.length; i++) {
      while (result[i + 1] === result[i]) {
        result.splice(i, 1);
      }
    }
    break;
  case (arguments.length === 2 && isFunction(isSorted)):
    for (i = 0; i < result.length; i++) {
      result = result.slice(0, i + 1).concat(without(result.slice(i, result.length), result[i]));
      result[i] = isSorted(result[i]);
    }
    break;
  default: {
    for (i = 0; i < result.length; i++) {
      result = result.slice(0, i + 1).concat(without(result.slice(i, result.length), result[i]));
    }
  }
  }
  return result;
}

function compose() {
  var args = arguments;
  return function () {
    var i, func = args[args.length - 1].apply(this, arguments);
    for (i = args.length - 2; 0 <= i; i--) {
      func = args[i](func);
    }
    return func;
  };
}

function partial(func) {
  var args = [].slice.call(arguments, 1);
  return function() {
    var i, argsCount = 0;
    for (i = 0; i < (args.length + arguments.length); i++) {
      if (args[i] === _) {
        args[i] = arguments[argsCount++];
      }
    }
    args = args.concat([].slice.call(arguments, argsCount));
    return func.apply(this, args);
  };
}

function negate(predicate) {
  return function () {
    return !predicate.apply(this, arguments);
  };
}

function random(min, max) {
  if (!max) {
    max = 0;
  }
  if (min > max) {
    max = [min, min = max][0];
  }
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function inherit(constructor, superConstructor) {
  constructor.prototype = new superConstructor();
  constructor.super_ = superConstructor;
}

function batchProcessing(array, processor, chunkSize, timeout) {
  var i = 0, result = [], repeat;
  if (chunkSize > 0) {
    repeat = setInterval( function () {
      result = result.concat(processor(array.slice(i, i + chunkSize)));
      if (i + chunkSize >= array.length) {
        clearInterval(repeat);
        return result;
      }
      i += chunkSize;
    }, timeout);
  }
}

function addClass(element, classes) {
  var i, substitute;
  for (i = 0; i < classes.split(/\s+/).length; i++) {
    substitute  = new RegExp('\\b' + classes.split(/\s+/)[i] + '\\b', 'g');
    if (element.className.search(substitute) == -1) {
      element.className += (element === '' ? '' : ' ') + classes.split(/\s+/)[i];
    }
  }
  element.className = element.className.replace(/(^\s+)/g, '');
}

function toggleClass(element, classes) {
  var i, substitute;
  for (i = 0; i < classes.split(/\s+/).length; i++) {
    substitute  = new RegExp('\\b' + classes.split(/\s+/)[i] + '\\b', 'g');
    if (element.className.search(substitute) > -1) {
      element.className = element.className.replace(substitute , '');
    } else {
      element.className += (element === '' ? '' : ' ') + classes.split(/\s+/)[i];
    }
  }
  element.className = element.className.replace(/(^\s+)/g, '');
}

function position(element) {
  var elementProperties = getComputedStyle(element),
    bodyProperties = getComputedStyle(document.getElementsByTagName('BODY')[0]),
    borderLeft = (bodyProperties.position != 'relative' &&
                  getComputedStyle(element.parentNode).position != 'relative') ?
                  parseInt(bodyProperties.borderLeftWidth) : 0 ,
    borderTop = (bodyProperties.position != 'relative' &&
                 getComputedStyle(element.parentNode).position != 'relative') ?
                 parseInt(bodyProperties.borderTopWidth) : 0;
  if (element.tagName == 'BODY') {
    return {left: 0, top: 0};
  }
  return {
    left: element.offsetLeft - parseInt(elementProperties.marginLeft) + borderLeft,
    top : element.offsetTop  - parseInt(elementProperties.marginTop)  + borderTop
  };
}

function offset(element) {
  var elementProperties = getComputedStyle(element),
    parentOffsets = element,
    left = parseInt(elementProperties.marginLeft),
    top = parseInt(elementProperties.marginTop);
  while (parentOffsets.tagName != 'HTML') {
    parentOffsets = parentOffsets.parentNode;
    left += parseInt(getComputedStyle(parentOffsets).borderLeftWidth) +
            parseInt(getComputedStyle(parentOffsets).paddingLeft) +
            parseInt(getComputedStyle(parentOffsets).marginLeft);

    top += parseInt(getComputedStyle(parentOffsets).borderTopWidth) +
           parseInt(getComputedStyle(parentOffsets).paddingTop)+
           parseInt(getComputedStyle(parentOffsets).marginTop);
  }
  return {
    left: left,
    top : top
  };
}

function jq(arg) {
  if (typeof arg == 'string') {
    return document.querySelectorAll(arg);
  } else {
    return arg;
  }
}

function append(targetNode, contentToInsert) {
  var i;
  if (typeof contentToInsert == 'object') {
    for (i = 0; i < contentToInsert.length; i++) {
      _appendCloneToElement([].slice.call(targetNode, 0, targetNode.length), contentToInsert[i]);
      targetNode[targetNode.length - 1].appendChild(contentToInsert[i]);
    }
  } else {
    _appendHTMLToElement(targetNode, contentToInsert);
  }
}

function _appendHTMLToElement(targetNode, htmlString) {
  var i;
  for (i = 0; i < targetNode.length; i++) {
    targetNode[i].insertAdjacentHTML('beforeend', htmlString);
  }
}

function _appendCloneToElement(targetNode, listOfNodes) {
  var i;
  for (i = 0; i < targetNode.length - 1; i++) {
    targetNode[i].appendChild(listOfNodes.cloneNode(true));
  }
}

function on(nodeList, events, selector, handler) {
  var i, j, eventList = events.replace(/(^\s+|\s+$)/g, '').split(/\s+/), args = arguments;
  for (i = 0; i < jq(nodeList).length; i++) {
    for (j = 0; j < eventList.length; j++) {
      jq(nodeList)[i].addEventListener(eventList[j], function(event) {
        var k;
        if (args.length == 4 && selector) {
          for (k = 0; k < jq(selector).length; k++) {
            if (jq(selector)[k] == event.target) {
              handler.call(event.target);
              break;
            }
          }
        }
        if (args.length == 4 && !selector){
          handler.call(event.currentTarget);
        }
        if (args.length == 3) {
          selector.call(event.currentTarget);
        }
      });
    }
  }
}
