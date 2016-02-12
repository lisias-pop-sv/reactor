/*eslint-disable no-unused-vars*/
let SetIntervalMixin = {
    componentWillMount() {
        this.intervals = [];
    },
    setInterval() {
        this.intervals.push(setInterval.apply(null, arguments));
    },
    componentWillUnmount() {
        this.intervals.forEach(clearInterval);
    }
};
let ClearIntervalMixin = {
    componentWillMount() {
        this.intervals = [];
    },
    clearInterval() {
        this.intervals.push(clearInterval.apply(null, arguments));
    },
    componentWillUnmount() {
        this.intervals.forEach(clearInterval);
    }
};

let ToggleClassMixin = {
    toggleClass (element, classes) {
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
};
