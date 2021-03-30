import { sleep } from "../utils"

function User (props) {
  if (!props.loaded) {
    return 'Loading...'
  }

  return (
    <>
      <h1>Dynamic routing</h1>
      <a href="/docs/100/20?with=1">/docs/:docId/:postId</a><br />
      <a href="/docs/200?with=1">/docs/:docId</a>
      <p>{JSON.stringify(props.data)}</p>
    </>
  )
}

User.loadData = async function (ctx) {
  console.log(ctx.isSSR, ctx.url, ctx.query, ctx.params)

  // 延时演示
  await sleep(1000)

  if (ctx.query.with !== '1') {
    return {
      redirect: '/user/2222?with=1'
    }
  }

  return {
    data: {
      url: ctx.url,
      isSSR: ctx.isSSR,
      query: ctx.query,
      params: ctx.params
    }
  }
}

export default User
