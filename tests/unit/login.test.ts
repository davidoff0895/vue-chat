import {
  shallowMount,
  createLocalVue
} from '@vue/test-utils';
import Vuex from 'vuex';
import LoginForm from '@/components/LoginForm.vue';
import Vue from 'vue';
import exceptionElements from './exceptionElements';

Vue.config.ignoredElements = exceptionElements;
const localVue = createLocalVue();

localVue.use(Vuex);

const error: string = 'Error'


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
    expect(wrapper.text()).toMatch(error)
  });
});
