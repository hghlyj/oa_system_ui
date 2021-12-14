<template>
      
  <div class="recover">
        
    <div class="item" v-for="item in recoverlist" :key="item.id">
      <p>
        {{item.content}}
      </p>
    </div>
  </div>
</template>

<script>
import {GetPutIntoEffect} from 'network/api/studentscore'
export default {
  data() {
    return {
        recoverlist:[]
    };
  },
  async created(){
      const res = await GetPutIntoEffect(4)
      if(res.code==200){}
      this.recoverlist = res.list
  },
};
</script>

<style scoped lang="scss">
.recover {
  .item {
      line-height: 40px;
      padding-right:250px;
      border-bottom: 1px solid black ;
  }
}
</style>
