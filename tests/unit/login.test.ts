import {
  shallowMount,
  createLocalVue,
} from '@vue/test-utils';
import Vuex from 'vuex';
import Vue from 'vue';
import {cloneDeep} from 'lodash';
import exceptionElements from './exceptionElements';
import LoginForm from '@/components/LoginForm.vue';
import {storeModule} from '@/store/store-module';

Vue.config.ignoredElements = exceptionElements;
const localVue = createLocalVue();

localVue.use(Vuex);

const error: string = 'Error';

const appStore = new Vuex.Store(cloneDeep(storeModule));

describe('LoginForm.vue', () => {
  let actions: any;
  let store: any;
  let getters: any;

  beforeEach(() => {
    actions = {
      login: jest.fn(),
    };
    getters = {
      loading: (): boolean => false,
      error: (): string => error,
    };
    store = new Vuex.Store({
      actions,
      getters,
    });
  });
  it('action Login called', () => {
    const wrapper = shallowMount(LoginForm, {
      store,
      localVue,
    });
    const form = wrapper.find('b-form');
    form.trigger('submit');
    expect(actions.login).toHaveBeenCalled();
  });
  it('danger alert showed when has error', () => {
    const wrapper = shallowMount(LoginForm, {
      store,
      localVue,
    });
    expect(wrapper.text()).toMatch(error);
  });
  it('state of loading toggle when commit setLoading', () => {
    expect(appStore.state.loading).toBe(false);
    appStore.commit('setLoading', true);
    expect(appStore.state.loading).toBe(true);
  });
});
