<template>
  <div id="app">
    <b-modal v-model="$store.state.loading" title="Page is Loading">
      <template>
        <p>
          Page is Loading
        </p>
        <b-spinner variant="primary" label="Loading All the Cool Things!" style="width: 10rem; height:10rem;" ></b-spinner>
      </template>
      <template #modal-cancel></template>
      <template #modal-ok></template>
    </b-modal>
    <router-view class="container-xl mt-2"/>
  </div>
</template>
