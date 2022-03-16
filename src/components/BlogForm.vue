<template>
  <form @submit.prevent="submit" novalidate>
    <div class="row">
      <div class="col col-12 col-sm-12 col-md-6">
        <div class="form-group">
          <label for="title">Title:</label>
          <input
            type="text"
            class="form-control"
            id="title"
            aria-describedby="title"
            v-model="state.article.title"
          />
          <div
            :class="[
              'invalid-feedback',
              { 'd-block': state.initialEmptyField && v$.article.title.$error },
            ]"
          >
            Required Field
          </div>
        </div>
        <div class="form-group">
          <label for="description">Description:</label>
          <input
            type="text"
            class="form-control"
            id="description"
            aria-describedby="description"
            v-model="state.article.description"
          />
          <div
            :class="[
              'invalid-feedback',
              {
                'd-block':
                  state.initialEmptyField && v$.article.description.$error,
              },
            ]"
          >
            Required Field
          </div>
        </div>
        <div class="form-group">
          <label for="body">body:</label>
          <textarea
            class="form-control"
            id="body"
            row="3"
            v-model="state.article.body"
          />
          <div
            :class="[
              'invalid-feedback',
              { 'd-block': state.initialEmptyField && v$.article.body.$error },
            ]"
          >
            Required Field
          </div>
        </div>
      </div>
      <div class="col col-12 col-sm-12 col-md-3">
        <div class="form-group">
          <label for="tags">Tags:</label>
          <input
            type="text"
            class="form-control"
            id="tags"
            aria-describedby="title"
            v-model="state.inputTag"
          />
        </div>
        <div class="form-check" v-for="tag in state.tags" :key="tag">
          <input
            class="form-check-input"
            type="checkbox"
            :value="tag"
            :id="tag"
            v-model="state.article.tagList"
          />
          <label class="form-check-label" :for="tag"> {{ tag }} </label>
        </div>
      </div>
    </div>
    <button class="btn btn-primary">Submit</button>
  </form>
</template>
<script>
import { computed, onMounted, reactive } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import API from "@/http/apis";

export default {
  name: "BlogForm",
  props: {
    article: Object,
  },
  emits: ["handleSubmit"],
  setup(props) {
    console.log(props);
    const state = reactive({
      initialEmptyField: false,
      tags: [],
      inputTag: "",
      article: {
        title: props.article?.title || "",
        body: props.article?.body || "",
        description: props.article?.description || "",
        tagList: props.article?.tagList || [],
      },
    });
    const rules = computed(() => ({
      article: {
        title: { required },
        description: { required },
        body: { required },
      },
    }));
    const fetchTagsList = () => {
      API.getTags()
        .then((res) => {
          state.tags = [...res.tags];
        })
        .catch((err) => console.log(err));
    };
    onMounted(() => {
      fetchTagsList();
    });
    const v$ = useVuelidate(rules, state);
    return {
      state,
      v$,
    };
  },
  methods: {
    submit: async function () {
      const result = await this.v$.$validate();
      if (!result) {
        this.state.initialEmptyField = true;
        return;
      } else {
        if (this.state.inputTag.trim()) {
          const newTag = this.state.inputTag.split(",");
          this.state.article.tagList = [
            ...this.state.article.tagList,
            ...newTag,
          ];
        }
        this.$emit("handleSubmit", this.state.article);
      }
    },
  },
};
</script>
