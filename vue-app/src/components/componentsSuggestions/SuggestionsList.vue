<template>
  <div class="item">
    <suggestions-item
        @selected="selected"
        :key="suggestion.id"
        :applicationOne="applicationOne"
        :suggestion="suggestion"
        v-for="suggestion in arraySuggestions"/>
  </div>
</template>

<script>
import SuggestionsItem from "@/components/componentsSuggestions/SuggestionsItem.vue";

export default {
  components: {
    SuggestionsItem
  },
  props: {
    applicationOne: {
      type: Object,
      required: true,
    },
    arraySuggestions: {
      type: Array,
      required: true
    }
  },
  methods: {
    console() {
      console.log(this.arraySuggestions)
    },
    selected() {
      this.$emit('selected')
    }
  },
  mounted() {
    this.console()
  }
}
</script>

<style scoped>

.item {
  width: 100%;
}

.product-list-item {
  display: inline-block;
  margin-right: 10px;
}
.product-list-enter-active, .product-list-leave-active {
  transition: all 0.4s;
}
.product-list-enter, .product-list-leave-to {
  opacity: 0;
  transform: translateX(130px);
}

.product-list-move {
  transition: transform 0.4s;
}
</style>