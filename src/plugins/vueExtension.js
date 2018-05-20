import filters from '../filters';

const VueExtension = {};

VueExtension.install = function (Vue) {
    // for(let i in filters) {
    //     if (filters.hasOwnProperty(i)) {
    //         Vue.filter(filters[i]);
    //     }
    // }

    Vue.$filters = Vue.prototype.$filters = filters;
};

export default VueExtension;