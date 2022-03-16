<template>
  <AdminLayout>
    <BlogForm
      @handleSubmit="onSubmit"
      :article="state.article"
      v-if="!state.loading"
    />
  </AdminLayout>
</template>
<script>
import { onMounted, reactive } from "vue";
import { useToast } from "vue-toastification";
import { useRoute } from "vue-router";
import AdminLayout from "@/components/AdminLayout.vue";
import BlogForm from "@/components/BlogForm.vue";
import AlertText from "@/components/shared/AlertText.vue";
import API from "@/http/apis";

export default {
  components: {
    AdminLayout,
    BlogForm,
  },
  setup() {
    const state = reactive({
      article: null,
      loading: true,
    });
    function fetchArticleBySlug() {
      const {
        params: { slug },
      } = useRoute();
      API.getArticle(slug).then((res) => {
        state.article = res.article;
        state.loading = false;
      });
    }
    onMounted(() => {
      fetchArticleBySlug();
    });
    return {
      toast: useToast(),
      state,
    };
  },
  methods: {
    onSubmit: function (article) {
      const data = {
        article,
      };
      API.updateArticle(this.state.article.slug, data)
        .then((res) => {
          console.log(res);
          this.toast.success({
            component: AlertText,
            props: {
              strongTitle: "Update Success!",
            },
          });
          this.$router.push("/admin");
        })
        .catch((err) => {
          this.toast.error({
            component: AlertText,
            props: {
              strongTitle: "Update Failed!",
              msg: err.response.data.message,
            },
          });
        });
    },
  },
};
</script>
