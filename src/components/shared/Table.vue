<script>
import moment from "moment";

export default {
  name: "Table",
  emits: ["onDelete"],
  props: {
    fields: Object,
    posts: Array,
  },
  methods: {
    dateFilter(date) {
      return moment(date).format("DD MMMM, YYYY");
    },
    handleDeleteClick(slug) {
      this.$emit("onDelete", slug);
    },
  },
};
</script>
<template>
  <div class="table-responsive">
    <table class="table">
      <thead class="thead-light">
        <tr>
          <th v-for="field in fields" :key="field.key">
            {{ field.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(post, index) in posts" :key="post.id">
          <th scope="row">{{ index }}</th>
          <td>{{ post.author.username }}</td>
          <td>{{ post.title }}</td>
          <td>{{ post.tagList.join() }}</td>
          <td>{{ post.body.substring(0, 20) }}</td>
          <td>{{ dateFilter(post.createdAt) }}</td>
          <td>
            <div class="dropdown">
              <button
                class="btn btn-info dropdown-toggle"
                role="button"
                data-toggle="dropdown"
              >
                ....
              </button>
              <div class="dropdown-menu dropdown-menu-right">
                <router-link
                  class="dropdown-item"
                  :to="'/admin/edit/' + post.slug"
                >
                  Edit
                </router-link>
                <a
                  class="dropdown-item"
                  data-toggle="modal"
                  data-target="#example"
                  @click="handleDeleteClick(post.slug)"
                  >Delete</a
                >
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
