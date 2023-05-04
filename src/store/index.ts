/* eslint-disable max-len */
import Vue from 'vue';
import Vuex from 'vuex';
import Tag from '@/models/Tag';
import Command from '@/models/Command';
import Meme from '@/models/Meme';
import { ValidationError } from 'class-validator';

Vue.use(Vuex);

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

const mockMemes = JSON.parse('[{"memeID":4,"mDescription":"stick bug, simply chillin","mImageRoute":"https://i.ytimg.com/vi/Tt7bzxurJ1I/maxresdefault.jpg","mCreator":{"uID":"0000000000000007455","userName":"tass-dev"},"tags":[{"tagName":"bug"},{"tagName":"chillin"}]},{"memeID":5,"mDescription":"Not a meme; sensitive information","mImageRoute":"https://media.tenor.com/_ZMvl-47aY4AAAAd/meme-rick-astley.gif","mCreator":{"uID":"0000000000000007455","userName":"tass-dev"},"tags":[{"tagName":"rick"},{"tagName":"roll"}]},{"memeID":6,"mDescription":"such doge, very meme","mImageRoute":"https://media-cldnry.s-nbcnews.com/image/upload/t_nbcnews-fp-1024-512,f_auto,q_auto:best/rockcms/2022-01/210602-doge-meme-nft-mb-1715-8afb7e.jpg","mCreator":{"uID":"0000000000000007455","userName":"tass-dev"},"tags":[{"tagName":"doge"},{"tagName":"meme"},{"tagName":"wow"}]},{"memeID":7,"mDescription":"sad doge","mImageRoute":"https://i.pinimg.com/originals/5d/7e/93/5d7e934674f0b6ddd90e569e78a4192d.png","mCreator":{"uID":"0000000000000007455","userName":"tass-dev"},"tags":[{"tagName":"doge"},{"tagName":"sad"}]}]').map((c:any) => Object.assign(new Meme(), c));
const mockMemes4 = Object.assign(new Meme(), JSON.parse('{"memeID":4,"mDescription":"stick bug, simply chillin","mImageRoute":"https://i.ytimg.com/vi/Tt7bzxurJ1I/maxresdefault.jpg","tags":[{"tagName":"bug"},{"tagName":"chillin"}],"mCreator":{"uID":"0000000000000007455","userName":"tass-dev"}}'));
const mockMemes5 = Object.assign(new Meme(), JSON.parse('{"memeID":5,"mDescription":"Not a meme; sensitive information","mImageRoute":"https://media.tenor.com/_ZMvl-47aY4AAAAd/meme-rick-astley.gif","tags":[{"tagName":"rick"},{"tagName":"roll"}],"mCreator":{"uID":"0000000000000007455","userName":"tass-dev"}}'));
const mockMemes6 = Object.assign(new Meme(), JSON.parse('{"memeID":6,"mDescription":"such doge, very meme","mImageRoute":"https://media-cldnry.s-nbcnews.com/image/upload/t_nbcnews-fp-1024-512,f_auto,q_auto:best/rockcms/2022-01/210602-doge-meme-nft-mb-1715-8afb7e.jpg","tags":[{"tagName":"doge"},{"tagName":"meme"},{"tagName":"wow"}],"mCreator":{"uID":"0000000000000007455","userName":"tass-dev"}}'));
const mockMemes7 = Object.assign(new Meme(), JSON.parse('{"memeID":7,"mDescription":"sad doge","mImageRoute":"https://i.pinimg.com/originals/5d/7e/93/5d7e934674f0b6ddd90e569e78a4192d.png","tags":[{"tagName":"doge"},{"tagName":"sad"}],"mCreator":{"uID":"0000000000000007455","userName":"tass-dev"}}'));
const mockCommands = JSON.parse('[{"commandID":1,"cName":"stickBug","cText":"$self presents a stickbug to $mention0","cMentionsUser":true,"cNumMentions":1,"cCreator":{"uID":"0000000000000007455","userName":"tass-dev"},"meme":{"memeID":4,"mDescription":"stick bug, simply chillin","mImageRoute":"https://i.ytimg.com/vi/Tt7bzxurJ1I/maxresdefault.jpg"}},{"commandID":2,"cName":"secret","cText":"$self tells $mention0 a cool secr-- oh...","cMentionsUser":true,"cNumMentions":1,"cCreator":{"uID":"0000000000000007455","userName":"tass-dev"},"meme":{"memeID":5,"mDescription":"Not a meme; sensitive information","mImageRoute":"https://media.tenor.com/_ZMvl-47aY4AAAAd/meme-rick-astley.gif"}},{"commandID":3,"cName":"sadDoge","cText":"$self is sad :(","cMentionsUser":true,"cNumMentions":0,"cCreator":{"uID":"0000000000000007455","userName":"tass-dev"},"meme":{"memeID":7,"mDescription":"sad doge","mImageRoute":"https://i.pinimg.com/originals/5d/7e/93/5d7e934674f0b6ddd90e569e78a4192d.png"}},{"commandID":4,"cName":"rickRoll","cText":"$self is no stranger to love","cMentionsUser":true,"cNumMentions":0,"cCreator":{"uID":"0000000000000007455","userName":"tass-dev"},"meme":{"memeID":5,"mDescription":"Not a meme; sensitive information","mImageRoute":"https://media.tenor.com/_ZMvl-47aY4AAAAd/meme-rick-astley.gif"}}]').map((c:any) => Object.assign(new Command(), c));
const mockCommands1 = Object.assign(new Command(), JSON.parse('{"commandID":1,"cName":"stickBug","cText":"$self presents a stickbug to $mention0","cMentionsUser":true,"cNumMentions":1,"cCreator":{"uID":"0000000000000007455","userName":"tass-dev"},"meme":{"memeID":4,"mDescription":"stick bug, simply chillin","mImageRoute":"https://i.ytimg.com/vi/Tt7bzxurJ1I/maxresdefault.jpg","tags":[{"tagName":"bug"},{"tagName":"chillin"}],"mCreator":{"uID":"0000000000000007455","userName":"tass-dev"}}}'));
const mockCommands2 = Object.assign(new Command(), JSON.parse('{"commandID":2,"cName":"secret","cText":"$self tells $mention0 a cool secr-- oh...","cMentionsUser":true,"cNumMentions":1,"cCreator":{"uID":"0000000000000007455","userName":"tass-dev"},"meme":{"memeID":5,"mDescription":"Not a meme; sensitive information","mImageRoute":"https://media.tenor.com/_ZMvl-47aY4AAAAd/meme-rick-astley.gif","tags":[{"tagName":"rick"},{"tagName":"roll"}],"mCreator":{"uID":"0000000000000007455","userName":"tass-dev"}}}'));
const mockCommands3 = Object.assign(new Command(), JSON.parse('{"commandID":3,"cName":"sadDoge","cText":"$self is sad :(","cMentionsUser":true,"cNumMentions":0,"cCreator":{"uID":"0000000000000007455","userName":"tass-dev"},"meme":{"memeID":7,"mDescription":"sad doge","mImageRoute":"https://i.pinimg.com/originals/5d/7e/93/5d7e934674f0b6ddd90e569e78a4192d.png","tags":[{"tagName":"doge"},{"tagName":"sad"}],"mCreator":{"uID":"0000000000000007455","userName":"tass-dev"}}}'));
const mockCommands4 = Object.assign(new Command(), JSON.parse('{"commandID":4,"cName":"rickRoll","cText":"$self is no stranger to love","cMentionsUser":true,"cNumMentions":0,"cCreator":{"uID":"0000000000000007455","userName":"tass-dev"},"meme":{"memeID":5,"mDescription":"Not a meme; sensitive information","mImageRoute":"https://media.tenor.com/_ZMvl-47aY4AAAAd/meme-rick-astley.gif","tags":[{"tagName":"rick"},{"tagName":"roll"}],"mCreator":{"uID":"0000000000000007455","userName":"tass-dev"}}}'));
const mockTags = JSON.parse('[{"tagName":"bug"},{"tagName":"chillin"},{"tagName":"doge"},{"tagName":"meme"},{"tagName":"rick"},{"tagName":"roll"},{"tagName":"sad"},{"tagName":"wow"}]').map((c:any) => Object.assign(new Tag(), c));
const mockTagsBug = Object.assign(new Tag(), { tagName: 'bug', memes: JSON.parse('[{"memeID":4,"mDescription":"stick bug, simply chillin","mImageRoute":"https://i.ytimg.com/vi/Tt7bzxurJ1I/maxresdefault.jpg","mCreator":{"uID":"0000000000000007455","userName":"tass-dev"},"tags":[{"tagName":"bug"},{"tagName":"chillin"}]}]').map((x:any) => Object.assign(new Meme(), x)) });
const mockTagsChillin = Object.assign(new Tag(), { tagName: 'chillin', memes: JSON.parse('[{"memeID":4,"mDescription":"stick bug, simply chillin","mImageRoute":"https://i.ytimg.com/vi/Tt7bzxurJ1I/maxresdefault.jpg","mCreator":{"uID":"0000000000000007455","userName":"tass-dev"},"tags":[{"tagName":"bug"},{"tagName":"chillin"}]}]').map((x:any) => Object.assign(new Meme(), x)) });
const mockTagsDoge = Object.assign(new Tag(), { tagName: 'doge', memes: JSON.parse('[{"memeID":6,"mDescription":"such doge, very meme","mImageRoute":"https://media-cldnry.s-nbcnews.com/image/upload/t_nbcnews-fp-1024-512,f_auto,q_auto:best/rockcms/2022-01/210602-doge-meme-nft-mb-1715-8afb7e.jpg","mCreator":{"uID":"0000000000000007455","userName":"tass-dev"},"tags":[{"tagName":"doge"},{"tagName":"meme"},{"tagName":"wow"}]},{"memeID":7,"mDescription":"sad doge","mImageRoute":"https://i.pinimg.com/originals/5d/7e/93/5d7e934674f0b6ddd90e569e78a4192d.png","mCreator":{"uID":"0000000000000007455","userName":"tass-dev"},"tags":[{"tagName":"doge"},{"tagName":"sad"}]}]').map((x:any) => Object.assign(new Meme(), x)) });
const mockTagsMeme = Object.assign(new Tag(), { tagName: 'meme', memes: JSON.parse('[{"memeID":6,"mDescription":"such doge, very meme","mImageRoute":"https://media-cldnry.s-nbcnews.com/image/upload/t_nbcnews-fp-1024-512,f_auto,q_auto:best/rockcms/2022-01/210602-doge-meme-nft-mb-1715-8afb7e.jpg","mCreator":{"uID":"0000000000000007455","userName":"tass-dev"},"tags":[{"tagName":"doge"},{"tagName":"meme"},{"tagName":"wow"}]}]').map((x:any) => Object.assign(new Meme(), x)) });
const mockTagsRick = Object.assign(new Tag(), { tagName: 'rick', memes: JSON.parse('[{"memeID":5,"mDescription":"Not a meme; sensitive information","mImageRoute":"https://media.tenor.com/_ZMvl-47aY4AAAAd/meme-rick-astley.gif","mCreator":{"uID":"0000000000000007455","userName":"tass-dev"},"tags":[{"tagName":"rick"},{"tagName":"roll"}]}]').map((x:any) => Object.assign(new Meme(), x)) });
const mockTagsRoll = Object.assign(new Tag(), { tagName: 'roll', memes: JSON.parse('[{"memeID":5,"mDescription":"Not a meme; sensitive information","mImageRoute":"https://media.tenor.com/_ZMvl-47aY4AAAAd/meme-rick-astley.gif","mCreator":{"uID":"0000000000000007455","userName":"tass-dev"},"tags":[{"tagName":"rick"},{"tagName":"roll"}]}]').map((x:any) => Object.assign(new Meme(), x)) });
const mockTagsSad = Object.assign(new Tag(), { tagName: 'sad', memes: JSON.parse('[{"memeID":7,"mDescription":"sad doge","mImageRoute":"https://i.pinimg.com/originals/5d/7e/93/5d7e934674f0b6ddd90e569e78a4192d.png","mCreator":{"uID":"0000000000000007455","userName":"tass-dev"},"tags":[{"tagName":"doge"},{"tagName":"sad"}]}]').map((x:any) => Object.assign(new Meme(), x)) });
const mockTagsWow = Object.assign(new Tag(), { tagName: 'wow', memes: JSON.parse('[{"memeID":6,"mDescription":"such doge, very meme","mImageRoute":"https://media-cldnry.s-nbcnews.com/image/upload/t_nbcnews-fp-1024-512,f_auto,q_auto:best/rockcms/2022-01/210602-doge-meme-nft-mb-1715-8afb7e.jpg","mCreator":{"uID":"0000000000000007455","userName":"tass-dev"},"tags":[{"tagName":"doge"},{"tagName":"meme"},{"tagName":"wow"}]}]').map((x:any) => Object.assign(new Meme(), x)) });

