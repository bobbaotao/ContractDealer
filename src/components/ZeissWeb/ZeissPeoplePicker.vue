<template>
  <div>
    <el-row>
      <el-col style="text-align:left">
        <el-autocomplete style="width:250px" size="small"
            v-model="selectedUser"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入姓名，账号或者Title"
            @select="handleSelect">
            <i class="el-icon-search" slot="append" @click="checkName">
            </i>
            <template slot-scope="{item}">
              <div class="name">{{ item.userName }} &nbsp;&nbsp;&nbsp;{{ item.value }}</div>
              <span class="addr">{{ item.email }}</span>
            </template>
        </el-autocomplete>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        {{searchMessage}}
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import defaultData from '../defaultData';

  export default {
    name: 'ZeissPeoplePicker',
    data() {
      var CancelToken = this.axios.CancelToken;
      var source = CancelToken.source();
      return {
        userAccount:'',
        username: '',
        email: '',
        selectedUser: '',
        axiosCancelSource: source,
        searchMessage: '',
        acProps: {
          label: 'label',
          value: 'userName'
        }
      }
    },
    methods: {
      querySearchAsync: function(queryString, cb) {
        this.axiosCancelSource.cancel();
        if(queryString == null || queryString == '') {
          return;
        }
        var requestUrl = defaultData.cdServiceUrl + "/SearchUser/" + queryString;

        this.axios.post(requestUrl).then((response) => {
          if(response.data && response.data.SearchUserResult && response.data.SearchUserResult.Data) {
            cb(response.data.SearchUserResult.Data);
          }
        }).catch((error) => {

        });

      },
      clearSelectedUser: function() {
        this.userAccount = "";
        this.email = "";
        this.username = "";
        this.selectedUser = "";
      },
      getSelectedUser: function() {
        return {
            Account: this.userAccount,
            Email: this.email,
            UserName: this.username
        };
      },
      handleSelect: function(item) {
        this.userAccount = item.value;
        this.email = item.email;
        this.username = item.userName;
        this.selectedUser = item.userName;
      }
      ,
      checkName: function() {
        this.searchMessage = "";
        this.axiosCancelSource.cancel();
        if(this.selectedUser == null || this.selectedUser == '') {
          return;
        }
        var requestUrl = defaultData.cdServiceUrl + "/SearchUser/" + this.selectedUser;

        this.axios.post(requestUrl).then((response) => {
          if(response.data && response.data.SearchUserResult && response.data.SearchUserResult.Data) {
            if(response.data.SearchUserResult.Data.length == 0)
            {
              this.searchMessage ="找不到用户";
            } else if(response.data.SearchUserResult.Data.length > 1)
            {
              this.searchMessage ="存在多个用户";
            } else {
              this.selectedUser = response.data.SearchUserResult.Data[0].userName;
              this.handleSelect(response.data.SearchUserResult.Data[0]);
            }
          }
        }).catch((error) => {

        });
      }
    }

  }
</script>

<style scoped>
.name {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .addr {
      font-size: 12px;
      color: #b4b4b4;
    }

</style>
