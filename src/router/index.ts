import { NavigationGuardNext, Route, RouteConfig } from 'vue-router';

export default (store:any) => {
  const refreshMemes = async (to:Route, from:Route, next:NavigationGuardNext<Vue>) => {
    await store.dispatch('getMemesFromAPI', this, { root: true });
    next();
  };

  const refreshTagsandMemes = async (to:Route, from:Route, next:NavigationGuardNext<Vue>) => {
    await store.dispatch('getTagsFromAPI', this, { root: true });
    await store.dispatch('getMemesFromAPI', this, { root: true });
    next();
  };
  const refreshCommandsandMemes = async (to:Route, from:Route, next:NavigationGuardNext<Vue>) => {
    await store.dispatch('getCommandsFromAPI', this, { root: true });
    await store.dispatch('getMemesFromAPI', this, { root: true });
    next();
  };

  const routes: Array<RouteConfig> = [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/HomeView.vue'),
      beforeEnter: async (to, from, next) => {
        await store.dispatch('getTagsFromAPI', this, { root: true });
        await store.dispatch('getMemesFromAPI', this, { root: true });
        next();
      },
    },
    {
      path: store.state.MEMES_PATH,
      name: 'All Memes',
      component: () => import('../views/meme-views/MemeView.vue'),
      beforeEnter: refreshMemes,
    },
    {
      path: store.state.COMMANDS_PATH,
      name: 'All Commands',
      component: () => import('../views/command-views/CommandView.vue'),
      beforeEnter: refreshCommandsandMemes,

    },
    {
      path: store.state.CREATE_COMMAND_PATH,
      name: 'Create Command',
      component: () => import('../views/command-views/CreateCommandView.vue'),
      beforeEnter: refreshCommandsandMemes,

    },
    {
      path: `${store.state.VIEW_COMMAND_PATH}/:commandID`,
      name: 'View Command',
      component: () => import('../views/command-views/DetailedCommandView.vue'),
      beforeEnter: refreshCommandsandMemes,

    },
    {
      path: `${store.state.VIEW_MEME_PATH}/:memeID`,
      name: 'View Meme',
      component: () => import('../views/meme-views/DetailedMemeView.vue'),
      beforeEnter: refreshMemes,
    },
    {
      path: `${store.state.CREATE_MEME_PATH}`,
      name: 'Create Meme',
      component: () => import('../views/meme-views/CreateMemeView.vue'),
      beforeEnter: refreshTagsandMemes,
    },
    {
      path: `${store.state.TAGS_PATH}`,
      name: 'Tags',
      component: () => import('../views/tag-views/TagView.vue'),
      beforeEnter: refreshTagsandMemes,
    },
  ];
  return routes;
};
