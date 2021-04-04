<template>
  <div id="login" style="height: 100%">
    <div style="width: 100%;height: 100%;background: url(../../../static/images/food/loginBJ.jpg) no-repeat center center;background-size: 100% 100%;">
      &nbsp;
    </div>
    <el-dialog title="用 户 登 录" :visible.sync="loginVisible" :close-on-click-modal="false" append-to-body width="600px" top="20vh" :show-close="false" center>
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules">
        <el-row>
          <el-col :span="18">
            <el-form-item prop="phone" label="帐号">
              <el-input
                v-model="loginForm.phone"
                maxlength="11"
                oninput="value=value.replace(/[^\d]/g,'')"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item prop="password" label="密码">
              <el-input
                v-model="loginForm.password"
                maxlength="11"
                oninput="value=value.replace(/[^\d]/g,'')"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <span
              style="cursor: pointer;color: #3bb6f9;line-height: 30px;height: 30px;padding: 40px 20px"
              @click="forgotPassword"
            >忘记密码？</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10" :offset="14">
            <el-button
              class="formbtn"
              type="primary"
              :loading="loading"
              @click.native.prevent="handleLogin"
            >登 录
            </el-button>
            <el-button
              class="formbtn"
              type="primary"
              :loading="loading"
              @click.native.prevent="register"
            >注 册
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <el-dialog title="注 册" :visible.sync="dialogVisible" append-to-body center width="600px" top="10vh" @close="resetAddForm">
      <el-form ref="addStaffForm" :model="addStaff" label-width="120px" :rules="addStaffRules" class="pdr-10">
        <el-row>
          <el-col :span="19">
            <el-form-item prop="phone" label="电话">
              <el-input
                v-model="addStaff.phone"
                maxlength="11"
                class="input-wid240"
                oninput="value=value.replace(/[^\d]/g,'')"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <span>
              <el-button size="small" type="primary" @click="getPhoneCode">获取验证码</el-button>
            </span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item prop="code" label="验证码">
              <el-input v-model="addStaff.code" maxlength="6" class="input-wid240"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item prop="password" label="密码">
              <el-input v-model="addStaff.password" type="password" maxlength="20" class="input-wid240"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item prop="password2" label="重新输入密码">
              <el-input v-model="addStaff.password2" type="password" maxlength="20" class="input-wid240"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item prop="staffName" label="呢称">
              <el-input v-model="addStaff.staffName" maxlength="10" class="input-wid240"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item prop="sex" label="性别">
              <el-select v-model="addStaff.sex" maxlength="2" class="input-wid240" value="">
                <el-option key="1" label="男" value="男"></el-option>
                <el-option key="2" label="女" value="女"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item prop="age" label="年龄">
              <el-input
                v-model.number="addStaff.age"
                oninput="value=value.replace(/[^\d]/g,'')"
                maxlength="2"
                class="input-wid240"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="handleRegister">提&nbsp;交</el-button>
      </span>
    </el-dialog>
    <el-dialog title="重 置 密 码" :visible.sync="forgotVisible" append-to-body center width="600px" top="18vh" @close="resetForgotForm">
      <el-form ref="forgetForm" :model="addStaff" label-width="120px" :rules="forgetFormRules" class="pdr-10">
        <el-row>
          <el-col :span="19">
            <el-form-item prop="phone" label="电话">
              <el-input
                v-model="addStaff.phone"
                maxlength="11"
                class="input-wid240"
                oninput="value=value.replace(/[^\d]/g,'')"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <span>
              <el-button size="small" type="primary" @click="getPhoneCode">获取验证码</el-button>
            </span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item prop="code" label="验证码">
              <el-input v-model="addStaff.code" maxlength="6" class="input-wid240"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item prop="password" label="密码">
              <el-input v-model="addStaff.password" type="password" maxlength="20" class="input-wid240"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item prop="password2" label="重新输入密码">
              <el-input v-model="addStaff.password2" type="password" maxlength="20" class="input-wid240"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="handleForgot">提&nbsp;交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value || value.length < 11) {
        callback(new Error('请输入正确的电话'));
      } else {
        callback()
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (!value || value.length < 6) {
        callback(new Error('密码不能小于6位！'));
      } else {
        callback()
      }
    };
    return {
      loading: false,
      loginForm: {},
      loginRules: {
        phone: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      dialogVisible: false,
      addStaff: {},
      addStaffRules: {
        phone: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        password2: [{ required: true, trigger: 'blur', message: '请输入比对密码' }],
        staffName: [{ required: true, trigger: 'blur', message: '' }],
        sex: [{ required: true, trigger: 'blur', message: '请选择性别' }],
        age: [{ required: true, trigger: 'blur', message: '请输入年龄' }],
        code: [{ required: true, trigger: 'blur', message: '请输入验证码' }]
      },
      forgotVisible: false,
      loginVisible: true,
      forgetFormRules: {
        phone: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        password2: [{ required: true, trigger: 'blur', message: '请输入比对密码' }],
        code: [{ required: true, trigger: 'blur', message: '请输入验证码' }]
      }
    };
  },
  mounted() {
  },
  methods: {
    // 'warning' success / info / warning / error
    openMsg(msg, msgType) {
      if (!msgType) {
        msgType = 'success';
      }
      this.$alert(msg, '通知', {
        confirmButtonText: '确定',
        type: msgType,
        callback: action => {
          console.log(action);
        }
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => { // form表单的校验方法
        if (valid) {
          this.loading = true;
          // vuex中登陆方法调用
          this.$store.dispatch('login/LoginByUsername', this.loginForm).then((res) => {
            if (res.code === '200') {
              console.log('登录成功！')
            } else {
              this.openMsg(res.msg, 'warning');
            }
            // 如果localStorage中不存在用户名，那么将用户名密码保存在localStorage中
            if (!localStorage.getItem('phone') && localStorage['phone'] === undefined) {
              localStorage.setItem('phone', this.loginForm.phone);
              localStorage.setItem('password', this.loginForm.password);
            } else {
              // 如果用户名存在则判断用户名是否改变，切换用户时从新保存用户名密码
              if (localStorage.getItem('phone') !== this.loginForm.phone.toString() && localStorage.getItem('phone')) {
                localStorage.setItem('phone', this.loginForm.phone);
                localStorage.setItem('password', this.loginForm.password);
              }
            }
            // this.$store.dispatch('GetUserLngAT');
            this.loading = false;
          }).catch((data) => {
            this.loading = false;
            this.loginForm.password = '';
            // this.loginForm.password = utils.decrypt(this.loginForm.password)
            this.$message({
              type: 'info',
              message: data.msg
            })
          })
        } else {
          // console.log('error submit!!')
          this.loginForm.password = '';
          return false
        }
      })
    },
    getPhoneCode() {
      console.log('获取手机验证码');
      if (this.addStaff.phone === undefined || this.addStaff.phone.length < 11) {
        this.openMsg('请输入正确格式的电话！', 'warning');
        return;
      }
      const url = this.$api.sendPassCode;
      const params = {
        phone: this.addStaff.phone
      };
      this.$http.getJson(url, params).then(res => {
        console.log(res);
        const code = res.code;
        const data = res.body;
        if (code === '200') {
          console.log(data);
          this.openMsg('发送成功，请注意接收！');
        } else {
          this.openMsg(res.msg, 'error');
        }
        this.loading = false;
      }).catch((err) => {
        console.error(err);
        this.loading = false;
      })
    },
    forgotPassword() {
      console.log('忘记密码');
      this.forgotVisible = true;
    },
    register() {
      console.log('注册');
      this.dialogVisible = true;
    },
    handleRegister() {
      console.log('注册');
      this.$refs.addStaffForm.validate(valid => { // form表单的校验方法
        if (valid) {
          if (this.addStaff.password !== this.addStaff.password2) {
            this.openMsg('两次输入密码不匹配！', 'warning');
            return false;
          }
          this.loading = true;
          this.addStaff.state = '0';
          this.addStaff.score = 100.0;
          this.addStaff.staffType = 'admin';
          const url = `${this.$api.insertStaff}?code=${this.addStaff.code}`;
          this.$http.postJson(url, this.addStaff).then(res => {
            console.log(res);
            const code = res.code;
            const data = res.body;
            if (code === '200') {
              console.log(data);
              this.openMsg('申请成功！');
              this.dialogVisible = false;
            } else {
              this.loading = false;
              this.openMsg(res.msg, 'error');
            }
            this.loading = false;
          }).catch((err) => {
            console.error(err);
            this.loading = false;
          })
        } else {
          return false
        }
      })
    },
    resetAddForm() {
      console.log('清空表单');
      this.$refs.addStaffForm.resetFields();
    },
    resetForgotForm() {
      console.log('清空表单');
      this.$refs.forgetForm.resetFields();
    },
    handleForgot() {
      console.log('重置密码！');
      this.$refs.forgetForm.validate(valid => { // form表单的校验方法
        if (valid) {
          if (this.addStaff.password !== this.addStaff.password2) {
            this.openMsg('两次输入密码不匹配！', 'warning');
            return false;
          }
          this.loading = true;
          const url = `${this.$api.forgetPassword}?code=${this.addStaff.code}`;
          this.$http.postJson(url, this.addStaff).then(res => {
            console.log(res);
            const code = res.code;
            if (code === '200') {
              this.openMsg('重置密码成功！');
              this.forgotVisible = false;
            } else {
              this.loading = false;
              this.openMsg(res.msg, 'error');
            }
            this.loading = false;
          }).catch((err) => {
            console.error(err);
            this.loading = false;
          })
        } else {
          return false
        }
      })
    }
  }
};
</script>
<style>
  .input-wid240 {
    width: 300px;
  }
</style>
