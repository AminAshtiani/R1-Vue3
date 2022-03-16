<template>
  <AdminLayout>
    <BlogForm @handleSubmit="onSubmit" />
  </AdminLayout>
</template>
<script>
import { useToast } from "vue-toastification";
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
    return {
      toast: useToast(),
    };
  },
  methods: {
    onSubmit: function (article) {
      const data = {
        article,
      };
      API.createArticle(data)
        .then(() => {
          this.toast.success({
            component: AlertText,
            props: {
              strongTitle: "Post Created!",
            },
          });
          this.$router.push("/admin");
        })
        .catch((err) => {
          if (err.response) {
            this.toast.error({
              component: AlertText,
              props: {
                strongTitle: err.response.data.message,
                msg: "",
              },
            });
          } else if (err.request) {
            this.toast.error({
              component: AlertText,
              props: {
                strongTitle: "Creatation Failed!",
                msg: "Check your connection",
              },
            });
          } else {
            this.toast.error({
              component: AlertText,
              props: {
                strongTitle: "Creatation Failed!",
                msg: "Unknown Error",
              },
            });
          }
        });
    },
  },
};
</script>
