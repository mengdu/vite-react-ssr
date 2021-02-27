function User (props) {
  return 'User'
}

User.loadData = async function (ctx) {
  console.log(ctx)
  return {
    user: {
      id: 1,
      nickname: '张三',
      age: 18
    }
  }
}

export default User
