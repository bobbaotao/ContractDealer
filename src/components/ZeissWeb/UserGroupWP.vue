<template>
    <div class="divContainer">
        <el-row>
            <el-col class="usersSection" :span="16" :offset="1">&nbsp;
               <div class="singlePeople" v-for="item in initUserGroup">
                   {{ item.UserName }}&nbsp;&nbsp;<el-button size="mini" icon="close" v-if="IsAllowEdit" v-on:click="deleteUser(item)"></el-button>
               </div>
            </el-col>
            <el-col :span="6" :offset="1" v-if="IsAllowEdit" >
                <el-row>
                    <el-col>
                        <ZeissPeoplePicker ref="zpp"></ZeissPeoplePicker>
                    </el-col>
                </el-row>
                <el-row class="btnRow">
                    <el-col>
                        <el-button size="mini" type="primary" icon="circle-plus"
                            v-on:click="handleAddUser">{{btnText}}</el-button>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import ZeissPeoplePicker from './ZeissPeoplePicker';

export default {
    name: 'UserGroupWP',
    data () {
        return {
            
        }
    },
    props: ['initUserGroup', 'IsAllowEdit','btnText'],
    components: {ZeissPeoplePicker},
    methods: {
        deleteUser: function(item) {
            this.$emit("RemoveUser", item)
        },
        handleAddUser: function() {
            var user = this.$refs.zpp.getSelectedUser();
            this.$emit("AddUser", user);
            this.$refs.zpp.clearSelectedUser();
        },
        ShowName: function(item) {
            //if(item)
        }
    }
}
</script>

<style scoped>
.singlePeople 
{
    float: left;
    padding-left: 5px;
    padding-right: 10px;
}
.btnRow
{
    padding: 3px 0px;
}
.usersSection
{
    border: 1px solid #d8dce5;
    border-radius: 4px;
    padding: 3px;
}
</style>