const mapValidationErrorArray = (errors: ValidationError[]) => Object.fromEntries(errors.map((err) => {
  const msg = err.constraints ? Object.values(err.constraints)[0] : 'Invalid value';
  return [err.property, msg];
}));

export default new Vuex.Store({
  state: {
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
    mapValidationErrorArray,
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
    setTagMemes(state, tag) {
      const tagIndex = state.tags.findIndex((t: Tag) => t.tagName === tag.tagName);
      if (tagIndex >= 0) {
        state.tags[tagIndex] = tag;
      }
    },
    setOopsie(state, o) {
      state.bigBadOopsie = o;
    },
  },
  actions: {
    async getMemesFromAPI({ commit }) {
      commit('setMemes', mockMemes);
    },
    async getOneMemeFromAPI({ commit }, memeID:any) {
      memeID = memeID.memeID;
      if (memeID === 4 || memeID === '4') {
        console.log(mockMemes4);
        commit('setCurrentMeme', mockMemes4);
      }
      if (memeID === 5 || memeID === '5') {
        commit('setCurrentMeme', mockMemes5);
      }
      if (memeID === 6 || memeID === '6') {
        commit('setCurrentMeme', mockMemes6);
      }
      if (memeID === 7 || memeID === '7') {
        commit('setCurrentMeme', mockMemes7);
      }
    },
    async getOneCommandFromAPI({ commit }, commandID:any) {
      commandID = commandID.commandID;
      if (commandID === 1 || commandID === '1') {
        commit('setCurrentCommand', mockCommands1);
      }
      if (commandID === 2 || commandID === '2') {
        commit('setCurrentCommand', mockCommands2);
      }
      if (commandID === 3 || commandID === '3') {
        commit('setCurrentCommand', mockCommands3);
      }
      if (commandID === 4 || commandID === '4') {
        commit('setCurrentCommand', mockCommands4);
      }
    },
    async getCommandsFromAPI({ commit }) {
      commit('setCommands', mockCommands);
    },
    async getTagsFromAPI({ commit }) {
      commit('setTags', mockTags);
    },
    async getTagMemesFromAPI({ commit }, tagName: any) {
      console.log(tagName);
      tagName = tagName.tagName;
      if (tagName === 'bug') {
        commit('setTagMemes', mockTagsBug);
      }
      if (tagName === 'chillin') {
        commit('setTagMemes', mockTagsChillin);
      }
      if (tagName === 'doge') {
        commit('setTagMemes', mockTagsDoge);
      }
      if (tagName === 'meme') {
        commit('setTagMemes', mockTagsMeme);
      }
      if (tagName === 'rick') {
        commit('setTagMemes', mockTagsRick);
      }
      if (tagName === 'roll') {
        commit('setTagMemes', mockTagsRoll);
      }
      if (tagName === 'sad') {
        commit('setTagMemes', mockTagsSad);
      }
      if (tagName === 'wow') {
        commit('setTagMemes', mockTagsWow);
      }
    },

  },
});
