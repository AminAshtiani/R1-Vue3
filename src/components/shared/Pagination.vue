<template>
  <nav v-if="totalPage > 1">
    <ul class="pagination">
      <li
        v-for="index in totalPage"
        :key="index"
        class="page-item"
        :class="{ active: currentPage == index }"
        @click="updateCurrentPage(index)"
      >
        <span class="page-link">
          {{ index }}
        </span>
      </li>
    </ul>
  </nav>
</template>
<script>
import { ref } from "vue";
export default {
  name: "Pagination",
  props: {
    totalPage: Number,
  },
  setup(props, ctx) {
    const currentPage = ref(1);
    function updateCurrentPage(page) {
      currentPage.value = page;

      ctx.emit("clicked", currentPage.value)
    }
    return {
      currentPage,
      updateCurrentPage,
    };
  },
};
</script>
