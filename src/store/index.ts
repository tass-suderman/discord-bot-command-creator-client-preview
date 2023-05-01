import Vue from 'vue';
import Vuex from 'vuex';
import Tag from '@/models/Tag';
import Command from '@/models/Command';
import Meme from '@/models/Meme';
import VueCookies from 'vue-cookies';
import { ValidationError } from 'class-validator';

Vue.use(Vuex);
const COOKIE_EXPIRY = '30m';
Vue.use(VueCookies, { expires: COOKIE_EXPIRY });

const BACKEND_URL = 'http://localhost:3030';
const MEME_API = `${BACKEND_URL}/memes`;
const COMMAND_API = `${BACKEND_URL}/commands`;
const TAG_API = `${BACKEND_URL}/tags`;
const DISCORD_LOGIN = 'https://discord.com/api/oauth2/authorize?client_id=1049837219948527646&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2F&response_type=token&scope=identify';
const DISCORD_API = 'https://discord.com/api/v9/users/@me';
const METHOD_TYPES: string[] = ['GET', 'POST', 'PUT', 'DELETE'];
const DEFAULT_FETCH_OPTIONS: any = {
  method: 'GET',
  credentials: 'include',
  referrerPolicy: 'strict-origin-when-cross-origin',
  headers: {
    'X-Requested-With': 'XmlHttpRequest',
    'Content-Type': 'application/json; charset=utf-8',
  },
};
const CONFLICT_ERR = 'This meme cannot be deleted because it is used in commands.';
const sessionUser = {
  sessionToken: '', tokenType: '', uID: '', userName: '', tokenExpiry: new Date(),
};
const memes: Meme[] = [];
const searchMemes: Meme[] = [];
const commands: Command[] = [];
const searchCommands: Command[] = [];
const tags: Tag[] = [];
const currentMeme:Meme = new Meme();
const currentCommand:Command = new Command();
const bigBadOopsie = '';
const EDIT_MEME_PATH = '/editmeme';
const DELETE_MEME_PATH = '/deletememe';
const VIEW_MEME_PATH = '/viewmeme';
const CREATE_MEME_PATH = '/creatememe';
const MEMES_PATH = '/memes';
const TAGS_PATH = '/tags';
const COMMANDS_PATH = '/commands';
const DELETE_COMMAND_PATH = '/deletecommand';
const EDIT_COMMAND_PATH = '/editcommand';
const VIEW_COMMAND_PATH = '/viewcommand';
const CREATE_COMMAND_PATH = '/createcommand';
const LOGIN_PATH = '/login';
const loading = false;

const callAPI = (url: string, method = METHOD_TYPES[0], dataToSend = {}) => {
  const fetchOptions: any = { ...DEFAULT_FETCH_OPTIONS };

  method = method.toUpperCase();
  if (METHOD_TYPES.includes(method)) {
    fetchOptions.method = method;
  }

  if (Object.keys(dataToSend).length) {
    if (fetchOptions.method !== 'GET') {
      fetchOptions.body = JSON.stringify(dataToSend);
    } else {
      url = `${url}/?${(new URLSearchParams(dataToSend)).toString()}`;
      fetchOptions.body = null;
    }
  }

  if (sessionUser?.sessionToken) {
    fetchOptions.headers.Authorization = `${sessionUser.tokenType} ${sessionUser.sessionToken}`;
  }
  return fetch(url, fetchOptions)
    .then(async (res) => {
      const resInfo: any = {
        url: res.url,
        status: res.status,
        statusText: res.statusText,
      };
      if (res.status === 204) return Promise.resolve(resInfo);
      if (res.ok) return res.json();
      const error = new Error(`${res.status}: ${res.statusText}`);
      resInfo.data = await res.json();
      throw Object.assign(error, resInfo);
    });
};

const mapValidationErrorArray = (errors: ValidationError[]) => Object.fromEntries(errors.map((err) => {
  const msg = err.constraints ? Object.values(err.constraints)[0] : 'Invalid value';
  return [err.property, msg];
}));

