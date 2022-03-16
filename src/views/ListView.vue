<template>
  <AdminLayout>
    <h2>All Posts</h2>
    <Table
      :fields="state.fields"
      :posts="state.items"
      :rowCount="state.rowCount"
    />
  </AdminLayout>
</template>

<script>
import AdminLayout from "@/components/adminLayout.vue";
import Table from "@/components/shared/Table.vue";
import API from "@/http/apis";
import { reactive } from "vue";

export default {
  components: {
    AdminLayout,
    Table,
  },
  setup() {
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
    });

    function updateItems(items) {
      state.items = items;
    }
    function updateItemCount(count) {
      state.rowCount = count;
    }
    return {
      state,
      updateItems,
      updateItemCount,
    };
  },
  methods: {
    fetchArticles() {
      API.getAllArticles()
        .then((res) => {
          this.updateItems(res.articles);
          this.updateItemCount(res.articlesCount);
        })
        .catch((err) => console.log(err));
    },
  },
  mounted() {
    this.fetchArticles();
  },
};
</script>
