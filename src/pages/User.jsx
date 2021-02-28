function User (props) {
  return (
    <>
      <h1>User</h1>
      <p>{JSON.stringify(props.user)}</p>
    </>
  )
}

User.loadData = async function (ctx) {
  console.log(ctx.isSSR, ctx.url, ctx.query, ctx.params)
  return {
    user: {
      id: 1,
      nickname: '张三',
      age: 18
    }
  }
}

export default User