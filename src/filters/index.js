import Vue from 'vue';
import difference from './difference.js';
Vue.filter('difference', difference);
export default {
    difference,
};