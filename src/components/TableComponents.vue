<script setup>

defineProps(
    {
      config: Array,
      tableData: Array,
      total: Number,
    }
);

const emit = defineEmits(['page-update','edit-content','del-content']);

const updatePage = (index) => {
  emit("page-update", index);
}
const updateContent = (id)=>{
  emit("edit-content",id);
}
const deleteContent = (id)=>{
  emit("del-content",id);
}

</script>

<template>
  <div class="table-container">
    <el-card class="table-card" shadow="always">
      <div class="table-core">
        <el-table :data="tableData" stripe table-layout="auto" style="width: 100%">
          <el-table-column type="selection" width="55" />
          <el-table-column v-for="item in config" sortable :prop="item.name" :label="item.text" min-width="50" show-overflow-tooltip/>
          <el-table-column fixed="right" label="操作" min-width="120">
            <template #default="obj">
              <el-button link type="primary" size="small" @click="updateContent(obj.row.id)">修改
              </el-button>
              <el-button link type="primary" size="small" @click="deleteContent(obj.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

      </div>
      <div class="table-footer" style="display: flex; align-items: center; justify-content: center; margin-top: 20px;">
        <el-pagination background layout="prev, pager, next, total" :pager-count="5" :total="total" style="max-height: 40%" @current-change="updatePage"/>
      </div>
    </el-card>

  </div>
</template>

<style scoped>
.table-container {
  padding: 16px;
}

.table-card {
  border-radius: 8px;
}
</style>