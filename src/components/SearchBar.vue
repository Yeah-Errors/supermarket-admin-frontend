<script setup>

import { ref } from "vue";
import { useRoute } from "vue-router";
import {Delete, Search} from "@element-plus/icons-vue";


defineProps({
  config: Array,
})

const emit = defineEmits(['searchValue']);
const router = useRoute();

const searchValue = ref({})


function clear(){
  searchValue.value = {};
}

function search(){
  emit("searchValue", searchValue.value);
}

</script>

<template>
  <div class="search-container">
    <el-card class="search-card" shadow="always">
      <el-form
          :model="searchValue"
          label-position="left"
          class="search-form"
      >
        <div class="form-grid">
          <el-form-item
              v-for="item in config"
              :key="item.name"
              :label="item.text"
              :prop="item.name"
              class="form-item"
          >
            <!-- 数字输入框 -->
            <el-input-number
                v-if="item.type === 'number' && item.require == null"
                v-model="searchValue[item.name]"
                :placeholder="`请输入${item.text}`"
                :controls="false"
                class="form-control"
            >
              <template #prefix v-if="item.pre_icon">
                <span v-html="item.pre_icon"></span>
              </template>
            </el-input-number>

            <!-- 字符串输入框 -->
            <el-input
                v-else-if="item.type === 'string'"
                :placeholder="`请输入${item.text}`"
                v-model="searchValue[item.name]"
                clearable
                class="form-control"
            >
              <template #prefix v-if="item.pre_icon">
                <span v-html="item.pre_icon"></span>
              </template>
            </el-input>

            <!-- 日期时间选择器 -->
            <el-date-picker
                v-else-if="item.type === 'datetime' && !item.require"
                type="datetime"
                v-model="searchValue[item.name]"
                :placeholder="`请选择${item.text}`"
                value-format="YYYY-MM-DD HH:mm:ss"
                class="form-control"
                style="min-width: 200px;"
            />

            <!-- 数字范围输入框 -->
            <div v-if="item.require === 'between' && item.type === 'number'" class="range-control">
              <el-input-number
                  :placeholder="`最小值`"
                  :controls="false"
                  v-model="searchValue[item.name+'Min']"
                  class="range-input"
              />
              <span class="range-separator">至</span>
              <el-input-number
                  :placeholder="`最大值`"
                  v-model="searchValue[item.name+'Max']"
                  :controls="false"
                  class="range-input"
              />
            </div>

            <!-- 日期范围输入框 -->
            <div v-if="item.require === 'between' && item.type === 'datetime'" class="range-control">
              <el-date-picker
                  type="datetime"
                  :placeholder="`开始时间`"
                  value-format="YYYY-MM-DD HH:mm:ss"
                  v-model="searchValue[item.name+'Min']"
                  style="min-width: 200px;"
                  class="range-date"
              />
              <span class="range-separator">至</span>
              <el-date-picker
                  type="datetime"
                  :placeholder="`结束时间`"
                  value-format="YYYY-MM-DD HH:mm:ss"
                  v-model="searchValue[item.name+'Max']"
                  style="min-width: 200px;"
                  class="range-date"
              />
            </div>
          </el-form-item>
        </div>
      </el-form>
      <div class="action-footer">
        <el-button type="primary" :icon="Delete" @click="clear">清空</el-button>
        <el-button type="primary" :icon="Search" @click="search(0)">检索</el-button>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.search-container {
  padding: 16px;
}

.search-card {
  border-radius: 8px;
}

.search-form {
  padding: 16px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}

.form-item {
  margin-bottom: 0;
}

.form-control {
  width: 100%;
}

.range-control {
  display: flex;
  align-items: center;
  gap: 8px;
}
.action-footer {
  display: flex;
  justify-content: flex-end;
  padding: 0 16px 16px;
  margin-top: auto;
}

.range-input,
.range-date {
  flex: 1;
}

.range-separator {
  color: var(--el-text-color-secondary);
  font-size: 14px;
  white-space: nowrap;
}

/* 调整Element Plus组件内部样式 */
:deep(.el-input__prefix) {
  display: flex;
  align-items: center;
  padding-right: 8px;
}

:deep(.el-input-number) {
  width: 100%;
}

:deep(.el-date-editor) {
  width: 100%;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
}
</style>