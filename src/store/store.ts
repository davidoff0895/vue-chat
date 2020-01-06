import Vue from 'vue';
import Vuex from 'vuex';

import {storeOptions} from '@/store/store-config';

Vue.use(Vuex);

export default new Vuex.Store(storeOptions);
