<template>
    <div class="divContainer">
        <el-row>
            <el-col>
                <el-button type="primary" size="small" icon="upload" v-if="isAllowEdit"
                    v-on:click="SaveDPChangeToServer">Save Changes</el-button>
                <el-button size="small" icon="refresh" v-on:click="ReloadDP" v-if="isAllowEdit">Undo changes</el-button>
                <el-button size="small" icon="close" v-on:click="HandleClose">Close</el-button>
            </el-col>
        </el-row>
        <el-row class="peopleRow">
            <el-col :span="3" :offset="1">
                Coordinator:
            </el-col>
            <el-col :span="19">     
                <UserGroupWP v-bind:initUserGroup="coordinatorList" v-on:RemoveUser="handleRemoveUserFromCoordinator" 
                    v-on:AddUser="handleAddUserToCoordinator" v-bind:btnText="'Add Coordinator'" v-bind:IsAllowEdit="isAllowEdit"></UserGroupWP>
            </el-col>
        </el-row>
        <el-row class="peopleRow">
            <el-col :span="3" :offset="1">
                Sales:
            </el-col>
            <el-col :span="19">     
                <UserGroupWP v-bind:initUserGroup="salesList" v-on:RemoveUser="handleRemoveUserFromSales" 
                    v-on:AddUser="handleAddUserToSales" v-bind:btnText="'Add Sales'" v-bind:IsAllowEdit="isAllowEdit"></UserGroupWP>
            </el-col>
        </el-row>
        <el-row class="peopleRow">
            <el-col :span="3" :offset="1">
                ZM:
            </el-col>
            <el-col :span="19">     
                <UserGroupWP v-bind:initUserGroup="ZMList" v-on:RemoveUser="handleRemoveUserFromZM" 
                    v-on:AddUser="handleAddUserToZM"  v-bind:btnText="'Add ZM'" v-bind:IsAllowEdit="isAllowEdit"></UserGroupWP>
            </el-col>
        </el-row>
        <el-row class="peopleRow">
            <el-col :span="3" :offset="1">
                RSM:
            </el-col>
            <el-col :span="19">     
                <UserGroupWP v-bind:initUserGroup="RSMList" v-on:RemoveUser="handleRemoveUserFromRSM" 
                    v-on:AddUser="handleAddUserToRSM" v-bind:btnText="'Add RSM'" v-bind:IsAllowEdit="isAllowEdit"></UserGroupWP>
            </el-col>
        </el-row>
        <el-row class="peopleRow">
            <el-col :span="3" :offset="1">
                Addtion Viewer:
            </el-col>
            <el-col :span="19">     
                <UserGroupWP v-bind:initUserGroup="AllowViewList" v-on:RemoveUser="handleRemoveUserFromAllowView" 
                    v-on:AddUser="handleAddUserToAllowView" v-bind:btnText="'Add User'" v-bind:IsAllowEdit="isAllowEdit"></UserGroupWP>
            </el-col>
        </el-row>
        <el-row class="peopleRow">
            <el-col :span="3" :offset="1">
                Controlling:
            </el-col>
            <el-col :span="19">     
                <UserGroupWP v-bind:initUserGroup="controllingList" v-bind:IsAllowEdit="false"></UserGroupWP>
            </el-col>
        </el-row>
        <el-row class="peopleRow">
            <el-col :span="3" :offset="1">
                Legal:
            </el-col>
            <el-col :span="19">     
                <UserGroupWP v-bind:initUserGroup="legalList" v-bind:IsAllowEdit="false"></UserGroupWP>
            </el-col>
        </el-row>
        <el-row class="peopleRow">
            <el-col :span="3" :offset="1">
                Master:
            </el-col>
            <el-col :span="19">     
                <UserGroupWP v-bind:initUserGroup="masterList" v-bind:IsAllowEdit="false"></UserGroupWP>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import defaultData from '../defaultData';
import { Loading } from 'element-ui';
import UserGroupWP from './UserGroupWP';

