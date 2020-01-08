import Vue from 'vue';
import Vuex from 'vuex';

import {storeModule} from '@/store/store-module';

Vue.use(Vuex);

export default new Vuex.Store(storeModule);
