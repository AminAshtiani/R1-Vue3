<template>
  <AdminLayout>
    <h2>All Posts</h2>
    <Table
      :fields="state.fields"
      :posts="state.items"
      @onDelete="updateSelectedPost"
    />
    <Pagination :totalPage="state.totalPage" @clicked="updateCurrentPage" />
    <Modal
      title="Last Warning!"
      message="Are you sure?"
      @confirm="deleteArticle"
    />
  </AdminLayout>
</template>

<script>
import { reactive, onMounted } from "vue";
import { useToast } from "vue-toastification";
import AdminLayout from "@/components/adminLayout.vue";
import Table from "@/components/shared/Table.vue";
import Pagination from "@/components/shared/Pagination.vue";
import Modal from "@/components/shared/Modal.vue";
import AlertText from "@/components/shared/AlertText.vue";
import API from "@/http/apis";

export default {
  components: {
    AdminLayout,
    Table,
    Pagination,
    Modal,
  },
  setup() {
    const toast = useToast();
    const state = reactive({
      fields: [
        { key: "index", label: "#" },
        { key: "author", label: "Author" },
        { key: "title", label: "Title" },
        { key: "tagList", label: "tagList" },
        { key: "body", label: "body" },
        { key: "createdAt", label: "Created At" },
        { key: "actions", label: "actions" },
      ],
      items: [],
      rowCount: 0,
      perPage: 10,
      totalPage: 1,
      selectedPost: "",
    });
    onMounted(() => {
      fetchArticles(1);
    });
    function updateItems(items) {
      state.items = items;
    }
    function updateItemCount(count) {
      state.rowCount = count;
    }
    function updateTotalpage() {
      state.totalPage = Math.ceil(state.rowCount / state.perPage);
    }
    function updateCurrentPage(page) {
      fetchArticles(page);
    }
    function updateSelectedPost(slug) {
      state.selectedPost = slug;
    }
    function fetchArticles(page) {
      const offset = state.perPage * (page - 1);
      API.getAllArticles(offset)
        .then((res) => {
          updateItems(res.articles);
          updateItemCount(res.articlesCount);
          updateTotalpage();
        })
        .catch((err) => {
          if (err.response) {
            toast.error({
              component: AlertText,
              props: {
                strongTitle: err.response.data.message,
                msg: "",
              },
            });
          } else if (err.request) {
            toast.error({
              component: AlertText,
              props: {
                strongTitle: "Register Failed!",
                msg: "Check your connection",
              },
            });
          } else {
            toast.error({
              component: AlertText,
              props: {
                strongTitle: "Register Failed!",
                msg: "Unknown Error",
              },
            });
          }
        });
    }
    function deleteArticle() {
      API.deleteArticle(state.selectedPost)
        .then(() => {
          toast.success({
            component: AlertText,
            props: {
              strongTitle: "Post was Deleted!",
              msg: "",
            },
          });
        })
        .catch((err) => {
          if (err.response) {
            toast.error({
              component: AlertText,
              props: {
                strongTitle: err.response.data.message,
                msg: "",
              },
            });
          } else if (err.request) {
            toast.error({
              component: AlertText,
              props: {
                strongTitle: "Delete Failed!",
                msg: "Check your connection",
              },
            });
          } else {
            toast.error({
              component: AlertText,
              props: {
                strongTitle: "Delete Failed!",
                msg: "Unknown Error",
              },
            });
          }
        });
    }
    return {
      state,
      updateItems,
      updateItemCount,
      updateCurrentPage,
      updateSelectedPost,
      deleteArticle,
    };
  },
};
</script>
