<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="No." width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="ID" width="80" align="center">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="Content" align="center">
        <template slot-scope="scope">
          {{ scope.row.content }}
        </template>
      </el-table-column>

      <el-table-column label="User" width="120" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.user_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Blog" width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.blog_id }}
        </template>
      </el-table-column>
      <el-table-column label="CreatedAt" width="200" align="center">
        <template slot-scope="scope">
          {{ dateFormat(scope.row.created_at) }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import comment from '@/api/comment'
import { parseTime } from '@/utils/index'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      comment.getComments().then(response => {
        console.log(response.data)
        this.list = response.data
        this.listLoading = false
      })
    },
    dateFormat(data) {
      return parseTime(data)
    }
  }
}
</script>
