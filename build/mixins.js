var SetIntervalMixin = {
  componentWillMount: function() {
    this.intervals = [];
  },
  setInterval: function() {
    this.intervals.push(setInterval.apply(null, arguments));
  },
  componentWillUnmount: function() {
    this.intervals.forEach(clearInterval);
  }
};
var ClearIntervalMixin = {
  componentWillMount: function() {
    this.intervals = [];
  },
  clearInterval: function() {
    this.intervals.push(clearInterval.apply(null, arguments));
  },
  componentWillUnmount: function() {
    this.intervals.forEach(clearInterval);
  }
};

var ToggleClassMixin = {
  toggleClass: function (element, classes) {
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
}