export default {
    name: "DealerPermission",
    data () {
        return {
            salesList: [],
            coordinatorList: [],
            controllingList: [],
            legalList: [],
            masterList: [],
            RSMList: [],
            ZMList: [],
            AllowViewList: [],
            dealerID: '07d248d6-4f1b-4ada-a9dd-4ff066d3f85a',
            isAllowEdit: true
        }
    },
    props: ['DID', 'isAllowEdit'],
    components: { UserGroupWP },
    created () {
        this.LoadDPEntityFromServer();  
    },
    watch: {
        // dealerID: function(newValue) {
        //     this.LoadDPEntityFromServer();
        // }
        DID: function(newValue) {
            this.LoadDPEntityFromServer();
        }
    },
    methods: {
        ShowLoadingView: function() {
            Loading.service({ fullscreen: true });
        },
        HideLoadingView: function() {
            let curLoadingInstance = Loading.service({ fullscreen: true });
            curLoadingInstance.close();
        },
        HandleClose: function() {
            //TODO
            this.$emit("close");
        },
        ReloadDP: function() {
            this.LoadDPEntityFromServer();
        },
        LoadDPEntityFromServer: function() {
            if(this.DID) {
                this.dealerID = this.DID;
            }
            if(this.$route.params && this.$route.params.dealerId) {
                this.dealerID = this.$route.params.dealerId;
            }
            var requestUrl = defaultData.cdServiceUrl + "/LoadDealerPermission/" + this.dealerID;
            this.ShowLoadingView();
            //obly for test
            //this.axios.defaults.headers.post['Host'] = 'zcnsha10yapp01:20000';
            //this.axios.defaults.headers.post['Origin'] = 'zcnsha10yapp01:20000';

            this.axios.post(requestUrl).then((rep) => {
                this.HideLoadingView();

                if(rep.data && rep.data.LoadDealerPermissionResult && rep.data.LoadDealerPermissionResult.Status == "success") {
                    var repData = rep.data.LoadDealerPermissionResult.Data;
                    this.coordinatorList = repData.CoordinatorList;
                    this.controllingList = repData.ControllingList;
                    this.salesList = repData.SalesList;
                    this.legalList = repData.LegalList;
                    this.masterList = repData.MasterList;
                    this.RSMList = repData.RSMList;
                    this.ZMList = repData.ZMList;
                    this.AllowViewList = repData.AllowViewList;
                } else if(rep.data && rep.data.LoadDealerPermissionResult) {
                    this.$message.error(rep.data.LoadDealerPermissionResult.Message);
                } else {
                    this.$message.error("Load Dealer Permission failed!");
                }
            }).catch((error) => {
                this.HideLoadingView();
                this.$message.error("Load Dealer Permission failed!");
            });
        },
        SaveDPChangeToServer: function() {
            var requestUrl = defaultData.cdServiceUrl + "/UpdateDealerPermission";
            var requestData = {
                data: {
                    DealerID: this.dealerID,
                    CoordinatorList: this.coordinatorList,
                    SalesList: this.salesList,
                    ZMList: this.ZMList,
                    RSMList: this.RSMList,
                    MasterList: this.masterList,
                    LegalList: this.legalList,
                    ControllingList: this.controllingList,
                    AllowViewList: this.AllowViewList
                }
            };
            this.ShowLoadingView();

            this.axios.post(requestUrl, requestData).then((rep) => {
                this.HideLoadingView();

                if(rep.data && rep.data.UpdateDealerPermissionResult 
                    && rep.data.UpdateDealerPermissionResult.Status == "success") {
                        this.$message("Save Success!");
                    } else if (rep.data && rep.data.UpdateDealerPermissionResult) {
                        this.$message.error(rep.data.UpdateDealerPermissionResult.Message);
                    } else {
                        this.$message.error("Save Changes Failed!");
                    }          
            }).catch((error) => {
                this.HideLoadingView();
                this.$message.error("Save Changes Failed!");
            });
        },
        handleAddUser: function(userList, data) {
            var result =  userList.filter((item, index) => {
                return item.Account == data.Account
            });
            if(!result || result.length == 0) { 
               userList.push(data); 
            } 
        },
        handleRemoveUser: function(userList, data) {
            var removedindex = -1;
            var result =  userList.forEach((item, index) => {
                 if(item.Account == data.Account)
                 {
                     removedindex = index;
                 }
            });
            if(removedindex != -1) { 
               userList.splice(removedindex, 1); 
            } 
        },
        handleRemoveUserFromSales: function(data) {
            this.handleRemoveUser(this.salesList, data);
        },
        handleAddUserToSales: function(data) {
            this.handleAddUser(this.salesList, data);
        },
        handleRemoveUserFromCoordinator: function(data) {
            this.handleRemoveUser(this.coordinatorList, data);
        },
        handleAddUserToCoordinator: function(data) {
            this.handleAddUser(this.coordinatorList, data);
        },
        handleRemoveUserFromZM: function(data) {
            this.handleRemoveUser(this.ZMList, data);
        },
        handleAddUserToZM: function(data) {
            this.handleAddUser(this.ZMList, data);
        },
        handleRemoveUserFromRSM: function(data) {
            this.handleRemoveUser(this.RSMList, data);
        },
        handleAddUserToRSM: function(data) {
            this.handleAddUser(this.RSMList, data);
        },
        handleRemoveUserFromAllowView: function(data) {
            this.handleRemoveUser(this.AllowViewList, data);
        },
        handleAddUserToAllowView: function(data) {
            this.handleAddUser(this.AllowViewList, data);
        }
    }
}
</script>

<style scoped>
.peopleRow {
    padding-top: 10px;
    padding-bottom: 15px;
}
</style>
