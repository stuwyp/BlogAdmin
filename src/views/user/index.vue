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
      <el-table-column label="No." width="80" align="center">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="ID" width="80" align="center">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="Name" align="center">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column label="Avatar" width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.avatar }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Email" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.email }}
        </template>
      </el-table-column>
      <el-table-column label="IsAdmin" width="80" align="center">
        <template slot-scope="scope">
          {{ scope.row.is_admin }}
        </template>
      </el-table-column>
      <el-table-column label="IsActive" width="80" align="center">
        <template slot-scope="scope">
          {{ scope.row.is_active }}
        </template>
      </el-table-column>

      <el-table-column label="RegisterTime" width="200" align="center">
        <template slot-scope="scope">
          {{ dateFormat(scope.row.created_at) }}
        </template>
      </el-table-column>
      <!--<el-table-column class-name="status-col" label="Status" width="110" align="center">-->
      <!--<template slot-scope="scope">-->
      <!--<el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center" prop="created_at" label="Display_time" width="200">-->
      <!--<template slot-scope="scope">-->
      <!--<i class="el-icon-time" />-->
      <!--<span>{{ scope.row.display_time }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
    </el-table>
  </div>
</template>

<script>
import blog from '@/api/user'
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
    console.log(parseTime('20191010'))
  },
  methods: {
    fetchData() {
      this.listLoading = true
      blog.getUsers().then(response => {
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
