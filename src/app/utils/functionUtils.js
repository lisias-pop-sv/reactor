/*eslint-disable  no-unused-vars*/
function isString(variable) {
    if (typeof variable === 'string'){
        return true;
    }
}

function add(arg) {
    return arg + 3;
}

function map(list, iteratee) {
    let result = [];
    for(let i = 0; i < list.length; i++) {
        result.push(iteratee(list[i]));
    }
    return result;
}

function reduce(list, iteratee, memo) {
    let i;
    let initialValue;
    if(arguments[2] === undefined) {
        initialValue = list[0];
        for(i = 1; i < list.length; i++) {
            iteratee(memo, list[i]);
            initialValue += list[i];
        }
        return memo;
    } else {
        for(i = 0; i < list.length; i++) {
            iteratee(memo, list[i]);
            initialValue += list[i];
        }
        return memo;
    }
}

function filter(list, predicate) {
    let result = [];
    let i;
    for(i = 0; i < list.length; i++) {
        if(predicate(list[i])) {
            result.push(list[i]);
        }
    }
    return result.length === 0 ? undefined : result ;
}

function every(list, predicate) {
    let i;
    for(i = 0; i < list.length; i++) {
        if(!predicate(list[i])) {
            return false;
        }
    }
    return true;
}

function some(list, predicate) {
    let i;
    for(i = 0; i < list.length; i++) {
        if(predicate(list[i])) {
            return true;
        }
    }
    return false;
}

function bind(func, object) {
    let args = [].slice.call(arguments, 2);
    return function() {
        return func.apply(object, args.concat([].slice.call(arguments)));
    };
}

function findIndex(array, predicate) {
    let i;
    for(i = 0; i < array.length; i++) {
        if(predicate(array[i])) {
            return i;
        }
    }
}

function zip() {
    let result = [];
    if (arguments.length > 0) {
        let i;
        let j;
        let maxLength = 1;
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
    let i;
    let j;
    let result = array.slice();
    for (j = 1; j < arguments.length; j++) {
        for (i = 0; i < result.length; i++) {
            if (arguments[j] === result[i]) {
                result.splice(i--, 1);
            }
        }
    }
    return result;
}

function difference(array, ...otherArrays) {
    let i;
    let j;
    let result = array;
    let others = [].concat(...otherArrays);
    for (i = 0; i < array.length; i++) {
        for (j = 0; j < others.length; j++) {
            if (array[i] === others[j]) {
                result.splice([i], 1);
                others.splice([i], 1);
            }
        }
    }
    return result;
}

function flatten(array) {
    let i;
    let j;
    let subArray;
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
        let i;
        let j;
        let result = [];
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
    } else if (arguments.length === 1) {
        return arguments[0];
    } else if (arguments.length === 0) {
        return [];
    }
}

function intersection(result) {
    if (arguments.length > 1) {
        let i;
        let j;
        let k;
        let isCommon;
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
    } else if (arguments.length === 1) {
        return arguments[0];
    } else if (arguments.length === 0) {
        return [];
    }
}

function indexOf(array, value, sorted) {
    let start = 0;
    function iterativeSearch(arrayToSearch, _value, startPoint) {
        let i;
        for(i = startPoint; i < arrayToSearch.length; i++) {
            if(arrayToSearch[i] === _value) {
                return i;
            }
        }
        return -1;
    }
    function binarySearch(arrayToSearch, _value) {
        let startPoint = 0;
        let end = arrayToSearch.length - 1;
        while (true) {
            switch (true) {
            case (arrayToSearch[startPoint] === _value):
                return startPoint;
            case (end - startPoint === 1 && arrayToSearch[end] === _value):
                return end;
            case (end - startPoint === 1 && arrayToSearch[startPoint] !== _value && arrayToSearch[end] !== _value):
                return -1;
            case (_value < arrayToSearch[0] || arrayToSearch[arrayToSearch.length - 1] < _value):
                return -1;
            case (_value <= arrayToSearch[Math.round((end - startPoint) / 2) + startPoint]):
                end = Math.round((end - startPoint) / 2) + startPoint;
                break;
            case (arrayToSearch[Math.round((end - startPoint) / 2) + startPoint] <= _value):
                startPoint = Math.round((end - startPoint) / 2) + startPoint;
                break;
            case ((arrayToSearch[Math.round((end - startPoint) / 2) + startPoint] === _value)):
                return Math.round((end - startPoint) / 2) + startPoint;
            }
        }
        return -1;
    }
    switch (typeof sorted) {
    case 'boolean':
        return binarySearch(array, value);
    case 'number':
        start = sorted;
        // fall through
    default:
        return iterativeSearch(array, value, start);
    }
}

function lastIndexOf(array, value, index) {
    let start;
    let i;
    typeof index === 'number' ? start = index : start = array.length - 1;
    for (i = start; 0 <= i; i--) {
        if (array[i] === value) {
            return i;
        }
    }
    return -1;
}

function range(start, stop, step) {
    let s = start;
    let e = stop;
    let i = 1;
    let j;
    let result = [];
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
    let i;
    let result = [];
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
    let i;
    let result = [];
    i = (index === false) ? 0 : 1 ;
    for (; i < array.length; i++) {
        result.push(array[i]);
    }
    return result;
}
function last(array, numberOfElements) {
    let result = array;
    let n = numberOfElements;
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
    let i = 0;
    let result = array.slice();
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
    let args = arguments;
    return function () {
        let i;
        let func = args[args.length - 1].apply(this, arguments);
        for (i = args.length - 2; 0 <= i; i--) {
            func = args[i](func);
        }
        return func;
    };
}

