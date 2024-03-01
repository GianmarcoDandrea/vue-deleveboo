<script>
export default {
  props: ['cart', 'showModal','visible'],
  data() {
    return {}
  },

  methods: {
    close() {
      console.log('cliccato');
      this.$emit('close');
    },
  },

}
</script>

<template>
  <div v-if="visible === true" class="modal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          <h4>You already have another restaurant's order in progress. You can only order from one restaurant at a time.</h4>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn" @click="close" style="background-color: #F2C802;">Close</button>
        </div>
      </div>
    </div>
  </div>

</template>



<style scoped lang="scss">
.receipt {
  font-family: 'Times New Roman', Times, serif;
  font-size: 14px;

}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  max-width: 500px;
  text-align: center;
}
</style>
