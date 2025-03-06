<template>
  <div class="count-box">
    <button class="minus" @click="handleSub">-</button>
    <input :value="value" @change="handleChange" type="text" class="inp">
    <button class="add" @click="handleAdd">+</button>
  </div>
</template>

<script>

export default {
  name: 'CountBox',
  props: {
    value: {
      type: Number,
      default: 1
    }
  },
  methods: {
    handleSub () {
      if (this.value <= 1) return
      this.$emit('input', this.value - 1)
    },
    handleAdd () {
      if (this.value >= 9999) return
      this.$emit('input', this.value + 1)
    },
    handleChange (event) {
      const num = +event.target.value
      if (isNaN(num) || num < 1 || num > 9999) {
        event.target.value = this.value
        return
      }
      this.$emit('input', num)
    }
  }
}
</script>

<style lang="less" scoped>
.count-box {
  display: flex;
  width: 110px;
  .add, .minus {
    width: 30px;
    height: 30px;
    font-size: 24px;
    outline: none;
    border: none;
    background-color: #efefef;
  }
  .inp {
    width: 40px;
    height: 30px;
    outline: none;
    border: none;
    margin: 0 5px;
    background-color: #efefef;
    text-align: center;
  }
}
</style>