function partial(func) {
    let args = [].slice.call(arguments, 1);
    return function() {
        let i;
        let argsCount = 0;
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

function random(min, max = 0) {
    let low = min;
    let high = max;
    if (low > high) {
        [low, high] = [high, low];
    }
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function inherit(constructor, superConstructor) {
    constructor.prototype = new superConstructor();
    constructor.super_ = superConstructor;
}

function batchProcessing(array, processor, chunkSize, timeout) {
    let i = 0;
    let result = [];
    let repeat;
    if (chunkSize > 0) {
        repeat = setInterval(() => {
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
    let i;
    let substitute;
    for (i = 0; i < classes.split(/\s+/).length; i++) {
        substitute = new RegExp('\\b' + classes.split(/\s+/)[i] + '\\b', 'g');
        if (element.className.search(substitute) === -1) {
            element.className += (element === '' ? '' : ' ') + classes.split(/\s+/)[i];
        }
    }
    element.className = element.className.replace(/(^\s+)/g, '');
}

function toggleClass(element, classes) {
    let i;
    let substitute;
    for (i = 0; i < classes.split(/\s+/).length; i++) {
        substitute = new RegExp('\\b' + classes.split(/\s+/)[i] + '\\b', 'g');
        if (element.className.search(substitute) > -1) {
            element.className = element.className.replace(substitute, '');
        } else {
            element.className += (element === '' ? '' : ' ') + classes.split(/\s+/)[i];
        }
    }
    element.className = element.className.replace(/(^\s+)/g, '');
}

function position(element) {
    let elementProperties = getComputedStyle(element);
    let bodyProperties = getComputedStyle(document.getElementsByTagName('BODY')[0]);
    let borderLeft = (bodyProperties.position !== 'relative' &&
        getComputedStyle(element.parentNode).position !== 'relative') ?
        parseInt(bodyProperties.borderLeftWidth) : 0;
    let borderTop = (bodyProperties.position !== 'relative' &&
        getComputedStyle(element.parentNode).position !== 'relative') ?
        parseInt(bodyProperties.borderTopWidth) : 0;
    if (element.tagName === 'BODY') {
        return {left: 0, top: 0};
    }
    return {
        left: element.offsetLeft - parseInt(elementProperties.marginLeft) + borderLeft,
        top : element.offsetTop - parseInt(elementProperties.marginTop) + borderTop
    };
}

function offset(element) {
    let elementProperties = getComputedStyle(element);
    let parentOffsets = element;
    let left = parseInt(elementProperties.marginLeft);
    let top = parseInt(elementProperties.marginTop);
    while (parentOffsets.tagName !== 'HTML') {
        parentOffsets = parentOffsets.parentNode;
        left += parseInt(getComputedStyle(parentOffsets).borderLeftWidth) +
        parseInt(getComputedStyle(parentOffsets).paddingLeft) +
        parseInt(getComputedStyle(parentOffsets).marginLeft);

        top += parseInt(getComputedStyle(parentOffsets).borderTopWidth) +
        parseInt(getComputedStyle(parentOffsets).paddingTop) +
        parseInt(getComputedStyle(parentOffsets).marginTop);
    }
    return {
        left,
        top
    };
}

function jq(arg) {
    if (typeof arg === 'string') {
        return document.querySelectorAll(arg);
    } else {
        return arg;
    }
}

function _appendCloneToElement(targetNode, listOfNodes) {
    let i;
    for (i = 0; i < targetNode.length - 1; i++) {
        targetNode[i].appendChild(listOfNodes.cloneNode(true));
    }
}

function _appendHTMLToElement(targetNode, htmlString) {
    let i;
    for (i = 0; i < targetNode.length; i++) {
        targetNode[i].insertAdjacentHTML('beforeend', htmlString);
    }
}

function append(targetNode, contentToInsert) {
    let i;
    if (typeof contentToInsert === 'object') {
        for (i = 0; i < contentToInsert.length; i++) {
            _appendCloneToElement([].slice.call(targetNode, 0, targetNode.length), contentToInsert[i]);
            targetNode[targetNode.length - 1].appendChild(contentToInsert[i]);
        }
    } else {
        _appendHTMLToElement(targetNode, contentToInsert);
    }
}

function on(nodeList, events, selector, handler) {
    let i;
    let j;
    let eventList = events.replace(/(^\s+|\s+$)/g, '').split(/\s+/);
    let args = arguments;
    for (i = 0; i < jq(nodeList).length; i++) {
        for (j = 0; j < eventList.length; j++) {
            jq(nodeList)[i].addEventListener(eventList[j], event => {
                let k;
                if (args.length === 4 && selector) {
                    for (k = 0; k < jq(selector).length; k++) {
                        if (jq(selector)[k] === event.target) {
                            handler.call(event.target);
                            break;
                        }
                    }
                }
                if (args.length === 4 && !selector){
                    handler.call(event.currentTarget);
                }
                if (args.length === 3) {
                    selector.call(event.currentTarget);
                }
            });
        }
    }
}