export default new Vuex.Store({
  state: {
    sessionUser,
    MEME_API,
    COMMAND_API,
    TAG_API,
    DISCORD_API,
    DISCORD_LOGIN,
    memes,
    searchMemes,
    commands,
    searchCommands,
    tags,
    currentMeme,
    currentCommand,
    bigBadOopsie,
    EDIT_MEME_PATH,
    DELETE_MEME_PATH,
    VIEW_MEME_PATH,
    MEMES_PATH,
    TAGS_PATH,
    COMMANDS_PATH,
    DELETE_COMMAND_PATH,
    EDIT_COMMAND_PATH,
    VIEW_COMMAND_PATH,
    CREATE_COMMAND_PATH,
    CREATE_MEME_PATH,
    LOGIN_PATH,
    mapValidationErrorArray,
    loading,
  },
  mutations: {
    setMemes(state, memeArr) {
      state.memes = memeArr;
    },
    setCurrentMeme(state, meme) {
      state.currentMeme = meme;
    },
    setCurrentCommand(state, command) {
      state.currentCommand = command;
    },
    setCommands(state, commandArr) {
      state.commands = commandArr;
    },
    setTags(state, tagArr) {
      state.tags = tagArr;
    },
    setSearchMemes(state, memeArr) {
      state.searchMemes = memeArr;
    },
    setSearchCommands(state, commandArr) {
      state.searchCommands = commandArr;
    },
    setTagMemes(state, tag) {
      const tagObj = Object.assign(new Tag(), tag.newTag);
      const tagIndex = state.tags.findIndex((t: Tag) => t.tagName === tagObj.tagName);
      if (tagIndex >= 0) {
        state.tags[tagIndex] = tagObj;
      }
    },
    setLoading(state, toggle) {
      if (toggle === true || toggle === false) {
        state.loading = toggle;
      }
    },
    addMeme(state, meme) {
      state.memes.push(Object.assign(new Meme(), meme));
    },
    addCommand(state, command) {
      state.commands.push(Object.assign(new Command(), command));
    },
    addTag(state, tag) {
      state.tags.push(Object.assign(new Tag(), tag));
    },
    editMeme(state, meme) {
      const memeIndex = state.memes.findIndex((m) => m.memeID === meme.memeID);
      if (memeIndex >= 0) Object.assign(state.memes[memeIndex], meme);
    },
    editCommand(state, command) {
      const commandIndex = state.commands.findIndex((c) => c.commandID === command.commandID);
      if (commandIndex >= 0) Object.assign(state.commands[commandIndex], command);
    },
    deleteMeme(state, meme) {
      const memeIndex = state.memes.findIndex((m) => m.memeID === meme.memeID);
      if (memeIndex >= 0) state.memes.splice(memeIndex, 1);
    },
    deleteCommand(state, command) {
      const commandIndex = state.commands.findIndex((c) => c.commandID === command.commandID);
      if (commandIndex >= 0) state.commands.splice(commandIndex, 1);
    },
    setSessionUser(state, {
      sessionToken,
      userName,
      uID,
      tokenExpiry,
      tokenType,
    }) {
      state.sessionUser.sessionToken = sessionToken;
      state.sessionUser.userName = userName;
      state.sessionUser.uID = uID;
      state.sessionUser.tokenType = tokenType;
      state.sessionUser.tokenExpiry = tokenExpiry;
      Vue.$cookies.set('sessionUser', { accessToken: sessionToken, tokenType, tokenExpiry }, tokenExpiry);
    },
    setOopsie(state, o) {
      state.bigBadOopsie = o;
    },
  },
  actions: {
    async getMemesFromAPI({
      state,
      commit,
    }) {
      commit('setLoading', true);
      try {
        const memeData = await callAPI(state.MEME_API);
        const importedMemes = await memeData.map((memeD: any) => Object.assign(new Meme(), memeD));
        await commit('setMemes', importedMemes);
      } catch (err: any) {
        commit('setMemes', []);
      }
      commit('setLoading', false);
    },
    async getOneMemeFromAPI({ state, commit }, memeID:any) {
      commit('setLoading', true);
      try {
        const memeData = await callAPI(`${state.MEME_API}/${memeID.memeID}`);
        const importedMeme = Object.assign(new Meme(), memeData);
        commit('setCurrentMeme', importedMeme);
      } catch (err: any) {
        commit('setCurrentMeme', new Meme());
      }
      commit('setLoading', false);
    },
    async getOneCommandFromAPI({ state, commit }, commandID:any) {
      commit('setLoading', true);
      try {
        const commandData = await callAPI(`${state.COMMAND_API}/${commandID.commandID}`);
        const importedCommand = Object.assign(new Command(), commandData);
        commit('setCurrentCommand', importedCommand);
      } catch (err: any) {
        commit('setCurrentCommand', new Command());
      }
      commit('setLoading', false);
    },
    async getCommandsFromAPI({
      state,
      commit,
    }) {
      commit('setLoading', true);
      try {
        const commandData = await callAPI(state.COMMAND_API);
        const importedCommands = commandData.map((commandD: any) => Object.assign(new Command(), commandD));
        commit('setCommands', importedCommands);
      } catch (err: any) {
        commit('setCommands', []);
      }
      commit('setLoading', false);
    },
    async getTagsFromAPI({ state, commit }) {
      commit('setLoading', true);
      try {
        const tagData = await callAPI(state.TAG_API);
        const importedTags = tagData.map((tagD: any) => Object.assign(new Tag(), tagD));
        commit('setTags', importedTags);
      } catch (err: any) {
        commit('setTags', []);
      }
      commit('setLoading', false);
    },
    async getFilteredTagsFromAPI({ state, commit }, tagSearch:any) {
      commit('setLoading', true);
      try {
        const where:string = tagSearch.tagSearch;
        const tagData = await callAPI(state.TAG_API, METHOD_TYPES[0], { where });
        const importedTags = tagData.map((tagD: any) => Object.assign(new Tag(), tagD));
        commit('setSearchTags', importedTags);
      } catch (err: any) {
        commit('setSearchTags', []);
      }
      commit('setLoading', false);
    },
    async getFilteredMemesFromAPI({ state, commit }, memeSearch:any) {
      commit('setLoading', true);
      try {
        const where:string = memeSearch.memeSearch;
        const memeData = await callAPI(state.MEME_API, METHOD_TYPES[0], { where });
        const importedMemes = memeData.map((memeD: any) => Object.assign(new Meme(), memeD));
        commit('setSearchMemes', importedMemes);
      } catch (err: any) {
        commit('setSearchMemes', []);
      }
      commit('setLoading', false);
    },
    async getFilteredCommandsFromAPI({ state, commit }, commandSearch:any) {
      commit('setLoading', true);
      try {
        const where:string = commandSearch.commandSearch;
        const commandData = await callAPI(state.COMMAND_API, METHOD_TYPES[0], { where });
        const importedCommands = commandData.map((commandD: any) => Object.assign(new Command(), commandD));
        commit('setSearchCommands', importedCommands);
      } catch (err: any) {
        commit('setSearchCommands', []);
      }
      commit('setLoading', false);
    },
    async getTagMemesFromAPI({ state, commit }, tagName: any) {
      commit('setLoading', true);
      try {
        const tagMemeData = await callAPI(`${state.TAG_API}/${tagName.tagName}`);
        const importedMemes = tagMemeData.memes.map((memeD: any) => Object.assign(new Meme(), memeD));
        const newTag = Object.assign(new Tag(), { tagName: tagName.tagName, memes: importedMemes });
        commit('setTagMemes', { newTag });
        commit('setLoading', false);
      } catch (err: any) {
        const newArr: Meme[] = [];
        commit('setTagMemes', { newArr, tagName: tagName.tagName });
      }
      commit('setLoading', false);
    },

    async saveMemeToAPI({ commit }, newMeme: any) {
      commit('setLoading', true);
      const { mDescription } = newMeme.newMeme;
      const { mImageRoute } = newMeme.newMeme;
      const mTags = newMeme.newMeme.tags;
      const meme: Meme = Object.assign(new Meme(), {
        mDescription,
        mImageRoute,
        tags: mTags,
      });
      if (newMeme.newMeme.memeID) {
        meme.memeID = newMeme.newMeme.memeID;
      }

      const hasMemeID = !!meme.memeID;
      const url = `${MEME_API}/${meme.memeID ?? ''}`;
      const dataToSend: any = {
        mDescription,
        mImageRoute,
        tags: mTags,
      };
      if (hasMemeID) dataToSend.memeID = meme.memeID;
      const data = await callAPI(url, hasMemeID ? METHOD_TYPES[2] : METHOD_TYPES[1], dataToSend);
      commit(hasMemeID ? 'editMeme' : 'addMeme', data);
      commit('setLoading', false);
    },
    async saveCommandToAPI({ commit }, newCommand: any) {
      commit('setLoading', true);
      if (!newCommand.newCommand.meme) {
        commit('setErrors', { meme: 'Meme must be provided' });
        return;
      }
      const hasCommandID = !!newCommand.newCommand.commandID;
      const { cText, cName } = newCommand.newCommand;
      const commandToSend: any = {
        cText,
        cName,
        memeID: newCommand.newCommand.meme.memeID,
      };
      if (hasCommandID) commandToSend.commandID = newCommand.newCommand.commandID;
      const url = `${COMMAND_API}/${newCommand.newCommand.commandID ?? ''}`;

      const data = await callAPI(url, hasCommandID ? METHOD_TYPES[2] : METHOD_TYPES[1], commandToSend);
      commit(hasCommandID ? 'editCommand' : 'addCommand', data);
      commit('setLoading', false);
    },
    async deleteMemeFromAPI({
      commit,
      dispatch,
      state,
    }, meme: any) {
      commit('setLoading', true);
      try {
        await callAPI(`${state.MEME_API}/${meme.meme.memeID}`, METHOD_TYPES[3]);
        commit('deleteMeme', meme.meme);
      } catch (e) {
        await dispatch('getMemesFromAPI');
        await dispatch('conflictOopsie');
      }
      commit('setLoading', false);
    },
    async conflictOopsie({ commit }) {
      commit('setOopsie', CONFLICT_ERR);
    },
    async deleteCommandFromAPI({
      commit,
      dispatch,
      state,
    }, command: any) {
      commit('setLoading', false);
      try {
        await callAPI(`${state.COMMAND_API}/${command.command.commandID}`, METHOD_TYPES[3]);
        commit('deleteCommand', command);
      } catch (err:any) {
        await dispatch('getCommandsFromAPI');
        commit('setLoading', false);
        throw new Error(err.message);
      }
      commit('setLoading', false);
    },
  },
});
